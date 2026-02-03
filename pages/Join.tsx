
import React, { useState } from 'react';
import { DISTRICTS } from '../constants';
import { User, Phone, Mail, MapPin, Briefcase, CheckCircle } from 'lucide-react';

const Join = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    district: '',
    profession: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center animate-in zoom-in duration-300">
        <div className="text-center max-w-lg px-4">
          <div className="w-24 h-24 bg-bd-green/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-bd-green" />
          </div>
          <h2 className="text-4xl font-extrabold mb-4">Registration Successful!</h2>
          <p className="text-slate-600 text-lg mb-8">
            Welcome to the movement, <strong>{formState.name}</strong>. A regional coordinator from {formState.district} will contact you shortly via {formState.phone}.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="bg-bd-green text-white px-8 py-3 rounded-full font-bold hover:bg-bd-green/90 transition-all"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Join the Movement</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Become a part of the fastest-growing national movement in Bangladesh. Your voice matters.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-8">Why Join Us?</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-bd-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="text-bd-green w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Direct Participation</h4>
                    <p className="text-slate-600">Have a seat at the table during town halls and policy drafting sessions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-bd-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="text-bd-red w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Professional Networking</h4>
                    <p className="text-slate-600">Connect with experts, leaders, and like-minded patriots across the nation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-blue-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Regional Impact</h4>
                    <p className="text-slate-600">Lead or support development initiatives specifically for your home district.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-slate-600 italic">
                  "I joined Voice of Bangladesh because I wanted to see a party that actually has a plan for the youth. It's refreshing to be part of something so professional and forward-thinking."
                </p>
                <div className="mt-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-300 mr-3"></div>
                  <div>
                    <span className="block font-bold">Nabil Chowdhury</span>
                    <span className="text-xs text-slate-500">Student, DU</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
              <h3 className="text-2xl font-bold mb-8">Membership Registration</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      required
                      type="text" 
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green"
                      placeholder="Enter your full name"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input 
                        required
                        type="tel" 
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green"
                        placeholder="017XX-XXXXXX"
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input 
                        type="email" 
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green"
                        placeholder="name@email.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Home District *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <select 
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green appearance-none bg-white"
                      value={formState.district}
                      onChange={(e) => setFormState({...formState, district: e.target.value})}
                    >
                      <option value="">Select your district</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Profession</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green"
                      placeholder="Your current profession"
                      value={formState.profession}
                      onChange={(e) => setFormState({...formState, profession: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-bd-green text-white py-4 rounded-xl font-bold text-lg hover:bg-bd-green/90 transition-all shadow-xl shadow-bd-green/20"
                  >
                    Submit Membership Application
                  </button>
                  <p className="text-[10px] text-slate-400 mt-4 text-center">
                    By joining, you agree to our Code of Conduct and the party constitution.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Join;
