
import React from 'react';
import { BookOpen, Calendar, Shield, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AIGeneratedImage } from '../components/AIGeneratedImage';

const News = () => {
  const archives = [
    {
      id: "1",
      title: "জুলাই বিপ্লবের রক্তাত্ব ইতিহাস",
      type: "Revolt Record",
      date: "August 05, 2024",
      summary: "কিভাবে ছাত্র-জনতা ফ্যাসিবাদ হটিয়ে দিল্লির দাসত্বের শিকল ভেঙেছিল তার পূর্ণাঙ্গ দলিল।",
      prompt: "A gritty, high-contrast documentary photograph of the 2024 July Revolution in Dhaka. Silhouetted protesters holding the national flag against a backdrop of thick smoke and dramatic backlighting. Intense emotion, historical film grain, struggle for sovereignty."
    },
    {
      id: "2",
      title: "সীমান্ত হত্যা: আন্তর্জাতিক বিচারের দাবি",
      type: "Sovereignty Report",
      date: "October 20, 2024",
      summary: "বিএসএফ কর্তৃক বাংলাদেশি নাগরিকদের হত্যার তথ্যপ্রমাণ ও আন্তর্জাতিক আদালতে মামলা করার রূপরেখা।",
      prompt: "A cinematic documentary still of a cold, foggy border fence at dawn. Sharp barbed wire in focus, a distant silhouetted guard tower looming over the landscape. Moody, low-exposure, high-contrast, representing the trauma and resistance at the border."
    },
    {
      id: "3",
      title: "ভারত-বাংলাদেশ অসম চুক্তি শ্বেতপত্র",
      type: "Policy Document",
      date: "October 12, 2024",
      summary: "বিগত সরকারের আমলে ভারতের সাথে করা সকল দেশবিরোধী চুক্তির বিস্তারিত বিশ্লেষণ।",
      prompt: "Macro photograph of a weathered, official document with 'UNFAIR TREATY' handwritten in red ink across it. Dramatic top-down lighting, deep shadows, dust particles in the air, investigative documentary aesthetic, revealing secret betrayals."
    }
  ];

  return (
    <div className="bg-[#030303] min-h-screen pt-40 pb-40">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="mono text-[#d90429] font-bold tracking-[0.4em] uppercase text-sm mb-6 block">Central Archive: Decrypted</span>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-10 uppercase italic tracking-tighter">মহাফেজখানা</h1>
          <p className="text-slate-500 text-3xl font-['Hind_Siliguri'] max-w-3xl mx-auto">
            চব্বিশের জুলাই থেকে আজ পর্যন্ত আমাদের প্রতিটি সংগ্রামের সত্য ইতিহাস এখানে সংরক্ষিত। 
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-24">
          {archives.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group flex flex-col lg:flex-row gap-16 items-center"
            >
              <div className="w-full lg:w-1/2 aspect-video overflow-hidden relative">
                <AIGeneratedImage 
                  prompt={item.prompt} 
                  className="w-full h-full"
                  aspectRatio="16:9"
                />
                <div className="absolute top-4 left-4 bg-[#d90429] text-white px-4 py-1 mono text-[10px] font-bold z-10 shadow-lg">
                  FILE_{item.id}_SVRGN_REDACTED
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                  <span className="text-[#d90429] bg-[#d90429]/10 px-3 py-1 border border-[#d90429]/20">{item.type}</span>
                  <span className="text-slate-600 flex items-center gap-2 font-mono"><Calendar className="w-4 h-4" /> {item.date}</span>
                </div>
                
                <h3 className="text-5xl font-black text-white leading-tight group-hover:text-[#d90429] transition-colors font-['Hind_Siliguri'] uppercase italic tracking-tighter">
                  {item.title}
                </h3>
                
                <p className="text-slate-400 text-2xl leading-relaxed font-['Hind_Siliguri']">
                  {item.summary}
                </p>
                
                <button className="flex items-center gap-4 text-white font-black uppercase text-sm tracking-widest border-b-2 border-[#d90429] pb-2 hover:gap-8 transition-all group/btn">
                  DECRYPT FULL DOSSIER <ArrowRight className="w-5 h-5 text-[#d90429] group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;
