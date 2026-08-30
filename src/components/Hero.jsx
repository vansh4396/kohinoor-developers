import React from 'react';

const Hero = () => {
  return (
    <div className="h-screen flex items-center justify-center text-center px-4 pt-20">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 font-montserrat drop-shadow-lg">
          Premium Hare Krishna Resort Suites
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light drop-shadow-md">
          Discover a peaceful stay with premium modern amenities in Vrindavan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          <a href="#contact" className="bg-primary hover:bg-yellow-500 text-black2 font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 shadow-lg">
            About Us
          </a>
          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-sm py-2 px-6 rounded-full border border-white/20 text-white">
            <div className="flex text-primary text-xl">★★★★★</div>
            <span className="font-semibold text-sm">MVDA APPROVED 5.0 | 2348 Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
