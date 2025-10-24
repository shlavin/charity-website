import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // clear form
      } else {
        setStatus(`❌ ${data.error || 'Failed to send message.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('⚠️ Could not connect to the backend.');
    }
  };

  return (
    <footer id="Contact" className="bg-gray-900 text-white py-12">
      <div className="w-full px-0 grid md:grid-cols-2 gap-8">
        {/* Left side: Contact info */}
        <div data-aos="fade-right">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-4">
            Have a question or want to support our cause? Reach out — we’d love to hear from you.
          </p>
          <p>Email: <a href="mailto:info@yourcharity.org" className="text-yellow-400">info@yourcharity.org</a></p>
          <p>Phone: <a href="tel:+254700000000" className="text-yellow-400">+254 700 000 000</a></p>
          <p>Location: Nairobi, Kenya</p>
        </div>

        {/* Right side: Contact form */}
        <form
          className="bg-white p-6 rounded-xl shadow-md text-gray-900"
          data-aos="fade-left"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
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

          {status && (
            <p className="mt-3 text-sm text-gray-700">{status}</p>
          )}
        </form>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-gray-500 mt-12 text-sm">
        &copy; {new Date().getFullYear()} Wonder Family. All rights reserved.
      </div>
    </footer>
  );
};

export default ContactUs;
