import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: "What types of residences are available?", a: "Discover thoughtfully designed residences with spacious layouts, premium finishes, and modern amenities." },
  { q: "What amenities are available at Hare Krishna Ashiyana?", a: "Residents can enjoy a range of lifestyle-focused amenities designed for comfort, relaxation, and convenience." },
  { q: "Where is Hare Krishna Ashiyana located?", a: "The property is strategically located to offer convenient access to key destinations while providing a peaceful living environment." },
  { q: "Are the residences suitable for families?", a: "Yes, the residences are thoughtfully designed to provide a comfortable, spacious, and secure environment for families." },
  { q: "How can I schedule a site visit?", a: "Simply submit your details through the enquiry form, and our team will get in touch to arrange a convenient site visit." }
];

const FAQItem = ({ faq, isOpen, onClick, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-white/10 py-6"
    >
      <button 
        onClick={onClick}
        className="w-full flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-xl font-light text-white group-hover:text-primary transition-colors duration-500 pr-8">
          {faq.q}
        </span>
        <span className="text-2xl font-light text-primary transform transition-transform duration-500">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: 16 },
              collapsed: { opacity: 0, height: 0, marginTop: 0 }
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#050505] py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">
             10 — Details
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Frequently Asked <span className="font-bold text-primary">Questions</span></h2>
          <p className="text-lg text-gray-400 font-light">Everything you need to know about Hare Krishna Ashiyana.</p>
        </motion.div>

        <div className="bg-black rounded-3xl p-6 md:p-12 shadow-2xl border border-white/5">
           {faqs.map((faq, index) => (
             <FAQItem 
               key={index} 
               index={index}
               faq={faq} 
               isOpen={index === openIndex} 
               onClick={() => setOpenIndex(index === openIndex ? -1 : index)} 
             />
           ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
