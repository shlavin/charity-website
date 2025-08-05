import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer id="Contact" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
       
        <div data-aos="fade-right">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-4">
            Have a question or want to support our cause? Reach out — we’d love to hear from you.
          </p>
          <p>Email: <a href="mailto:info@yourcharity.org" className="text-yellow-400">info@yourcharity.org</a></p>
          <p>Phone: <a href="tel:+254700000000" className="text-yellow-400">+254 700 000 000</a></p>
          <p>Location: Nairobi, Kenya</p>
        </div>

       
        <form
          className="bg-white p-6 rounded-xl shadow-md text-gray-900"
          data-aos="fade-left"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Message sent (not really, you need to connect to backend/email service)');
          }}
        >
          <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Message</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-12 text-sm">
        &copy; {new Date().getFullYear()} Wonder Family. All rights reserved.
      </div>
    </footer>
  );
};

export default ContactUs;
