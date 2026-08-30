import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../lib/chatbotEngine';
import { chatbotKnowledge } from '../chatbotKnowledge';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Namaste! 👋\n\nI'm Krishna, the AI assistant for Hare Krishna Resort & Suites.\n\nI can help you with:\n• Property details\n• Pricing\n• Amenities\n• Location\n• Payment plans\n• Site visits\n\nWhat would you like to know?",
      isBot: true,
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const [leadFormState, setLeadFormState] = useState('hidden'); // hidden, form, submitted, contacts
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '', requirement: '', budget: '', message: '' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, leadFormState]);

  const addMessage = (text, isBot = false, type = 'TEXT') => {
    setMessages(prev => [...prev, { text, isBot, type }]);
  };

  const handleSend = (e, customMessage = null) => {
    if (e) e.preventDefault();
    const userMessage = customMessage || input.trim();
    if (!userMessage) return;

    addMessage(userMessage, false);
    setInput("");
    setLeadFormState('hidden'); // Reset UI state on new message

    setTimeout(() => {
      const response = getChatbotResponse(userMessage);
      addMessage(response.text, true, response.type);
    }, 800);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    setLeadFormState('submitted');
    addMessage(`Thank you, ${leadData.name}! Your enquiry has been received. Our project team will get in touch with you shortly.`, true);
  };

  const quickQuestions = [
    "What is the starting price?",
    "Where is the project located?",
    "What amenities are available?",
    "Is the project RERA registered?",
    "What is the payment plan?",
    "Can I schedule a site visit?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[400px] h-[36rem] rounded-2xl shadow-2xl mb-4 border border-gray-200 flex flex-col overflow-hidden transition-all duration-300">
          <div className="bg-primary text-white p-4 flex justify-between items-center shadow-md z-10">
            <div>
              <h4 className="font-bold text-lg tracking-wide">Krishna AI Assistant</h4>
              <p className="text-xs text-yellow-100 mt-1 font-light">Hare Krishna Resort & Suites</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-3xl font-light leading-none transition-transform hover:scale-110">
              &times;
            </button>
          </div>
          
          <div className="flex-1 p-4 bg-gray-50/50 flex flex-col gap-4 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}>
                <div 
                  className={`p-3.5 rounded-2xl text-sm max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                    msg.isBot 
                      ? 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-sm' 
                      : 'bg-primary text-white shadow-md rounded-tr-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.type === 'BUYING_INTENT' && leadFormState === 'hidden' && idx === messages.length - 1 && (
                  <div className="flex flex-col gap-2 mt-3 w-full px-2">
                    <button 
                      onClick={() => setLeadFormState('contacts')}
                      className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                    >
                      Schedule Site Visit
                    </button>
                    <button 
                      onClick={() => setLeadFormState('form')}
                      className="w-full bg-primary text-white hover:bg-yellow-600 shadow-md font-semibold py-2.5 rounded-xl transition-colors text-sm"
                    >
                      Share My Details
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {leadFormState === 'form' && (
              <form onSubmit={handleLeadSubmit} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-3 mt-2 animate-fadeIn">
                <h5 className="font-semibold text-gray-800 text-sm mb-1">Your Details</h5>
                <input required type="text" placeholder="Full Name" value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                <input required type="tel" placeholder="Phone Number" value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                <input type="email" placeholder="Email (Optional)" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                <input type="text" placeholder="Property Requirement" value={leadData.requirement} onChange={e => setLeadData({...leadData, requirement: e.target.value})} className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                <input type="text" placeholder="Budget" value={leadData.budget} onChange={e => setLeadData({...leadData, budget: e.target.value})} className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                <textarea placeholder="Message" value={leadData.message} onChange={e => setLeadData({...leadData, message: e.target.value})} className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none h-20"></textarea>
                <button type="submit" className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-yellow-600 transition-colors mt-2 text-sm">
                  Submit Enquiry
                </button>
              </form>
            )}

            {leadFormState === 'contacts' && (
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mt-2 animate-fadeIn">
                <p className="text-sm text-gray-800 mb-4 font-medium">To arrange a site visit, please contact our project team:</p>
                <div className="flex flex-col gap-3">
                  {chatbotKnowledge.contacts.map((contact, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="font-semibold text-gray-700 text-sm">{contact.name}</span>
                      <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-primary hover:text-yellow-600 font-medium text-sm transition-colors flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick CTA Buttons */}
          {messages.length === 1 && (
            <div className="px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar bg-gray-50/50 border-t border-gray-100">
              {quickQuestions.map((q, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(null, q)} 
                  className="text-[13px] whitespace-nowrap bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full hover:border-primary hover:text-primary hover:shadow-sm transition-all shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-gray-700 bg-gray-50/50 transition-all"
              placeholder="Type your message..."
            />
            <button type="submit" className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md hover:bg-yellow-500 hover:shadow-lg transition-all hover:-translate-y-0.5">
              <svg className="w-5 h-5 transform rotate-45 -mt-1 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-16 h-16 bg-primary hover:bg-yellow-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 border-4 border-white group"
      >
        {isOpen ? (
           <span className="text-3xl font-light block -mt-1">&times;</span>
        ) : (
           <svg className="w-8 h-8 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
