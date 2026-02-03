
import React from 'react';
import { ShieldCheck, Flag, Users, Globe2, ShieldAlert } from 'lucide-react';

const About = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <section className="bg-black py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-bd-red opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic">Our Sovereign Fight</h1>
          <p className="text-bd-green text-2xl font-bold uppercase tracking-widest">আমরাই একমাত্র দল যারা দিল্লির আধিপত্য মানি না।</p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-12 text-slate-900 font-['Hind_Siliguri'] underline decoration-bd-red decoration-8 underline-offset-12">কেন ভয়েস অফ বাংলাদেশ?</h2>
          <div className="prose prose-xl mx-auto text-slate-700 space-y-8 leading-relaxed">
            <p>
              ১৯৭১ সালে আমরা রক্ত দিয়ে স্বাধীনতা কিনেছিলাম, কিন্তু দীর্ঘ সময় ধরে আমরা আমাদের প্রতিবেশী দেশ ভারতের একটি ছায়া-রাষ্ট্র হিসেবে শাসিত হয়েছি। আমাদের রাজনীতি, আমাদের অর্থনীতি এবং আমাদের সংস্কৃতিতে ভারতের নগ্ন হস্তক্ষেপ আমাদের জাতীয় অস্তিত্বকে বিপন্ন করে তুলেছিল।
            </p>
            <p className="bg-slate-50 p-10 rounded-3xl border-2 border-bd-red font-bold text-slate-900">
              "২০২৪ সালের চব্বিশের বিপ্লব আমাদের শিখিয়েছে কীভাবে দালালি ছুড়ে ফেলে মাথা উঁচু করে দাঁড়াতে হয়। ভয়েস অফ বাংলাদেশ সেই বিপ্লবেরই একটি রাজনৈতিক রূপান্তর।"
            </p>
            <p>
              আমরা চাই একটি স্বনির্ভর বাংলাদেশ যেখানে কোনো বিদেশি রাষ্ট্র ঠিক করে দেবে না আমাদের সরকার কে হবে। আমরা চাই একটি শক্তিশালী সীমান্ত যেখানে ফেলানী হয়ে আর কাউকে ঝুলে থাকতে হবে না।
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Vision Grid */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 bg-white/5 rounded-3xl border border-white/10">
              <ShieldAlert className="w-12 h-12 text-bd-red mb-6" />
              <h3 className="text-2xl font-black mb-4">আধিপত্যবাদ প্রতিরোধ</h3>
              <p className="text-slate-400">প্রতিবেশী দেশের অসম প্রভাব থেকে আমাদের প্রশাসন ও রাজনীতিকে মুক্ত করা হবে।</p>
            </div>
            <div className="p-10 bg-white/5 rounded-3xl border border-white/10">
              <Flag className="w-12 h-12 text-bd-green mb-6" />
              <h3 className="text-2xl font-black mb-4">জাতীয় স্বার্থ সর্বাগ্রে</h3>
              <p className="text-slate-400">ব্যক্তিগত বা গোষ্ঠীগত স্বার্থ নয়, প্রতিটি রাষ্ট্রীয় সিদ্ধান্ত হবে 'বাংলাদেশ ফার্স্ট' নীতিতে।</p>
            </div>
            <div className="p-10 bg-white/5 rounded-3xl border border-white/10">
              <Globe2 className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-2xl font-black mb-4">বিশ্ববাজারে বিকল্প তৈরি</h3>
              <p className="text-slate-400">ভারতের ওপর একক নির্ভরতা কমিয়ে মধ্যপ্রাচ্য, ইউরোপ ও দক্ষিণ-পূর্ব এশিয়ার সাথে বিকল্প বাজার তৈরি করা।</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
