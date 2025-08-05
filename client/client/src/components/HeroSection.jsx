
import React from 'react';

const HeroSection = () => {
  return (
    <section id="hero"
      className="relative bg-cover bg-center h-[85vh] flex items-center justify-center"
      style={{
        backgroundImage: "url('/herosection.jpg')"
      }}
    >
      <div className="bg-black bg-opacity-50 text-white p-8 rounded-lg text-center max-w-2xl">
        <p className="text-2xl md:text-3xl font-bold mb-4">Every child deserves a future. With your help, we’re building it one meal, one book, one smile at a time.</p>
        <p className="text-lg font-bold mb-6 bg-red-500 text-white p-4">
        Together We Can Change Lives
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded">
          Donate Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
