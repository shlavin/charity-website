import React, { useState } from 'react';

const HeroSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const handleDonate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/donations/mpesa', { // Correct backend endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone, amount: Number(amount) }) // Must match backend keys
      });

      const data = await res.json();
      console.log("Backend response:", data);
      alert('Payment initiated! Check your phone.');
      setShowForm(false);
      setPhone('');
      setAmount('');
    } catch (err) {
      console.error(err);
      alert('Payment failed. Check backend logs and M-Pesa sandbox.');
    }
  };

  return (
    <section
      id="hero"
      className="relative bg-cover bg-center h-[85vh] flex items-center justify-center"
      style={{ backgroundImage: "url('/herosection.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 text-white p-8 rounded-lg text-center max-w-2xl">
        <p className="text-2xl md:text-3xl font-bold mb-4">
          Every child deserves a future. With your help, we’re building it one meal, one book, one smile at a time.
        </p>
        <p className="text-lg font-bold mb-6 bg-red-500 text-white p-4">
          Together We Can Change Lives
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded"
        >
          Donate Now
        </button>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form
              onSubmit={handleDonate}
              className="bg-white text-black p-6 rounded shadow-md w-80"
            >
              <h2 className="text-xl font-bold mb-4">Enter donation details</h2>

              <input
                type="tel"
                placeholder="Phone number (2547XXXXXXXX)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Pay with M-Pesa
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
