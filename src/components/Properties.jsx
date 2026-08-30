import React from 'react';

const Properties = () => {
  return (
    <div className="w-full text-white pb-32">
      {/* Spacer to push content down into the scroll area */}
      <div className="h-screen flex items-end pb-20 justify-center">
        <div className="animate-bounce bg-black/50 p-4 rounded-full border border-white/20">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-black/70 backdrop-blur-md rounded-2xl p-10 border border-white/10 shadow-2xl mb-32 transform transition-all hover:scale-[1.02]">
          <div className="text-center">
            <h3 className="text-4xl font-montserrat font-bold text-primary mb-2">0.8</h3>
            <p className="text-gray-300 font-semibold tracking-wide">Project Area (Acres)</p>
          </div>
          <div className="text-center md:border-l md:border-r border-white/10">
            <h3 className="text-4xl font-montserrat font-bold text-primary mb-2">450+</h3>
            <p className="text-gray-300 font-semibold tracking-wide">Project Units Sq</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-montserrat font-bold text-primary mb-2">98.50%</h3>
            <p className="text-gray-300 font-semibold tracking-wide">Customer Satisfaction</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white text-black2 rounded-3xl p-10 md:p-16 shadow-2xl mb-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-center mb-16 text-title">
            Why Only Hare Krishna Resort & Suites
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 border border-yellow-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="text-3xl">🏗️</span>
              </div>
              <h3 className="text-xl font-bold mb-4 font-montserrat"><span className="text-primary">Mivan</span> Construction</h3>
              <p className="text-body leading-relaxed">
                Our flats are constructed using advanced Mivan Technology, delivering superior strength, precision finishing, and enhanced durability.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 border border-yellow-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="text-3xl">📜</span>
              </div>
              <h3 className="text-xl font-bold mb-4 font-montserrat"><span className="text-primary">MVDA</span> Approved</h3>
              <p className="text-body leading-relaxed">
                Approved under Permit No. Commercial Building/07670/MVDA/BP/24-25/0760/16122025 ensuring 100% legal compliance.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 border border-yellow-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-4 font-montserrat"><span className="text-primary">Affordable</span> Price</h3>
              <p className="text-body leading-relaxed">
                Smartly priced apartments that blend luxury with affordability, giving you maximum value for your investment.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-32">
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-center mb-4 text-white drop-shadow-md">
            Luxury & Elegant
          </h2>
          <p className="text-center text-gray-300 mb-12 text-lg">Premium Homes for a Peaceful & Modern Lifestyle</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['bed_room.jpeg', 'kitchen.jpeg', 'drawing_room.jpeg'].map((img, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 bg-gray-900 border border-white/20">
                <img 
                  src={`/assets/${img}`} 
                  alt={img.replace('.jpeg', '').replace('_', ' ')} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100"></div>
                <h3 className="absolute bottom-6 left-6 text-2xl font-montserrat font-bold text-white capitalize">
                  {img.replace('.jpeg', '').replace('_', ' ')}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Properties;
