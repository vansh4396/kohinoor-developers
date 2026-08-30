import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">Don't just take our word for it.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
            <div className="text-4xl text-blue-200 absolute top-4 left-4">"</div>
            <p className="text-gray-700 italic mb-6 relative z-10 text-lg">"Finding our dream home was a breeze with this team. Their dedication and knowledge of the market are unmatched."</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Sarah Jenkins</h4>
                <p className="text-sm text-gray-500">Homeowner in Beverly Hills</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
            <div className="text-4xl text-blue-200 absolute top-4 left-4">"</div>
            <p className="text-gray-700 italic mb-6 relative z-10 text-lg">"Professional, responsive, and truly understanding of what we were looking for. Highly recommend to anyone buying a home!"</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold text-gray-900">David & Emily</h4>
                <p className="text-sm text-gray-500">Recent Buyers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
