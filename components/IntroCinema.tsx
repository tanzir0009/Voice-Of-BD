
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Component for a cinematic intro sequence to establish the site's dark, revolutionary aesthetic.
interface IntroCinemaProps {
  onComplete: () => void;
}

const IntroCinema: React.FC<IntroCinemaProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500); // Duration of the intro sequence
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6 overflow-hidden"
    >
      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Animated logo/mark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-16"
        >
          <div className="w-20 h-20 border-2 border-[#d90429] flex items-center justify-center mx-auto mb-8 relative">
            <span className="text-[#d90429] font-black text-4xl">V</span>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-3 border border-[#d90429]/50"
            />
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#d90429] to-transparent max-w-xs mx-auto"
          />
        </motion.div>

        {/* Cinematic title and loading state */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-none font-['Hind_Siliguri']">
            রক্তের ঋণে <br />
            <span className="text-[#d90429] drop-shadow-[0_0_15px_#d90429]">বাংলাদেশ</span>
          </h2>
          <div className="flex justify-center gap-4">
             <motion.div 
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
               className="w-2 h-2 bg-[#d90429] rounded-full"
             />
             <motion.div 
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
               className="w-2 h-2 bg-white rounded-full"
             />
             <motion.div 
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
               className="w-2 h-2 bg-[#006a4e] rounded-full"
             />
          </div>
          <p className="text-zinc-500 font-mono text-[10px] tracking-[0.5em] uppercase">
            Initializing Strategic Sovereignty Cell
          </p>
        </motion.div>
      </div>

      {/* Background atmosphere elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] z-0"></div>
        <div className="scanlines opacity-20"></div>
      </div>
    </motion.div>
  );
};

export default IntroCinema;
