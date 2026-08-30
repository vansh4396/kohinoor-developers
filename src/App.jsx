import React from 'react';
import { motion } from 'framer-motion';
import VideoScroll from './components/VideoScroll';
import PropertyDetails from './components/PropertyDetails';
import ProjectPlan from './components/ProjectPlan';
import FAQ from './components/FAQ';
import LeadForm from './components/LeadForm';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* 1. Split-Screen Video Showcases */}
      <VideoScroll />

      {/* 2. Property Details & Amenities */}
      <PropertyDetails />

      {/* 3. Project Plan & Layout */}
      <ProjectPlan />

      {/* 4. Frequently Asked Questions */}
      <FAQ />

      {/* 5. Contact & Lead Capture Form */}
      <LeadForm />

      {/* Footer */}
      <footer className="bg-[#111] text-white py-20 px-6 relative z-20 overflow-hidden">
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10"
         >
            <div className="text-left">
               <h3 className="font-bold text-primary mb-4 text-sm tracking-[0.2em] uppercase">Contact Sales</h3>
               <p className="font-mono text-sm text-gray-400 mb-2 hover:text-white transition-colors cursor-pointer">Mr. Rahul Chauhan: +91 95288 95118</p>
               <p className="font-mono text-sm text-gray-400 mb-2 hover:text-white transition-colors cursor-pointer">Mr. Rajeev Anand: +91 97208 78882</p>
               <p className="font-mono text-sm text-gray-400 mb-2 hover:text-white transition-colors cursor-pointer">Mr. Anil Anand: +91 98377 40000</p>
               <p className="font-mono text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Mr. Vansh Chauhan: +91 87555 63983</p>
            </div>
            
            <div className="flex flex-col items-center">
               <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-primary/10 p-4 rounded-full mb-4 cursor-pointer"
               >
                  <span className="text-3xl">🛕</span>
               </motion.div>
               <p className="font-bold text-xl tracking-wide">Hare Krishna Ashiyana</p>
               <p className="text-gray-500 text-sm mt-2 max-w-xs text-center font-light">
                  Rukmani Vihar, Just 2 Minutes from ISKCON & Prem Mandir, Vrindavan.
               </p>
            </div>

            <div className="text-right">
               <h3 className="font-bold text-primary mb-4 text-sm tracking-[0.2em] uppercase">Follow Us</h3>
               <div className="flex justify-end gap-4">
                  <motion.div whileHover={{ y: -3 }} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                     <span>IG</span>
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                     <span>FB</span>
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                     <span>YT</span>
                  </motion.div>
               </div>
            </div>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center"
         >
            <p className="font-light">Copyright © 2026 Hare Krishna Resorts & Suites. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-6 flex">
               <button className="hover:text-primary transition-colors cursor-pointer text-sm font-light">Privacy Policy</button>
               <button className="hover:text-primary transition-colors cursor-pointer text-sm font-light">Terms of Service</button>
            </div>
         </motion.div>
      </footer>

      {/* AI Assistant */}
      <Chatbot />
    </div>
  );
}

export default App;
