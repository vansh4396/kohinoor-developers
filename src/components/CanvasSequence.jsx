import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import { frameLoader } from '../lib/FrameLoader';

/*
 * ============================================================
 * FRAME CONFIGURATION
 * ============================================================
 */

const generateFrameUrls = () => {
  const urls = [];

  const sequences = [
    'v1',
    'v2',
    'v3',
    'v4',
  ];

  sequences.forEach((sequence) => {
    for (let i = 1; i <= 240; i++) {
      const number = i
        .toString()
        .padStart(4, '0');

      urls.push(
        `/assets/frames/${sequence}/frame_${number}.jpg`
      );
    }
  });

  return urls;
};

const frameUrls = generateFrameUrls();

const TOTAL_FRAMES = frameUrls.length;


/*
 * ============================================================
 * COMPONENT
 * ============================================================
 */

const CanvasSequence = () => {
  const containerRef = useRef(null);

  const canvasRef = useRef(null);

  const ctxRef = useRef(null);

  const [
    isLoaded,
    setIsLoaded,
  ] = useState(false);

  /*
   * Renderer refs.
   */
  const lastRenderedIndex = useRef(-1);

  const lastTargetIndex = useRef(0);

  const directionRef = useRef(1);

  const animationFrameRef = useRef(null);

  const resizeObserverRef = useRef(null);

  /*
   * Scroll progress.
   */
  const {
    scrollYProgress,
  } = useScroll({
    target: containerRef,
    offset: [
      'start start',
      'end end',
    ],
  });


  /*
   * ============================================================
   * DRAW FRAME
   * ============================================================
   */

  const drawFrame = (img) => {
    const canvas = canvasRef.current;

    const ctx = ctxRef.current;

    if (
      !canvas ||
      !ctx ||
      !img
    ) {
      return;
    }

    const canvasWidth = canvas.width;

    const canvasHeight = canvas.height;

    const canvasRatio =
      canvasWidth / canvasHeight;

    const imageRatio =
      img.width / img.height;

    let drawWidth;

    let drawHeight;

    let offsetX = 0;

    let offsetY = 0;

    /*
     * Cover.
     */
    if (
      canvasRatio > imageRatio
    ) {
      drawWidth = canvasWidth;

      drawHeight =
        canvasWidth / imageRatio;

      offsetY =
        (
          canvasHeight -
          drawHeight
        ) / 2;
    } else {
      drawHeight = canvasHeight;

      drawWidth =
        canvasHeight * imageRatio;

      offsetX =
        (
          canvasWidth -
          drawWidth
        ) / 2;
    }

    ctx.clearRect(
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    ctx.imageSmoothingEnabled = true;

    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      img,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    );
  };


  /*
   * ============================================================
   * FIND BEST AVAILABLE FRAME
   * ============================================================
   *
   * If the exact requested frame hasn't arrived yet,
   * render the nearest available frame instead of
   * freezing the canvas.
   */

  const renderBestAvailableFrame = useCallback(
    (targetIndex) => {
      /*
       * Exact frame.
       */
      const exact =
        frameLoader.getFrame(
          frameUrls[targetIndex]
        );

      if (exact) {
        drawFrame(exact);

        lastRenderedIndex.current =
          targetIndex;

        return;
      }

      /*
       * Search in the direction of travel first.
       */
      const direction =
        directionRef.current;

      const searchDistances = [
        1,
        2,
        3,
        4,
        5,
        6,
        8,
        10,
        12,
        15,
        20,
      ];

      for (
        const distance of
        searchDistances
      ) {
        const candidateIndex =
          targetIndex +
          direction * distance;

        if (
          candidateIndex < 0 ||
          candidateIndex >=
          TOTAL_FRAMES
        ) {
          continue;
        }

        const candidate =
          frameLoader.getFrame(
            frameUrls[
            candidateIndex
            ]
          );

        if (candidate) {
          drawFrame(candidate);

          lastRenderedIndex.current =
            candidateIndex;

          return;
        }
      }

      /*
       * Search opposite direction as fallback.
       */
      for (
        const distance of
        searchDistances
      ) {
        const candidateIndex =
          targetIndex -
          direction * distance;

        if (
          candidateIndex < 0 ||
          candidateIndex >=
          TOTAL_FRAMES
        ) {
          continue;
        }

        const candidate =
          frameLoader.getFrame(
            frameUrls[
            candidateIndex
            ]
          );

        if (candidate) {
          drawFrame(candidate);

          lastRenderedIndex.current =
            candidateIndex;

          return;
        }
      }

      /*
       * If absolutely nothing is available,
       * keep the previous frame.
       */
    },
    []
  );


  /*
   * ============================================================
   * INITIAL FRAME
   * ============================================================
   */

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      try {
        await frameLoader.loadImage(
          frameUrls[0],
          -10000
        );

        if (!cancelled) {
          setIsLoaded(true);
        }
      } catch (error) {
        console.error(
          'Failed to load first frame:',
          error
        );

        if (!cancelled) {
          setIsLoaded(true);
        }
      }
    };

    initialize();

    return () => {
      cancelled = true;
    };
  }, []);


  /*
   * ============================================================
   * CANVAS + SCROLL ENGINE
   * ============================================================
   */

  useEffect(() => {
    if (
      !isLoaded ||
      !canvasRef.current
    ) {
      return;
    }

    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext(
        '2d',
        {
          alpha: false,
        }
      );

    if (!ctx) {
      return;
    }

    ctxRef.current = ctx;


    /*
     * Resize canvas.
     */
    const resizeCanvas = () => {
      const rect =
        canvas.getBoundingClientRect();

      /*
       * Cap DPR at 2.
       *
       * This prevents enormous canvas memory
       * usage on high-DPI displays.
       */
      const dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );

      canvas.width =
        Math.max(
          1,
          Math.floor(
            rect.width * dpr
          )
        );

      canvas.height =
        Math.max(
          1,
          Math.floor(
            rect.height * dpr
          )
        );

      /*
       * Redraw current frame after resize.
       */
      const progress =
        scrollYProgress.get();

      const index =
        Math.min(
          TOTAL_FRAMES - 1,
          Math.max(
            0,
            Math.floor(
              progress *
              (
                TOTAL_FRAMES - 1
              )
            )
          )
        );

      const frame =
        frameLoader.getFrame(
          frameUrls[index]
        );

      if (frame) {
        drawFrame(frame);

        lastRenderedIndex.current =
          index;
      }
    };


    /*
     * ResizeObserver.
     */
    if (
      typeof ResizeObserver !==
      'undefined'
    ) {
      resizeObserverRef.current =
        new ResizeObserver(
          resizeCanvas
        );

      resizeObserverRef.current.observe(
        canvas
      );
    } else {
      window.addEventListener(
        'resize',
        resizeCanvas
      );
    }

    resizeCanvas();


    /*
     * ========================================================
     * RENDER LOOP
     * ========================================================
     */

    const renderLoop = () => {
      const progress =
        scrollYProgress.get();

      const targetIndex =
        Math.min(
          TOTAL_FRAMES - 1,
          Math.max(
            0,
            Math.floor(
              progress *
              (
                TOTAL_FRAMES - 1
              )
            )
          )
        );


      /*
       * Detect direction.
       */
      if (
        targetIndex >
        lastTargetIndex.current
      ) {
        directionRef.current = 1;
      } else if (
        targetIndex <
        lastTargetIndex.current
      ) {
        directionRef.current = -1;
      }

      lastTargetIndex.current =
        targetIndex;


      /*
       * Tell loader what frame is currently
       * needed and which direction we're moving.
       */
      frameLoader.preload(
        frameUrls,
        targetIndex,
        directionRef.current
      );


      /*
       * Only attempt a new draw when target changes.
       */
      if (
        targetIndex !==
        lastRenderedIndex.current
      ) {
        renderBestAvailableFrame(
          targetIndex
        );
      }


      animationFrameRef.current =
        requestAnimationFrame(
          renderLoop
        );
    };


    animationFrameRef.current =
      requestAnimationFrame(
        renderLoop
      );


    /*
     * Cleanup.
     */
    return () => {
      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      if (
        resizeObserverRef.current
      ) {
        resizeObserverRef.current.disconnect();

        resizeObserverRef.current =
          null;
      } else {
        window.removeEventListener(
          'resize',
          resizeCanvas
        );
      }

      ctxRef.current = null;
    };
  }, [
    isLoaded,
    scrollYProgress,
    renderBestAvailableFrame,
  ]);


  /*
   * ============================================================
   * TEXT ANIMATIONS
   * ============================================================
   */

  const seq1Opacity =
    useTransform(
      scrollYProgress,
      [
        0.05,
        0.1,
        0.2,
        0.23,
      ],
      [0, 1, 1, 0]
    );

  const seq2Opacity =
    useTransform(
      scrollYProgress,
      [
        0.3,
        0.35,
        0.45,
        0.48,
      ],
      [0, 1, 1, 0]
    );

  const seq3Opacity =
    useTransform(
      scrollYProgress,
      [
        0.55,
        0.6,
        0.7,
        0.73,
      ],
      [0, 1, 1, 0]
    );

  const seq4Opacity =
    useTransform(
      scrollYProgress,
      [
        0.8,
        0.85,
        0.95,
        0.98,
      ],
      [0, 1, 1, 0]
    );


  /*
   * ============================================================
   * UI
   * ============================================================
   */

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      style={{
        height: '800vh',
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
            <div className="text-[#D4AF37] font-serif tracking-widest uppercase animate-pulse">
              Kohinoor Developers
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            width: '100%',
            height: '100%',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none z-10">

          <motion.div
            style={{
              opacity: seq1Opacity,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16"
          >
            <div className="w-12 h-[1px] bg-[#D4AF37] mb-6" />

            <h2 className="font-serif text-5xl md:text-7xl text-[#F5F1E8] mb-6 drop-shadow-xl">
              The Arrival
            </h2>

            <p className="font-sans font-light text-[#D9D3C7] text-lg md:text-2xl drop-shadow-lg max-w-3xl">
              A grand entrance designed to shift the senses. Natural light pours through double-height volumes, welcoming you home.
            </p>
          </motion.div>


          <motion.div
            style={{
              opacity: seq2Opacity,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16"
          >
            <div className="w-12 h-[1px] bg-[#D4AF37] mb-6" />

            <h2 className="font-serif text-5xl md:text-7xl text-[#F5F1E8] mb-6 drop-shadow-xl">
              Living Spaces
            </h2>

            <p className="font-sans font-light text-[#D9D3C7] text-lg md:text-2xl drop-shadow-lg max-w-3xl">
              Seamless transitions between the kitchen and living areas. Materiality grounded in warm stone and textured wood.
            </p>
          </motion.div>


          <motion.div
            style={{
              opacity: seq3Opacity,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16"
          >
            <div className="w-12 h-[1px] bg-[#D4AF37] mb-6" />

            <h2 className="font-serif text-5xl md:text-7xl text-[#F5F1E8] mb-6 drop-shadow-xl">
              Private Retreats
            </h2>

            <p className="font-sans font-light text-[#D9D3C7] text-lg md:text-2xl drop-shadow-lg max-w-3xl">
              The master suite and bath. A sanctuary of calm, where every detail is meticulously considered for personal restoration.
            </p>
          </motion.div>


          <motion.div
            style={{
              opacity: seq4Opacity,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16"
          >
            <div className="w-12 h-[1px] bg-[#D4AF37] mb-6" />

            <h2 className="font-serif text-5xl md:text-7xl text-[#F5F1E8] mb-6 drop-shadow-xl">
              The Final Reveal
            </h2>

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