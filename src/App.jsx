import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CanvasSequence from './components/CanvasSequence';
import Chatbot from './components/Chatbot';

const faqs = [
  {
    question: "What is the architectural philosophy behind Kohinoor Developers?",
    answer: "We believe in the thoughtful making of space. Our philosophy is rooted in minimalism, utilizing natural light, raw materials, and seamless indoor-outdoor transitions to create environments that foster a deep sense of calm and permanence."
  },
  {
    question: "Where are your properties located?",
    answer: "Our current showcase properties are located in premium, highly sought-after neighborhoods designed for privacy and exclusivity. Please contact our concierge for specific location details."
  },
  {
    question: "Do you offer private viewings?",
    answer: "Yes, private viewings are available strictly by appointment. We ensure that our clients experience the property in complete privacy. You can request an invitation using the form below."
  },
  {
    question: "Are the residences fully furnished?",
    answer: "Our residences can be delivered in a bespoke, fully furnished state, curated by our interior design team to perfectly match the architectural language of the home."
  },
  {
    question: "What is the typical timeline for custom builds?",
    answer: "For custom developments, timelines generally range between 18 to 24 months from the finalization of the architectural plans, ensuring uncompromising attention to detail at every stage of construction."
  }
];

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <h4 className="font-serif text-xl text-[#F5F5F0]">{faq.question}</h4>
        <span className="text-[#D4AF37] text-2xl font-light ml-4">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="font-light text-gray-400 mt-4 leading-relaxed text-sm">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#F5F5F0] font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Premium minimal navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <div className="font-serif tracking-widest text-sm uppercase">Kohinoor Developers</div>
        <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-light text-gray-300">
          <span className="hover:text-white cursor-pointer transition-colors">Residence</span>
          <span className="hover:text-white cursor-pointer transition-colors">Architecture</span>
          <span className="hover:text-white cursor-pointer transition-colors">Gallery</span>
        </div>
        <button 
          onClick={() => document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' })}
          className="text-xs uppercase tracking-widest border border-white/30 px-6 py-3 rounded-none hover:bg-white hover:text-black transition-colors duration-500"
        >
          Request Private Viewing
        </button>
      </nav>

      {/* Cinematic Scroll Journey (Frames 1-960) */}
      <CanvasSequence />

      {/* Philosophy Section */}
      <section className="py-40 px-6 max-w-4xl mx-auto text-center">
        <h3 className="font-serif text-5xl md:text-7xl text-[#F5F5F0] leading-snug mb-8">
          Architecture is the thoughtful making of space.
        </h3>
        <p className="font-sans font-light text-gray-400 text-lg max-w-2xl mx-auto">
          Every line, texture, and volume in the Kohinoor Residence was conceived to foster a deep sense of calm. 
          It is an environment where light defines the time of day, and materiality grounds the senses.
        </p>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <h3 className="font-serif text-4xl text-[#F5F5F0]">The Gallery</h3>
           <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="group cursor-pointer">
              <div className="overflow-hidden bg-[#121212] aspect-[4/3]">
                 <img src="/assets/frames/v1/frame_0100.jpg" alt="The Approach" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
              </div>
              <div className="mt-4 border-b border-white/20 pb-2 inline-block">
                 <h4 className="font-serif text-lg tracking-widest uppercase text-gray-300">The Approach</h4>
              </div>
           </div>
           <div className="group cursor-pointer">
              <div className="overflow-hidden bg-[#121212] aspect-[4/3]">
                 <img src="/assets/frames/v2/frame_0150.jpg" alt="The Core" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
              </div>
              <div className="mt-4 border-b border-white/20 pb-2 inline-block">
                 <h4 className="font-serif text-lg tracking-widest uppercase text-gray-300">The Core</h4>
              </div>
           </div>
           <div className="group cursor-pointer">
              <div className="overflow-hidden bg-[#121212] aspect-[4/3]">
                 <img src="/assets/frames/v3/frame_0120.jpg" alt="The Retreat" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
              </div>
              <div className="mt-4 border-b border-white/20 pb-2 inline-block">
                 <h4 className="font-serif text-lg tracking-widest uppercase text-gray-300">The Retreat</h4>
              </div>
           </div>
           <div className="group cursor-pointer">
              <div className="overflow-hidden bg-[#121212] aspect-[4/3]">
                 <img src="/assets/frames/v4/frame_0180.jpg" alt="The Climax" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
              </div>
              <div className="mt-4 border-b border-white/20 pb-2 inline-block">
                 <h4 className="font-serif text-lg tracking-widest uppercase text-gray-300">The Climax</h4>
              </div>
           </div>
        </div>
      </section>

      {/* Proof / Trust Layer */}
      <section className="py-32 px-6 bg-[#121212] border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
           <div>
              <div className="text-[#D4AF37] font-serif text-5xl mb-4">01</div>
              <h4 className="text-sm tracking-widest uppercase mb-4 text-gray-300">Craftsmanship</h4>
              <p className="font-light text-gray-500 text-sm leading-relaxed">
                 Sourced natural stone, precision-engineered glass, and hand-finished warm woods define the material palette.
              </p>
           </div>
           <div>
              <div className="text-[#D4AF37] font-serif text-5xl mb-4">02</div>
              <h4 className="text-sm tracking-widest uppercase mb-4 text-gray-300">Scale</h4>
              <p className="font-light text-gray-500 text-sm leading-relaxed">
                 Double-height volumes and seamless indoor-outdoor transitions expand the perceived boundaries of the home.
              </p>
           </div>
           <div>
              <div className="text-[#D4AF37] font-serif text-5xl mb-4">03</div>
              <h4 className="text-sm tracking-widest uppercase mb-4 text-gray-300">Legacy</h4>
              <p className="font-light text-gray-500 text-sm leading-relaxed">
                 Developed by Kohinoor, bringing decades of uncompromising architectural rigor to residential design.
              </p>
           </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 px-6 max-w-3xl mx-auto">
        <h3 className="font-serif text-4xl mb-12 text-center">Frequently Asked Questions</h3>
        <div className="flex flex-col">
           {faqs.map((faq, idx) => (
             <FAQItem key={idx} faq={faq} />
           ))}
        </div>
      </section>

      {/* Conversion / Lead Form */}
      <section id="lead-form" className="py-40 px-6 max-w-2xl mx-auto text-center">
         <h3 className="font-serif text-4xl mb-6">Experience the Residence</h3>
         <p className="text-gray-400 font-light mb-12">
            Private viewings are available by appointment only. Leave your details below and our concierge will contact you.
         </p>
         <form onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            console.log('Submitting lead data:', Object.fromEntries(formData.entries()));
            fetch('https://vansh4396.app.n8n.cloud/webhook/lead-capture', {
              method: 'POST',
              mode: 'no-cors',
              body: formData
            })
            .then(() => {
              alert('Thank you. Your request for a private viewing has been received.');
              e.target.reset();
            })
            .catch(err => {
              console.error('Webhook error:', err);
              alert('There was an error submitting your request: ' + err.message);
            });
         }} className="flex flex-col gap-8 text-left">
            <div className="flex flex-col">
               <label className="text-xs uppercase tracking-widest text-gray-400 mb-2">Name</label>
               <input type="text" name="name" className="bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-white text-lg" required />
            </div>
            <div className="flex flex-col">
               <label className="text-xs uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
               <input type="tel" name="phone" className="bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-white text-lg" required />
            </div>
            <div className="flex flex-col">
               <label className="text-xs uppercase tracking-widest text-gray-400 mb-2">Email ID</label>
               <input type="email" name="email" className="bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-white text-lg" required />
            </div>
            <div className="flex flex-col">
               <label className="text-xs uppercase tracking-widest text-gray-400 mb-2">Property Requirement</label>
               <input type="text" name="propertyRequirement" className="bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-white text-lg" required />
            </div>
            <div className="flex flex-col">
               <label className="text-xs uppercase tracking-widest text-gray-400 mb-2">Budget</label>
               <input type="text" name="budget" className="bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-white text-lg" required />
            </div>
            <div className="flex flex-col">
               <label className="text-xs uppercase tracking-widest text-gray-400 mb-2">Message</label>
               <textarea name="message" rows="3" className="bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-white text-lg resize-none"></textarea>
            </div>
            <button type="submit" className="mt-8 bg-white text-black py-6 uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-white transition-all duration-500 font-medium">
               Request Invitation
            </button>
         </form>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center px-12 text-xs text-gray-500 uppercase tracking-widest">
         <p>Kohinoor Developers © 2026</p>
         <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
         </div>
      </footer>

      {/* AI Assistant */}
      <Chatbot />
    </div>
  );
};

export default App;
