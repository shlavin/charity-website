import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Map menu items to their actual section IDs
  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'Projects' },
    { name: 'Contact', id: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm w-screen overflow-hidden">
      {/* Container with strict width control */}
      <div className="w-full mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center flex-shrink-0 max-w-[70%]">
            <img
              src="logo.png"
              alt="WonderFamilylogo"
              className="h-8 w-auto max-h-[40px] object-contain mr-2 md:h-10"
            />
            <h1 className="text-xl font-bold text-yellow-500 truncate md:text-2xl">
              Wonder <span className="text-gray-900">Family</span>
            </h1>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-800 p-1 ml-2 flex-shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={`#${link.id}`}
                    className="px-3 py-2 text-gray-700 hover:text-yellow-500 whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white w-full border-t">
            <div className="px-4 py-2 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  className="py-3 text-gray-700 hover:text-yellow-500 border-b last:border-b-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
