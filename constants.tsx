
import React from 'react';
import { Shield, Flame, Map, Droplets, Target, BookOpen, AlertOctagon, Anchor, Gavel, ShieldCheck } from 'lucide-react';

export const COLORS = {
  green: '#006a4e',
  red: '#d90429',
  black: '#030303',
  slate: '#111111'
};

export const LEADER_INFO = {
  name: "জাতীয় নেতৃত্বের কাউন্সিল",
  role: "সার্বভৌমত্বের অতন্দ্র প্রহরী",
  bio: "ব্যক্তিপূজা নয়, আদর্শই আমাদের চালিকাশক্তি। ২৪-এর বিপ্লব কোনো ব্যক্তির দান নয়, বরং ছাত্র-জনতার রক্তে কেনা এক স্বাধীন ইশতেহার। আমরা সেই রক্তের মর্যাদা রক্ষায় প্রতিশ্রুতিবদ্ধ।"
};

export const DISTRICTS = [
  "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh",
  "Gazipur", "Narayanganj", "Cumilla", "Bogura", "Noakhali", "Faridpur", "Jashore", "Kushtia",
  "Tangail", "Dinajpur", "Pabna", "Jamalpur", "Brahmanbaria"
];

export const PRINCIPLES = [
  {
    title: "রক্তঋণ ২৪: দালালি মুক্ত দেশ",
    description: "জুলাই-আগস্টের শহীদের রক্ত আমাদের শিখিয়েছে—দিল্লির দালালি করলে পতন অনিবার্য। আমরা সেই রক্তের প্রতিটি ফোঁটার হিসাব নেব।",
    icon: <Droplets className="w-10 h-10 text-[#d90429]" />
  },
  {
    title: "সীমান্তে সশস্ত্র জবাব",
    description: "আর কোনো ফেলানী নয়। বিএসএফ-এর প্রতিটি বুলেটের বিপরীতে সমান জবাব নিশ্চিত করা হবে। সীমান্ত মানেই সার্বভৌমত্ব।",
    icon: <Target className="w-10 h-10 text-white" />
  },
  {
    title: "ভারতের আগ্রাসন প্রতিরোধ",
    description: "নদীর পানির ন্যায্য হিস্যা থেকে শুরু করে অভ্যন্তরীণ রাজনীতিতে ভারতের নগ্ন হস্তক্ষেপ—সব পথ চিরতরে বন্ধ করা হবে।",
    icon: <Shield className="w-10 h-10 text-[#006a4e]" />
  },
  {
    title: "বিপ্লবী মহাফেজখানা",
    description: "বিপ্লভে প্রতিটি দলিল সংরক্ষিত থাকবে। ইতিহাস বিকৃতি রুখতে আমরাই হব সত্যের পাহারাদার।",
    icon: <BookOpen className="w-10 h-10 text-white" />
  }
];

export const MANIFESTO_POINTS = [
  {
    title: "অসম চুক্তি বাতিল",
    description: "ভারতের সাথে করা সকল গোপন এবং দেশবিরোধী চুক্তি (ট্রানজিট, করিডোর) জনসমক্ষে এনে বাতিল করা হবে। সার্বভৌমত্বের বিনিময়ে কোনো বন্ধুত্ব নয়।",
    icon: <AlertOctagon className="w-6 h-6" />
  },
  {
    title: "পানির ন্যায্য অধিকার",
    description: "আন্তর্জাতিক আইন অনুযায়ী অভিন্ন নদীগুলোর পানির ন্যায্য হিস্যা আদায়ে ভারতকে বাধ্য করা হবে। প্রয়োজনে আন্তর্জাতিক আদালত ও পানি অবরোধের ডাক দেওয়া হবে।",
    icon: <Anchor className="w-6 h-6" />
  },
  {
    title: "রক্তঋণের বিচার",
    description: "২০২৪ সালের জুলাই হত্যাকাণ্ডের সাথে জড়িত প্রতিটি মাস্টারমাইন্ড এবং তাদের বিদেশি মদদদাতাদের বিচারের আওতায় আনা হবে। শহীদের রক্তের ঋণ কোনো ক্ষমা চেনে না।",
    icon: <Gavel className="w-6 h-6" />
  },
  {
    title: "সার্বভৌম প্রতিরক্ষা",
    description: "জাতীয় গোয়েন্দা সংস্থা এবং সেনাবাহিনীকে আধুনিকায়ন করে বিদেশি গোয়েন্দা সংস্থাগুলোর নগ্ন হস্তক্ষেপ সমূলে উৎপাটন করা হবে।",
    icon: <ShieldCheck className="w-6 h-6" />
  }
];
