import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md ">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 w-full max-w-7xl mx-auto overflow-x-hidden">
        <img src="logo.png" alt="WonderFamilylogo" className="h-10 md:h-12 object-contain mr-3"/>
        <div className="text-3xl font-bold text-yellow-400 tracking-widest">Wonder <span className="text-black">Family</span></div>

        
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          <li><a href="#hero" className="hover:text-yellow-500 transition">Home</a></li>
          <li><a href="#about" className="hover:text-yellow-500 transition">About</a></li>
          <li><a href="#Projects" className="hover:text-yellow-500 transition">Projects</a></li>
          <li><a href="#Contact" className="hover:text-yellow-500 transition">Contact</a></li>
        </ul>

       
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

     
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="w-full max-w-screen-sm mx-auto px-4 py-4 space-y-4">
          <a href="#hero" className="block text-gray-700 hover:text-yellow-500">Home</a>
          <a href="#about" className="block text-gray-700 hover:text-yellow-500">About</a>
          <a href="#Projects" className="block text-gray-700 hover:text-yellow-500">Projects</a>
          <a href="#Contact" className="block text-gray-700 hover:text-yellow-500">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
