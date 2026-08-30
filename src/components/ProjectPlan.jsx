import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const gallery = [
  { img: '/assets/bed room.jpeg', title: 'Bedroom' },
  { img: '/assets/drawing room.jpeg', title: 'Drawing Room' },
  { img: '/assets/kitchen.jpeg', title: 'Kitchen' },
  { img: '/assets/washroom.jpeg', title: 'Washroom' },
];

const ProjectPlan = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="bg-[#050505] text-white">
      {/* Chapter 08: Project Plan */}
      <section className="py-32 px-6 relative overflow-hidden">
        
        {/* Animated Architectural Lines */}
        <motion.div 
           initial={{ height: 0 }}
           whileInView={{ height: '100%' }}
           viewport={{ once: false }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="absolute left-10 md:left-24 top-0 w-[1px] bg-white/10"
        />

        <div className="max-w-7xl mx-auto relative z-10 pl-0 md:pl-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">
               08 — Layouts
            </div>
            <h2 className="text-4xl md:text-6xl font-light mb-4">
              Project <span className="font-bold text-white">Plan</span>
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl">
              Thoughtfully designed 1BHK layouts combining functionality and premium aesthetics.
            </p>
          </motion.div>

          {/* Plan Image with Mask Reveal and subtle Parallax */}
          <motion.div 
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-black p-4 md:p-8 rounded-xl border border-white/10 overflow-hidden relative"
          >
             <motion.img 
                style={{ y }}
                src="/assets/Screenshot 2026-08-30 011427.png" 
                alt="Hare Krishna Ashiyana Project Plan" 
                className="w-full h-auto object-contain rounded-lg opacity-80"
             />
          </motion.div>
        </div>
      </section>

      {/* Chapter 09: Static Room Gallery */}
      <section className="pb-32 px-6 relative z-20 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-10%" }}
                  transition={{ duration: 1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative cursor-pointer"
                >
                   {/* Image Container with overflow hidden for hover scale */}
                   <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-gray-900 border border-white/5">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                   </div>
                   
                   {/* Label */}
                   <div className="flex items-center justify-between">
                     <h4 className="text-white font-medium text-lg tracking-wide group-hover:text-primary transition-colors">{item.title}</h4>
                     <span className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-primary">
                       →
                     </span>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectPlan;
