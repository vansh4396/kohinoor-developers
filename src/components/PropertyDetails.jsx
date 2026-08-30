import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { title: 'MVDA Approved', subtitle: 'Fully authorized development', icon: '🏛️' },
  { title: 'UP RERA Registered', subtitle: 'Verified & transparent', icon: '✓' },
  { title: '100% RCC Structure', subtitle: 'Earthquake resistant safety', icon: '🏗️' },
  { title: 'Premium 1BHK', subtitle: 'Spacious & well designed', icon: '✨' },
];

const amenities = [
  { icon: '🏊', title: 'Swimming Pool', desc: 'Resort-style relaxation' },
  { icon: '🛕', title: 'Grand Temple', desc: 'Spiritual on-site attraction' },
  { icon: '🌳', title: 'Green Park', desc: 'Landscaped nature zones' },
  { icon: '🏋️', title: 'Modern Gym', desc: 'State-of-the-art fitness' },
  { icon: '🚗', title: 'Parking', desc: 'Dedicated resident spaces' },
  { icon: '🔒', title: 'Security', desc: '24x7 gated protection' },
];

const PropertyDetails = () => {
  return (
    <div className="bg-black text-white relative z-20">
      
      {/* Chapter 06: Key Highlights */}
      <section className="min-h-screen py-32 px-6 flex flex-col justify-center relative overflow-hidden bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, margin: "-20%" }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="mb-20"
          >
             <div className="flex items-center gap-4 mb-4 text-primary text-sm font-bold tracking-[0.2em] uppercase">
                <div className="w-8 h-[1px] bg-primary" />
                Key Highlights
             </div>
             <h2 className="text-4xl md:text-6xl font-light leading-tight">
               Built on a foundation <br/> of <span className="font-bold text-white">trust and quality.</span>
             </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {features.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group border-t border-white/10 pt-8 flex gap-6 hover:border-primary/50 transition-colors duration-500"
              >
                <div className="text-4xl md:text-5xl text-gray-600 group-hover:text-primary transition-colors duration-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-lg font-light">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      </section>

      {/* Chapter 07: Premium Amenities */}
      <section className="min-h-screen py-32 px-6 flex flex-col justify-center relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, margin: "-20%" }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="text-center mb-24"
          >
             <div className="flex justify-center items-center gap-4 mb-4 text-primary text-sm font-bold tracking-[0.2em] uppercase">
                <div className="w-8 h-[1px] bg-primary" />
                Premium Amenities
                <div className="w-8 h-[1px] bg-primary" />
             </div>
             <h2 className="text-4xl md:text-6xl font-light leading-tight">
               A lifestyle designed around <br/> <span className="font-bold text-white">comfort and convenience.</span>
             </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {amenities.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#111] p-10 rounded-2xl border border-white/5 hover:bg-[#1a1a1a] hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <span className="text-4xl mb-6 block transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 origin-left">{item.icon}</span>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PropertyDetails;
