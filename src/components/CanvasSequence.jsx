import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { frameLoader } from '../lib/FrameLoader';

const generateFrameUrls = () => {
  const urls = [];
  const sequences = ['v1', 'v2', 'v3', 'v4'];
  sequences.forEach(seq => {
    for (let i = 1; i <= 240; i++) {
      const num = i.toString().padStart(4, '0');
      urls.push(`/assets/frames/${seq}/frame_${num}.jpg`);
    }
  });
  return urls;
};

const frameUrls = generateFrameUrls();
const TOTAL_FRAMES = frameUrls.length;

const CanvasSequence = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Load initial frames
  useEffect(() => {
    const initialLoad = async () => {
      const firstBatch = frameUrls.slice(0, 10); // Load first 10 immediately
      await Promise.all(firstBatch.map(url => frameLoader.loadImage(url)));
      setIsLoaded(true);
    };
    initialLoad();
  }, []);

  // Main render loop
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;
    let lastRenderedIndex = -1;

    // Handle high DPI and resizing
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Need to force a redraw after resize
      lastRenderedIndex = -1;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawFrame = (img) => {
      if (!img) return;
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

      // Cover behavior
      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const renderLoop = () => {
      const progress = scrollYProgress.get();
      // Ensure we stay within bounds 0 to TOTAL_FRAMES - 1
      const targetIndex = Math.min(
        TOTAL_FRAMES - 1, 
        Math.max(0, Math.floor(progress * TOTAL_FRAMES))
      );

      // Preload nearby frames
      frameLoader.preload(frameUrls, targetIndex);

      if (targetIndex !== lastRenderedIndex) {
        const img = frameLoader.getFrame(frameUrls[targetIndex]);
        
        if (img) {
          drawFrame(img);
          lastRenderedIndex = targetIndex;
        } else {
          // If frame isn't ready, see if we can draw a nearby cached frame temporarily 
          // or just leave the canvas as is (which holds the last successfully rendered frame).
          // We will attempt to load it immediately
          frameLoader.loadImage(frameUrls[targetIndex]).then((loadedImg) => {
            // Only draw if we haven't moved on
            if (Math.abs(scrollYProgress.get() * TOTAL_FRAMES - targetIndex) < 5) {
              drawFrame(loadedImg);
              lastRenderedIndex = targetIndex;
            }
          });
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, scrollYProgress]);

  // Overlay animations based on sequence checkpoints
  // Sequence 1: 0-240 (0 - 0.25)
  // Sequence 2: 240-480 (0.25 - 0.5)
  // Sequence 3: 480-720 (0.5 - 0.75)
  // Sequence 4: 720-960 (0.75 - 1.0)
  
  const seq1Opacity = useTransform(scrollYProgress, [0.05, 0.1, 0.2, 0.23], [0, 1, 1, 0]);
  const seq2Opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.45, 0.48], [0, 1, 1, 0]);
  const seq3Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.73], [0, 1, 1, 0]);
  const seq4Opacity = useTransform(scrollYProgress, [0.8, 0.85, 0.95, 0.98], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative w-full bg-black" style={{ height: '800vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
            <div className="text-[#D4AF37] font-serif tracking-widest uppercase animate-pulse">
              Kohinoor Developers
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05]"
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Cinematic Darkening Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10">
          
          <motion.div style={{ opacity: seq1Opacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16">
             <div className="w-12 h-[1px] bg-[#D4AF37] mb-6" />
             <h2 className="font-serif text-5xl md:text-7xl text-[#F5F1E8] mb-6 drop-shadow-xl">The Arrival</h2>
             <p className="font-sans font-light text-[#D9D3C7] text-lg md:text-2xl drop-shadow-lg max-w-3xl">
               A grand entrance designed to shift the senses. Natural light pours through double-height volumes, welcoming you home.
             </p>
          </motion.div>

          <motion.div style={{ opacity: seq2Opacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16">
             <div className="w-12 h-[1px] bg-[#D4AF37] mb-6" />
             <h2 className="font-serif text-5xl md:text-7xl text-[#F5F1E8] mb-6 drop-shadow-xl">Living Spaces</h2>
             <p className="font-sans font-light text-[#D9D3C7] text-lg md:text-2xl drop-shadow-lg max-w-3xl">
               Seamless transitions between the kitchen and living areas. Materiality grounded in warm stone and textured wood.
             </p>
          </motion.div>

          <motion.div style={{ opacity: seq3Opacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16">
             <div className="w-12 h-[1px] bg-[#D4AF37] mb-6" />
             <h2 className="font-serif text-5xl md:text-7xl text-[#F5F1E8] mb-6 drop-shadow-xl">Private Retreats</h2>
             <p className="font-sans font-light text-[#D9D3C7] text-lg md:text-2xl drop-shadow-lg max-w-3xl">
               The master suite and bath. A sanctuary of calm, where every detail is meticulously considered for personal restoration.
             </p>
          </motion.div>

          <motion.div style={{ opacity: seq4Opacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16">
             <div className="w-12 h-[1px] bg-[#D4AF37] mb-6" />
             <h2 className="font-serif text-5xl md:text-7xl text-[#F5F1E8] mb-6 drop-shadow-xl">The Final Reveal</h2>
             <p className="font-sans font-light text-[#D9D3C7] text-lg md:text-2xl drop-shadow-lg max-w-3xl">
               Expansive outdoor living seamlessly connecting to the architectural core. The complete vision, realized.
             </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default CanvasSequence;
