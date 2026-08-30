import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const chapters = [
  {
    id: 'exterior',
    type: 'hero',
    video: '/assets/exterior.mp4',
    heading: "Find a place you'll love to call home.",
    subheading: "A peaceful stay with premium modern amenities in Vrindavan.",
    height: '250vh'
  },
  {
    id: 'bedroom',
    type: 'room',
    video: '/assets/WhatsApp Video 2026-08-30 at 12.31.10 AM.mp4',
    label: "Bedroom",
    text: 'Designed for peaceful nights and restful mornings.',
    height: '300vh'
  },
  {
    id: 'drawing',
    type: 'room',
    video: '/assets/WhatsApp Video 2026-08-30 at 12.31.13 AM.mp4',
    label: "Drawing Room",
    text: 'A welcoming space crafted for moments together.',
    height: '300vh'
  },
  {
    id: 'kitchen',
    type: 'room',
    video: '/assets/WhatsApp Video 2026-08-30 at 12.31.12 AM.mp4',
    label: "Kitchen",
    text: 'A modern kitchen designed for effortless everyday living.',
    height: '300vh'
  },
  {
    id: 'washroom',
    type: 'room',
    video: '/assets/WhatsApp Video 2026-08-30 at 12.31.11 AM.mp4',
    label: "Washroom",
    text: 'A refined space where comfort meets everyday luxury.',
    height: '300vh'
  }
];

// Extracted Word component so useTransform is called at a valid component top level
const Word = ({ word, index, progress }) => {
  // Calculate entrance window for each word based on index
  const start = 0.1 + (index * 0.02);
  const end = start + 0.05;

  // Ensure values stay within [0, 1] range
  const safeStart = Math.min(start, 0.4);
  const safeEnd = Math.min(end, 0.45);

  const wordOpacity = useTransform(progress, [safeStart, safeEnd, 0.8, 0.9], [0, 1, 1, 0]);
  const wordY = useTransform(progress, [safeStart, safeEnd, 0.8, 0.9], [20, 0, 0, -20]);

  return (
    <motion.span
      style={{ opacity: wordOpacity, y: wordY }}
      className="mr-2 lg:mr-3 inline-block"
    >
      {word}
    </motion.span>
  );
};

// Helper to stagger words based on a parent progress value
const ScrollAnimatedText = ({ text, progress, className }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <Word key={i} word={word} index={i} progress={progress} />
      ))}
    </div>
  );
};

const CinematicChapter = ({ chapter, index, isHero }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  
  // Track scroll progress for this specific chapter
  // "start start" = top of section hits top of viewport
  // "end end" = bottom of section hits bottom of viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // --- COMMON ANIMATIONS ---
  const chapterOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

  const labelOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const labelLineScale = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const bgParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // --- BESPOKE ANIMATIONS (CHOREOGRAPHY) ---
  
  // Hero
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Bedroom (Soft Vertical Reveal & Calm Movement)
  const bedroomClipPath = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0% 0 0 0)", "inset(0% 0 100% 0)"]);
  const bedroomScale = useTransform(scrollYProgress, [0.2, 0.8], [1, 1.05]);

  // Drawing Room (Horizontal Depth Transition)
  const drawingClipPath = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["inset(0 100% 0 0)", "inset(0% 0% 0 0)", "inset(0% 0% 0 0)", "inset(0 0 0 100%)"]);
  const drawingX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, -15, -30]);

  // Kitchen (Camera-Like Scale Movement)
  const kitchenScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1.15, 1, 1, 0.95]);
  const kitchenClipPath = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["inset(20% 20% 20% 20%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(10% 10% 10% 10%)"]);

  // Washroom (Elegant Layered Reveal)
  const washroomScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1.05, 1.1]);
  const washroomOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const washroomFrameOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const washroomFrameScale = useTransform(scrollYProgress, [0.1, 0.8], [0.95, 1.05]);

  // Select bespoke styles based on chapter ID
  let videoStyles = {};
  if (chapter.id === 'bedroom') {
    videoStyles = { clipPath: bedroomClipPath, scale: bedroomScale };
  } else if (chapter.id === 'drawing') {
    videoStyles = { clipPath: drawingClipPath, x: drawingX };
  } else if (chapter.id === 'kitchen') {
    videoStyles = { scale: kitchenScale, clipPath: kitchenClipPath };
  } else if (chapter.id === 'washroom') {
    videoStyles = { scale: washroomScale, opacity: washroomOpacity };
  }

  // --- VIDEO SCRUBBING ENGINE ---
  useEffect(() => {
    let animationFrameId;

    const renderLoop = () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        const progress = scrollYProgress.get();
        
        // We want the video to scrub from 0% to 100% during the HOLD phase (roughly 20% to 80% scroll)
        // This ensures the video isn't scrubbing while it's still being revealed or exiting
        const scrubStart = 0.15;
        const scrubEnd = 0.85;
        
        let videoProgress = 0;
        if (progress <= scrubStart) {
           videoProgress = 0;
        } else if (progress >= scrubEnd) {
           videoProgress = 1;
        } else {
           videoProgress = (progress - scrubStart) / (scrubEnd - scrubStart);
        }

        // Limit to 0.99 to avoid exact end frame looping issues
        const safeProgress = Math.min(videoProgress, 0.99);
        const targetTime = safeProgress * videoRef.current.duration;
        
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.05) {
           videoRef.current.currentTime = targetTime;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollYProgress]);

  // --- HERO RENDER ---
  if (isHero) {
    return (
      <section ref={sectionRef} style={{ height: chapter.height }} className="relative w-full bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.video
            ref={videoRef}
            src={chapter.video}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]"
            muted
            playsInline
            preload="auto"
            style={{ scale: heroScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
          
          <motion.div 
            style={{ opacity: heroTextOpacity, y: heroTextY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
          >
            <div className="overflow-hidden mb-6">
               <motion.h1 
                 initial={{ y: "100%", opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
               >
                 Find a place you'll love<br className="hidden md:block"/> to call home.
               </motion.h1>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl text-gray-200 max-w-2xl font-light"
            >
              A peaceful stay with premium modern amenities in Vrindavan.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-xs tracking-[0.2em] text-white/70 uppercase mb-2 font-bold">Scroll</span>
              <motion.div 
                 animate={{ y: [0, 10, 0] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 className="w-[1px] h-12 bg-white/50"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // --- INTERIOR ROOM RENDER ---
  return (
    <section ref={sectionRef} style={{ height: chapter.height }} className="relative w-full bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Typography & Choreography */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-full flex items-center px-8 lg:px-24 z-20 relative bg-gradient-to-b lg:bg-gradient-to-r from-black via-black/90 to-transparent">
          <div className="max-w-xl w-full">
            
            {/* Architectural Line & Label */}
            <motion.div style={{ opacity: labelOpacity }} className="mb-8">
               <motion.div 
                  style={{ scaleX: labelLineScale }}
                  className="w-12 h-[1px] bg-primary mb-4 origin-left"
               />
               <div className="text-primary text-xs md:text-sm tracking-[0.3em] uppercase font-bold">
                 0{index} — {chapter.label}
               </div>
            </motion.div>

            {/* Scroll-Animated Typography */}
            <ScrollAnimatedText 
               text={chapter.text} 
               progress={scrollYProgress} 
               className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] text-white" 
            />
          </div>
        </div>

        {/* Right Side: Cinematic Visuals */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-full relative overflow-hidden z-10 flex items-center justify-center">
           
           {/* Background Parallax Layer */}
           <motion.div 
             style={{ opacity: chapterOpacity, y: bgParallax }}
             className="absolute inset-0 bg-[#0a0a0a]"
           />
           
           {/* Main Cinematic Video Layer */}
           <motion.video
             ref={videoRef}
             src={chapter.video}
             className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05]"
             muted
             playsInline
             preload="auto"
             style={videoStyles}
           />
           
           {/* Cinematic Overlays */}
           <div className="absolute inset-0 bg-black/10 pointer-events-none" />
           <motion.div style={{ opacity: chapterOpacity }} className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
           
           {/* Specific Room Decorative Elements */}
           {chapter.id === 'washroom' && (
              <motion.div 
                 style={{ opacity: washroomFrameOpacity, scale: washroomFrameScale }}
                 className="absolute inset-8 border border-white/10 pointer-events-none hidden lg:block"
              />
           )}
           {chapter.id !== 'washroom' && (
              <motion.div 
                style={{ opacity: textOpacity }}
                className="absolute left-0 top-0 w-[1px] h-full bg-white/10 hidden lg:block pointer-events-none"
              />
           )}
        </div>
      </div>
    </section>
  );
};

const VideoScroll = () => {
  return (
    <div className="bg-black">
      {chapters.map((chapter, index) => (
        <CinematicChapter 
          key={chapter.id} 
          chapter={chapter} 
          index={index} 
          isHero={chapter.type === 'hero'} 
        />
      ))}
    </div>
  );
};

export default VideoScroll;
