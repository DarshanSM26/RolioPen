import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Check, Facebook, Twitter, Instagram, ChevronDown, Package, Droplet } from 'lucide-react';

export default function SleekPenStore() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const saveToMemory = (data) => {
    const timestamp = new Date().toISOString();
    const record = { ...data, timestamp, id: Date.now() };
    setOrders(prev => [...prev, record]);
    console.log('Order saved:', record);
    return record;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Enter valid 10-digit Indian phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBuyNow = () => {
    setShowModal(true);
  };

  const handleDirectBuy = () => {
    window.open('https://rzp.io/rzp/chPU7Gb', '_blank');
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    saveToMemory({
      type: 'order',
      name: formData.name,
      phone: formData.phone,
      amount: 349,
      product: 'Rolio Black Pen'
    });

    const razorpayLink = 'https://rzp.io/rzp/chPU7Gb';
    window.open(razorpayLink, '_blank');

    setShowModal(false);
    setFormData({ name: '', phone: '' });
    setIsSubmitting(false);
    alert('✓ Information saved! Redirecting to payment gateway...');
  };

  const handleContactSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill all fields');
      return;
    }
    saveToMemory({ type: 'contact', ...contactForm });
    alert('✓ Thank you! We will get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const faqs = [
    { q: 'What is the delivery time?', a: 'Standard delivery takes 3-5 business days across India. Express delivery available in select cities.' },
    { q: 'What is your refund policy?', a: 'We offer a 7-day return policy if the product is unused and in original packaging.' },
    { q: 'What type of ink does it use?', a: 'Premium gel ink with smooth flow, smudge-proof, and long-lasting performance.' },
    { q: 'Is it refillable?', a: 'Yes, the pen accepts standard refills available at most stationery stores.' }
  ];

  const reviews = [
    { name: 'Priya Sharma', rating: 5, text: 'Best pen I\'ve ever used! The ink flow is incredibly smooth and it looks premium.' },
    { name: 'Rahul Verma', rating: 5, text: 'Perfect for my daily note-taking. Elegant design and comfortable grip.' },
    { name: 'Ananya Reddy', rating: 5, text: 'Great value for money. Writes like a dream and feels expensive!' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">ROLIO PEN</h1>
          <button
            onClick={handleDirectBuy}
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105"
          >
            <ShoppingCart size={18} />
            Buy Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6 animate-fade-in">
            <div className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm">Premium Quality</div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">Rolio Black Pen</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              A premium, minimalistic black pen with ultra-smooth ink flow and elegant design — perfect for students and professionals.
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold">₹349</span>
              <span className="text-gray-500 line-through text-xl">₹599</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">42% OFF</span>
            </div>
            <p className="text-sm text-gray-500">Inclusive of all taxes • Free Shipping</p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleDirectBuy}
                className="flex-1 bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
              >
                Buy Now
              </button>
            </div>
            <div className="flex gap-8 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="text-green-600" size={18} />
                <span>Smooth Ink Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-600" size={18} />
                <span>Premium Finish</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-600" size={18} />
                <span>Ergonomic Design</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 animate-slide-in">
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 shadow-2xl">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="aspect-square flex items-center justify-center">
                  <img src="/pen.jpg" alt="Rolio Black Pen" className="w-64 h-full object-contain transform rotate-90" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-xl">
                <Star className="text-yellow-400 fill-yellow-400" size={32} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Rolio Black Pen?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Droplet, title: 'Ultra-Smooth Ink', desc: 'Premium gel ink technology ensures effortless writing' },
              { icon: Package, title: 'Premium Build', desc: 'Crafted with high-quality materials for lasting durability' },
              { icon: Star, title: 'Elegant Design', desc: 'Minimalist aesthetics that complement any style' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="mb-4" size={40} />
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="text-yellow-400 fill-yellow-400" size={18} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <p className="font-semibold text-sm">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <ChevronDown className={`transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Get In Touch</h3>
          <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <label className="block font-semibold mb-2">Name</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Message</label>
              <textarea
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={handleContactSubmit}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all font-semibold"
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold mb-2">ROLIO PEN</h4>
              <p className="text-gray-400">Write with elegance, express with style</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-400 transition-colors"><Facebook /></a>
              <a href="#" className="hover:text-gray-400 transition-colors"><Twitter /></a>
              <a href="#" className="hover:text-gray-400 transition-colors"><Instagram /></a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 Rolio Pen. All rights reserved. | Made with precision and care
          </div>
        </div>
      </footer>

      {/* Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <h3 className="text-2xl font-bold mb-6">Complete Your Order</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold">₹349</span>
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="flex-1 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all font-semibold disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Processing...' : 'Proceed to Pay'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}