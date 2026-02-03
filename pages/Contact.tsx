
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-bd-red/10 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Contact Our Office</h1>
          <p className="text-slate-400 text-lg max-w-2xl">We are here to listen to the people. Get in touch with our media or administrative cell.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-8">Official Channels</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-bd-green/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="text-bd-green w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Email Address</span>
                      <a href="mailto:contact@voiceofbd.org" className="text-slate-600 hover:text-bd-red transition-colors">contact@voiceofbd.org</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-bd-green/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="text-bd-green w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Phone Number</span>
                      <a href="tel:+8801234567890" className="text-slate-600 hover:text-bd-red transition-colors">+880 1234-567890</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-bd-green/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="text-bd-green w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Headquarters</span>
                      <span className="text-slate-600">Level 5, Gulshan Tower, Dhaka, Bangladesh</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6">Social Networks</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-bd-red transition-all"><Facebook /></a>
                  <a href="#" className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-bd-red transition-all"><Twitter /></a>
                  <a href="#" className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-bd-red transition-all"><Youtube /></a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
                <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green" placeholder="John Doe" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green" placeholder="john@example.com" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green" placeholder="How can we help you?" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                    <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green" placeholder="Type your message here..."></textarea>
                  </div>
                  <div className="col-span-2">
                    <button className="bg-bd-green text-white px-10 py-4 rounded-xl font-bold flex items-center hover:bg-bd-green/90 transition-all shadow-xl shadow-bd-green/20">
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[450px] bg-slate-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <span className="text-slate-500 font-bold uppercase tracking-widest">Google Maps Integration Placeholder</span>
          </div>
        </div>
        {/* Real Map would be an iframe here */}
      </section>
    </div>
  );
};

export default Contact;
