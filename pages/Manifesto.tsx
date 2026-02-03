
import React from 'react';
import { FileText, Download, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MANIFESTO_POINTS } from '../constants';
import { AIGeneratedImage } from '../components/AIGeneratedImage';

const Manifesto = () => {
  // Enhanced visuals reflecting struggle, sovereignty, and the anti-aggression stance
  const manifestoVisuals = [
    "A symbolic photograph of a torn, official contract on a dark wooden table, lit by a single sharp red spotlight, representing the rejection of secret foreign treaties, cinematic film grain.",
    "A wide-angle cinematic documentary shot of a cracked, dry riverbed under a stormy sky, a single Bangladeshi flag planted in the parched earth, representating the fight for water rights.",
    "A close-up gritty documentary still of a hand holding a fistful of red-stained soil, high contrast, dramatic shadows, evoking the 'Blood Debt of 2024' and the sacrifice for the land.",
    "A low-angle cinematic shot of a silhouetted watchtower at the border, barbed wire in focus, a dramatic sunrise or sunset with deep shadows, representing sovereign defense and resistance."
  ];

  return (
    <div className="bg-[#030303] min-h-screen pt-40 pb-40">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 border border-white/5 p-16 md:p-24 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <FileText className="w-80 h-80 text-white" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-16">
            <div className="max-w-3xl">
              <span className="mono text-[#d90429] font-bold tracking-[0.4em] uppercase text-sm mb-6 block">Document Version: 24.SVRGN.01</span>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-10 leading-none italic">আমাদের <br/><span className="text-[#d90429]">ইশতেহার</span></h1>
              <p className="text-slate-400 text-2xl font-['Hind_Siliguri'] leading-relaxed">
                এটি কোনো সাধারণ রাজনৈতিক ঘোষণা নয়, বরং চব্বিশের শহীদের রক্তের বিনিময়ে কেনা এক <span className="text-white">সার্বভৌম অঙ্গীকারনামা</span>। আগ্রাসন রুখে দিয়ে দেশ গড়ার ব্লু-প্রিন্ট।
              </p>
            </div>
            <button className="bg-white text-black px-12 py-6 rounded-sm font-black text-xl flex items-center hover:bg-[#d90429] hover:text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <Download className="mr-4 w-6 h-6" /> ইশতেহার ডাউনলোড করুন
            </button>
          </div>
        </motion.div>
      </section>

      {/* Detailed Policies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-48">
          {MANIFESTO_POINTS.map((point, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2 space-y-12">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-[#d90429]/10 border border-[#d90429]/30 flex items-center justify-center text-[#d90429] shadow-[0_0_30px_rgba(217,4,41,0.1)]">
                    {point.icon}
                  </div>
                  <div>
                    <span className="mono text-[#d90429] text-sm font-bold tracking-widest block mb-2">POLICY_CELL_{idx + 1}</span>
                    <h2 className="text-5xl font-black text-white tracking-tighter uppercase font-['Hind_Siliguri']">{point.title}</h2>
                  </div>
                </div>
                
                <p className="text-slate-400 text-3xl leading-relaxed font-['Hind_Siliguri']">
                  {point.description}
                </p>
                
                <div className="space-y-6 pt-6">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex items-start bg-zinc-900/40 p-8 border border-white/5 hover:border-[#d90429]/30 transition-all">
                      <CheckCircle className="w-8 h-8 text-[#006a4e] mr-6 flex-shrink-0 mt-1" />
                      <div>
                        <span className="block text-white font-bold text-2xl mb-2 font-['Hind_Siliguri']">কৌশলগত পদক্ষেপ {i+1}</span>
                        <span className="text-slate-500 text-xl font-['Hind_Siliguri']">জাতীয় নিরাপত্তার স্বার্থে আমাদের গোপন ও প্রকাশ্য প্রতিরক্ষা ব্যবস্থার অবিচ্ছেদ্য অংশ।</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#d90429]/20 to-[#006a4e]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative border border-white/10 p-6 bg-black overflow-hidden shadow-2xl">
                    <AIGeneratedImage 
                      prompt={manifestoVisuals[idx] || "A dramatic cinematic documentary photograph of struggle and sovereignty"} 
                      className="w-full aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-1000"
                      aspectRatio="4:3"
                    />
                    <div className="absolute bottom-10 right-10 flex gap-4">
                       <div className="bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 text-[10px] mono text-[#d90429] tracking-tighter">
                          INTEL_STILL_ARCHIVE_{idx}
                       </div>
                    </div>
                  </div>
                  <div className="absolute -top-12 -left-12 w-32 h-32 border-l-2 border-t-2 border-[#d90429] opacity-30 pointer-events-none"></div>
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 border-r-2 border-b-2 border-[#006a4e] opacity-30 pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* KPI Section with Dark Aesthetic */}
      <section className="mt-60 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 border border-white/10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="p-16 border-b border-white/5 bg-black flex flex-col md:flex-row justify-between items-center gap-10">
            <div>
              <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Sovereignty Scoreboard</h2>
              <p className="text-slate-500 text-xl mt-4 mono uppercase tracking-widest">Measuring the success of the 2024 Manifesto</p>
            </div>
            <div className="flex items-center gap-4 bg-[#d90429]/10 px-6 py-3 border border-[#d90429]/30">
               <div className="w-3 h-3 bg-[#d90429] rounded-full animate-pulse"></div>
               <span className="mono text-[#d90429] text-sm font-bold">LIVE METRICS ENABLED</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { label: "Treaties Under Review", value: "100%", color: "#d90429" },
              { label: "River Basins Secured", value: "54", color: "#006a4e" },
              { label: "Border Violations Neutralized", value: "98%", color: "#d90429" },
              { label: "Self-Reliance Index", value: "HIGH", color: "#006a4e" }
            ].map((kpi, i) => (
              <div key={i} className="p-16 text-center group hover:bg-white/5 transition-colors">
                <span className="block text-6xl font-black mb-4 tracking-tighter" style={{ color: kpi.color }}>{kpi.value}</span>
                <span className="text-sm font-black uppercase tracking-[0.3em] text-slate-500">{kpi.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manifesto;
