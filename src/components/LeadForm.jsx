import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent duplicate submissions
    setLoading(true);
    setErrorMsg("");
    const form = e.target;
    const payload = {
      name: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      property_requirement: form.propertyRequirement?.value ?? "",
      budget: form.budget?.value ?? "",
      message: form.message?.value ?? "",
    };
    try {
      const response = await fetch(
        process.env.REACT_APP_N8N_WEBHOOK_URL || "https://vansh4396.app.n8n.cloud/webhook/lead-capture",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      setSubmittedName(payload.name);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to submit the form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-10%" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">
             Contact Sales
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Talk to an <span className="font-bold text-black">Expert</span>
          </h2>
          <p className="text-xl mb-12 text-gray-500 font-light max-w-2xl mx-auto">
            Ready to find your perfect home? Reach out to our dedicated sales team for personalized assistance.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
             <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+919528895118" 
                className="group flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-full font-medium transition-colors shadow-xl"
             >
                <span className="text-xl">📞</span> 
                Call Now
                <span className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  →
                </span>
             </motion.a>
             <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919528895118" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-medium transition-colors shadow-xl"
             >
                <span className="text-xl">💬</span> 
                WhatsApp Us
                <span className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  →
                </span>
             </motion.a>
          </div>
        </motion.div>

        {/* Optional form underneath */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-10%" }}
           transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
           className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm text-left max-w-3xl mx-auto"
        >
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Thank you, {submittedName}!</h3>
              <p className="text-gray-600">Our team will contact you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input name="fullName" required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input name="phone" required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
                <input name="email" required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white" placeholder="your@email.com" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Requirement</label>
                  <input name="propertyRequirement" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white" placeholder="e.g. 1BHK" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <input name="budget" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white" placeholder="e.g. 45 Lacs" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea name="message" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white h-24 resize-none" placeholder="Any specific requirements or questions?"></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={loading}
                className="w-full bg-primary hover:bg-yellow-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2"
              >
                {loading ? 'Submitting...' : 'Request a Callback'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LeadForm;
