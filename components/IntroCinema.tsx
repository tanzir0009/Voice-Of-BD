
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Zap, Play, SkipForward, AlertTriangle, Loader2, ExternalLink, Cpu, Database, Activity } from 'lucide-react';

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
    "Verifying Revolutionary Credentials...",
    "Decrypting Blood Debt 24 Visuals...",
    "Synthesizing Documentary Stills...",
    "Rendering National Sovereignty...",
    "Sovereignty Secured. Finalizing Stream...",
  ];

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[messageIndex]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Simulation of a terminal log
  useEffect(() => {
    const lines = [
      "> AUTH_REQ: SECTOR_BANGLADESH",
      "> STATUS: SECURING_BORDER_DATA",
      "> ENCRYPTION: 1024_RSA_SVRGN",
      "> WARNING: EXTERNAL_INTERFERENCE_DETECTED",
      "> ACTION: INITIALIZING_VEO_RENDER"
    ];
    let i = 0;
    const tInterval = setInterval(() => {
      if (i < lines.length) {
        setTerminalLines(prev => [...prev, lines[i]]);
        i++;
      }
    }, 1500);
    return () => clearInterval(tInterval);
  }, []);

  const generateVideo = useCallback(async () => {
    setStatus('generating');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'A cinematic, high-contrast documentary video of a waving Bangladesh flag in slow motion, silhouette of a protester holding the flag against a dark dramatic sky with red and green smoke, grainy film texture, 1970s documentary style, serious and patriotic tone.',
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setStatus('playing');
      }
    } catch (error) {
      console.error("Video generation failed:", error);
      setStatus('error');
      setTimeout(onComplete, 3000);
    }
  }, [onComplete]);

  const checkKeyAndGenerate = useCallback(async () => {
    try {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setStatus('key-needed');
      } else {
        generateVideo();
      }
    } catch (e) {
      setStatus('key-needed');
    }
  }, [generateVideo]);

  const handleOpenKey = async () => {
    try {
      await (window as any).aistudio.openSelectKey();
      generateVideo();
    } catch (e) {
      // In case of error, just proceed to generation
      generateVideo();
    }
  };

  useEffect(() => {
    checkKeyAndGenerate();
  }, [checkKeyAndGenerate]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {status === 'key-needed' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl mx-4 flex flex-col items-center"
          >
            {/* Header / Brand */}
            <div className="flex items-center gap-4 mb-16">
              <div className="h-[2px] w-12 bg-[#d90429]/40 hidden md:block" />
              <div className="flex items-center gap-3">
                <div className="p-2 border border-[#d90429] bg-black">
                  <Shield className="w-8 h-8 text-[#d90429]" />
                </div>
                <span className="mono text-white text-lg font-black tracking-[0.3em] uppercase">Sovereignty Cell</span>
              </div>
              <div className="h-[2px] w-12 bg-[#d90429]/40 hidden md:block" />
            </div>

            <div className="w-full border border-white/5 bg-zinc-900/40 backdrop-blur-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#d90429]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#d90429]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#d90429]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#d90429]"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-12 text-center">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 italic uppercase tracking-tighter leading-tight">
                    AUTHENTICATION <br/> REQUIRED
                  </h2>
                  <p className="text-slate-400 mb-10 text-lg md:text-xl font-['Hind_Siliguri'] leading-relaxed max-w-lg mx-auto">
                    To decrypt the visual archives of the <span className="text-[#d90429] font-bold">2024 Resistance</span>, a paid project key is required for secure generation.
                  </p>
                </div>

                <div className="lg:col-span-12 flex flex-col gap-6 w-full max-w-md mx-auto">
                  <button 
                    onClick={handleOpenKey}
                    className="group relative bg-[#d90429] text-white py-6 rounded-sm font-black text-2xl hover:bg-white hover:text-black transition-all uppercase tracking-widest shadow-[0_20px_50px_rgba(217,4,41,0.25)] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <Lock className="w-6 h-6" /> INITIALIZE KEY
                    </span>
                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <a 
                      href="https://ai.google.dev/gemini-api/docs/billing" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-zinc-800/50 hover:bg-zinc-700 text-slate-400 mono text-[10px] py-3 uppercase tracking-widest transition-all"
                    >
                      BILLING <ExternalLink className="w-3 h-3" />
                    </a>
                    <button 
                      onClick={onComplete}
                      className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-white text-slate-500 hover:text-white mono text-[10px] py-3 uppercase tracking-widest transition-all"
                    >
                      BYPASS INTRO
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Monitor Decorators */}
              <div className="mt-12 flex justify-between items-end border-t border-white/5 pt-8">
                <div className="mono text-[9px] text-zinc-600 space-y-1">
                  {terminalLines.map((line, i) => (
                    <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-500">{line}</div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <Cpu className="w-4 h-4 text-[#d90429]/40" />
                    <div className="h-10 w-1 bg-zinc-800 overflow-hidden">
                      <motion.div className="w-full bg-[#d90429]" animate={{ height: ["0%", "80%", "40%"] }} transition={{ repeat: Infinity, duration: 2 }} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Database className="w-4 h-4 text-[#d90429]/40" />
                    <div className="h-10 w-1 bg-zinc-800 overflow-hidden">
                      <motion.div className="w-full bg-[#006a4e]" animate={{ height: ["20%", "90%", "60%"] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none"></div>
            </div>
            
            <p className="mt-8 text-zinc-600 mono text-[10px] uppercase tracking-[0.4em] opacity-40">Security Protocol Alpha-24-05</p>
          </motion.div>
        )}

        {status === 'generating' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center px-4"
          >
            <div className="relative w-40 h-40 mx-auto mb-16">
               <div className="absolute inset-0 border-[1px] border-[#d90429]/20 rounded-full scale-125"></div>
               <motion.div 
                 className="absolute inset-0 border-t-2 border-[#d90429] rounded-full"
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <Zap className="w-16 h-16 text-[#d90429] animate-pulse drop-shadow-[0_0_15px_rgba(217,4,41,0.5)]" />
               </div>
            </div>
            <h2 className="text-2xl md:text-3xl mono text-white font-black tracking-[0.4em] uppercase mb-4">DECRYPTING ARCHIVE</h2>
            <div className="max-w-xs mx-auto h-1 bg-zinc-900 mb-8 overflow-hidden">
              <motion.div 
                className="h-full bg-[#d90429]" 
                animate={{ x: ["-100%", "100%"] }} 
                transition={{ repeat: Infinity, duration: 2 }} 
              />
            </div>
            <p className="text-[#d90429] mono text-xs md:text-sm animate-pulse tracking-widest">{loadingMessage}</p>
            
            <div className="mt-24 grid grid-cols-3 gap-8 opacity-20 mono text-[8px] uppercase tracking-widest text-zinc-500">
              <div className="flex flex-col gap-2"><Activity className="w-4 h-4 mx-auto" /> Uplink: Stable</div>
              <div className="flex flex-col gap-2"><Cpu className="w-4 h-4 mx-auto" /> Processing: High</div>
              <div className="flex flex-col gap-2"><Database className="w-4 h-4 mx-auto" /> Cache: Initialized</div>
            </div>
          </motion.div>
        )}

        {status === 'playing' && videoUrl && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative w-full h-full bg-black"
          >
            <video 
              src={videoUrl} 
              autoPlay 
              className="w-full h-full object-cover grayscale brightness-40 contrast-150"
              onEnded={onComplete}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
            
            <div className="absolute top-10 left-10 flex items-center gap-4">
              <div className="w-2 h-2 bg-[#d90429] rounded-full animate-pulse shadow-[0_0_15px_#d90429]"></div>
              <span className="mono text-white text-[10px] font-bold tracking-[0.5em] uppercase">SECURE_FEED // ARCHIVE_24</span>
            </div>
            
            <div className="absolute bottom-12 right-12 z-20">
              <button 
                onClick={onComplete}
                className="group bg-white text-black px-12 py-6 mono text-sm hover:bg-[#d90429] hover:text-white transition-all flex items-center gap-4 font-black uppercase tracking-widest shadow-2xl"
              >
                ACCESS MAIN HQ <SkipForward className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            
            <div className="absolute bottom-12 left-12 max-w-2xl z-10 pointer-events-none">
               <motion.h3 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-6 drop-shadow-2xl leading-none"
               >
                 রক্ত ঋণ ২৪: <br/> <span className="text-[#d90429]">ইশতেহার</span>
               </motion.h3>
               <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="text-slate-400 font-['Hind_Siliguri'] text-xl md:text-3xl leading-relaxed drop-shadow-2xl max-w-xl"
               >
                 সার্বভৌমত্বের প্রতিটি ফোঁটা রক্তের হিসেব এই মহাফেজখানায় সংরক্ষিত। দালালি মুক্ত আগামীর শপথ।
               </motion.p>
            </div>

            {/* Cinematic Scanlines */}
            <div className="absolute inset-0 scanlines opacity-[0.07] pointer-events-none"></div>
          </motion.div>
        )}

        {(status === 'error' || status === 'checking') && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center px-4"
          >
            <div className="w-16 h-16 border-t-2 border-[#d90429] rounded-full animate-spin mx-auto mb-8"></div>
            <h2 className="text-xl mono text-zinc-500 uppercase tracking-widest">Establishing Secure Uplink...</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroCinema;
