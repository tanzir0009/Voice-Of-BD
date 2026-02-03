
import React from 'react';
import { Target, Shield, Flame, Star, Users, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { LEADER_INFO } from '../constants';

const Leadership = () => {
  return (
    <div className="bg-[#030303] min-h-screen pt-40 pb-40 px-4">
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <div>
            <span className="mono text-[#d90429] font-bold tracking-widest uppercase mb-6 block">Command Structure: Collective</span>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-10 uppercase italic">আদর্শিক <br/><span className="text-[#d90429]">নেতৃত্ব</span></h1>
            
            <div className="prose prose-2xl text-slate-400 font-['Hind_Siliguri'] leading-relaxed mb-12 space-y-8">
              <p>
                ভয়েস অফ বাংলাদেশ কোনো ব্যক্তির সম্পত্তি নয়। আমরা বিশ্বাস করি—নেতা নয়, নীতিই শ্রেষ্ঠ। চব্বিশের বিপ্লব আমাদের শিখিয়েছে কীভাবে সাধারণ ছাত্র-জনতা একেকজন নেতায় পরিণত হতে পারে।
              </p>
              <div className="border-l-8 border-[#d90429] pl-10 py-6 bg-zinc-900/50">
                 <p className="text-white font-black text-3xl italic">"ব্যক্তিপূজা ফ্যাসিবাদের জন্ম দেয়। আমরা পূজা করি আমাদের সার্বভৌমত্বকে, আমাদের পতাকাকে।"</p>
              </div>
              <p>
                আমাদের কেন্দ্রীয় কাউন্সিল গঠিত হয়েছে সেইসব তরুণ যোদ্ধাদের নিয়ে যারা দিল্লির রক্তচক্ষুকে ভয় পায় না। আমাদের প্রতিটি সদস্যই একজন স্বঘোষিত পাহারাদার।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-10 border border-white/5 bg-zinc-900 group hover:border-[#d90429] transition-all">
                <Shield className="w-12 h-12 text-[#d90429] mb-6" />
                <h4 className="font-black text-white text-2xl mb-4">স্বার্থের পাহারাদার</h4>
                <p className="text-slate-500 text-sm mono">Ensuring no foreign asset infiltrates the movement's decision making.</p>
              </div>
              <div className="p-10 border border-white/5 bg-zinc-900 group hover:border-[#006a4e] transition-all">
                <Target className="w-12 h-12 text-[#006a4e] mb-6" />
                <h4 className="font-black text-white text-2xl mb-4">নীতিগত যোদ্ধা</h4>
                <p className="text-slate-500 text-sm mono">Committed to the 2024 Manifesto over any personal political gain.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Visual Symbol of Sovereignty instead of photo */}
            <div className="aspect-square bg-zinc-900 border-4 border-[#d90429] p-20 flex items-center justify-center relative overflow-hidden group">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-[20px] border-dashed border-[#d90429]/5"
               />
               <div className="text-center z-10">
                  <Star className="w-40 h-40 text-[#d90429] mx-auto mb-10 fill-current animate-pulse" />
                  <h3 className="text-white text-5xl font-black tracking-tighter uppercase leading-none">SOVEREIGN <br/> COUNCIL</h3>
                  <div className="mt-8 flex justify-center gap-4">
                     <div className="w-4 h-4 bg-[#006a4e] rounded-full"></div>
                     <div className="w-4 h-4 bg-[#d90429] rounded-full"></div>
                     <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
               </div>
               
               {/* Abstract Background Tech Lines */}
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white"></div>
                 <div className="absolute left-0 top-1/2 w-full h-[2px] bg-white"></div>
               </div>
            </div>
          </div>
        </div>

        {/* Council Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-40">
           <div className="text-center space-y-6">
              <Users className="w-16 h-16 mx-auto text-[#d90429]" />
              <h3 className="text-3xl font-black uppercase">Collective Responsibility</h3>
              <p className="text-slate-500 font-['Hind_Siliguri']">প্রতিটি সিদ্ধান্তের দায়বদ্ধতা পুরো কাউন্সিলের। কেউ আইনের ঊর্ধ্বে নয়।</p>
           </div>
           <div className="text-center space-y-6">
              <Map className="w-16 h-16 mx-auto text-[#006a4e]" />
              <h3 className="text-3xl font-black uppercase">Geopolitical Awareness</h3>
              <p className="text-slate-500 font-['Hind_Siliguri']">আঞ্চলিক শক্তির ভারসাম্য এবং বাংলাদেশের স্বার্থ আদায়ে আমরা আপসহীন।</p>
           </div>
           <div className="text-center space-y-6">
              <Flame className="w-16 h-16 mx-auto text-white" />
              <h3 className="text-3xl font-black uppercase">Revolutionary Spirit</h3>
              <p className="text-slate-500 font-['Hind_Siliguri']">২০২৪-এর জুলাইয়ের চেতনা আমাদের প্রতিটি লড়াইয়ের জ্বালানি।</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
