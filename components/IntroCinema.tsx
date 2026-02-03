
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Zap, Play, SkipForward, AlertTriangle, Loader2, ExternalLink, Cpu, Database, Activity, Globe, ArrowRight } from 'lucide-react';

interface IntroCinemaProps {
  onComplete: () => void;
}

const IntroCinema: React.FC<IntroCinemaProps> = ({ onComplete }) => {
  const [status, setStatus] = useState<'checking' | 'key-needed' | 'generating' | 'playing' | 'error'>('checking');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('Initializing Sovereign Protocol...');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const loadingMessages = [
    "Accessing Central Archive...",
    "Verifying Credentials...",
    "Decrypting Archive Visuals...",
    "Rendering Sovereignty...",
  ];

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[messageIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lines = [
      "> AUTH_REQ: SECTOR_BANGLADESH",
      "> STATUS: SECURING_BORDER_DATA",
      "> ACTION: INITIALIZING_VEO_RENDER"
    ];
    let i = 0;
    const tInterval = setInterval(() => {
      if (i < lines.length) {
        setTerminalLines(prev => [...prev, lines[i]]);
        i++;
      }
    }, 800);
    return () => clearInterval(tInterval);
  }, []);

  const generateVideo = useCallback(async () => {
    setStatus('generating');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Cinematic documentary shot of a silhouetted Bangladeshi flag waving against a red sun, 1970s film grain, high contrast, dramatic shadows.',
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      let attempts = 0;
      while (!operation.done && attempts < 20) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
        attempts++;
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
        setStatus('playing');
      } else {
        onComplete();
      }
    } catch (error) {
      console.error("Video generation failed:", error);
      onComplete();
    }
  }, [onComplete]);

  const checkKey = useCallback(async () => {
    try {
      const aistudio = (window as any).aistudio;
      if (!aistudio) {
        setStatus('key-needed');
        return;
      }
      const hasKey = await aistudio.hasSelectedApiKey();
      if (!hasKey) setStatus('key-needed');
      else generateVideo();
    } catch (e) {
      setStatus('key-needed');
    }
  }, [generateVideo]);

  useEffect(() => {
    const timer = setTimeout(checkKey, 500);
    return () => clearTimeout(timer);
  }, [checkKey]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {status === 'checking' && (
          <motion.div key="checking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center p-6">
            <div className="w-12 h-12 border-2 border-[#d90429] border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-[0_0_15px_#d90429]"></div>
            <h2 className="text-xs mono text-zinc-500 uppercase tracking-[0.4em] animate-pulse">Establishing Connection...</h2>
          </motion.div>
        )}

        {status === 'key-needed' && (
          <motion.div 
            key="key-needed"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg mx-4 flex flex-col items-center bg-zinc-900/50 backdrop-blur-3xl border border-white/5 p-8 md:p-12 relative shadow-2xl"
          >
            <Shield className="w-12 h-12 text-[#d90429] mb-8" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 text-center italic uppercase tracking-tighter leading-none">
              Sovereignty <br/> Protocol
            </h2>
            <p className="text-slate-400 mb-10 text-center text-sm md:text-base font-['Hind_Siliguri'] leading-relaxed">
              Paid API keys are required for AI Video generation. You can enter the site directly without AI intro.
            </p>

            <div className="flex flex-col gap-4 w-full">
              <button 
                onClick={onComplete}
                className="group relative bg-white text-black py-5 font-black text-lg md:text-xl hover:bg-[#d90429] hover:text-white transition-all uppercase tracking-widest flex items-center justify-center gap-3"
              >
                Enter Site Now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleOpenKey}
                  className="bg-zinc-800 text-slate-300 py-3 text-xs mono font-bold hover:bg-zinc-700 transition-all border border-white/5"
                >
                  Use Paid Key (For AI Video)
                </button>
                <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[10px] text-zinc-600 mono text-center uppercase tracking-widest hover:text-[#d90429] pt-2"
                >
                  Billing Docs <ExternalLink className="w-3 h-3 inline" />
                </a>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#d90429]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-[#d90429]"></div>
          </motion.div>
        )}

        {status === 'generating' && (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center px-4">
            <div className="w-16 h-16 border-b-2 border-[#d90429] rounded-full animate-spin mx-auto mb-10"></div>
            <h2 className="text-xl mono text-white font-black tracking-[0.3em] uppercase mb-4">Generating Visuals</h2>
            <p className="text-[#d90429] mono text-xs animate-pulse tracking-widest">{loadingMessage}</p>
            <button onClick={onComplete} className="mt-12 text-slate-500 hover:text-white mono text-[10px] uppercase tracking-widest border border-white/5 px-4 py-2">
              Skip Intro
            </button>
          </motion.div>
        )}

        {status === 'playing' && videoUrl && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full bg-black">
            <video src={videoUrl} autoPlay playsInline className="w-full h-full object-cover grayscale brightness-40 contrast-150" onEnded={onComplete} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-10">
               <div>
                  <h3 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">রক্ত ঋণ ২৪</h3>
                  <p className="text-slate-400 font-['Hind_Siliguri'] text-lg md:text-2xl max-w-xl">সার্বভৌমত্বের দলিলে আপনার নাম লিখুন।</p>
               </div>
               <button onClick={onComplete} className="bg-white text-black px-12 py-6 font-black uppercase text-sm tracking-widest hover:bg-[#d90429] hover:text-white transition-all">
                 Enter Headquarters
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  async function handleOpenKey() {
    try {
      const aistudio = (window as any).aistudio;
      if (aistudio) await aistudio.openSelectKey();
      generateVideo();
    } catch (e) {
      onComplete();
    }
  }
};

export default IntroCinema;
