import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Shield, X, Radio, Terminal, Volume2 } from 'lucide-react';

const SovereigntyStrategist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const decodeBase64 = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length;
    const buffer = ctx.createBuffer(1, frameCount, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  };

  const startSession = async () => {
    setStatus('connecting');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setStatus('listening');
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
              sessionPromise.then(session => {
                session.sendRealtimeInput({ 
                  media: { data: base64, mimeType: 'audio/pcm;rate=16000' } 
                });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              setStatus('speaking');
              const base64 = message.serverContent.modelTurn.parts[0].inlineData.data;
              const bytes = decodeBase64(base64);
              const buffer = await decodeAudioData(bytes, outputAudioContextRef.current!);
              
              const source = outputAudioContextRef.current!.createBufferSource();
              source.buffer = buffer;
              source.connect(outputAudioContextRef.current!.destination);
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current!.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              
              sourcesRef.current.add(source);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              };
            }

            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => [...prev.slice(-4), `STRATEGIST: ${message.serverContent?.outputTranscription?.text}`]);
            }
            if (message.serverContent?.inputTranscription) {
              setTranscription(prev => [...prev.slice(-4), `INTEL: ${message.serverContent?.inputTranscription?.text}`]);
            }
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: 'You are the Strategic Sovereignty Strategist for the Voice of Bangladesh movement. Your mission is to provide tactical analysis on national sovereignty, regional geopolitics (especially resisting hegemony), and the 2024 Revolutions goals. Be serious, authoritative, patriotic, and always prioritize Bangladeshi interests. Use high-end strategic vocabulary.',
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } }
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Live session failed:", err);
      setStatus('idle');
    }
  };

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    if (audioContextRef.current) audioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setStatus('idle');
  };

  return (
    <>
      <div className="fixed bottom-10 left-10 z-[60]">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#d90429] p-6 rounded-full shadow-[0_0_30px_rgba(217,4,41,0.5)] hover:scale-110 transition-transform group relative"
        >
          <Radio className="w-8 h-8 text-white animate-pulse" />
          <span className="absolute -top-12 left-0 bg-black text-[#d90429] mono text-[10px] font-black px-3 py-1 border border-[#d90429] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            ESTABLISH COMMS
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-y-0 left-0 w-full md:w-[450px] bg-black/95 backdrop-blur-2xl border-r border-[#d90429]/30 z-[70] p-10 flex flex-col"
          >
            <div className="flex justify-between items-start mb-16">
              <div className="flex items-center gap-4">
                <Shield className="w-10 h-10 text-[#d90429]" />
                <div>
                  <h3 className="text-white text-2xl font-black italic tracking-tighter uppercase">Sovereignty Strategist</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#006a4e] animate-pulse' : 'bg-zinc-700'}`}></div>
                    <span className="mono text-[10px] text-zinc-500 uppercase">{status}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => { stopSession(); setIsOpen(false); }} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-grow space-y-8 overflow-y-auto mb-12 scrollbar-hide">
               {transcription.length === 0 ? (
                 <div className="text-center py-20 opacity-20">
                   <Terminal className="w-16 h-16 mx-auto mb-4" />
                   <p className="mono text-xs uppercase tracking-widest">Awaiting Strategic Directives...</p>
                 </div>
               ) : (
                 transcription.map((line, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, y: 10 }} 
                     animate={{ opacity: 1, y: 0 }}
                     className={`p-6 border-l-2 font-mono text-xs leading-relaxed ${line.startsWith('STRATEGIST') ? 'border-[#d90429] bg-[#d90429]/5 text-white' : 'border-[#006a4e] bg-[#006a4e]/5 text-zinc-400'}`}
                   >
                     {line}
                   </motion.div>
                 ))
               )}
            </div>

            <div className="space-y-6">
              <div className="h-1 bg-zinc-900 overflow-hidden">
                <motion.div 
                  className="h-full bg-[#d90429]" 
                  animate={isActive ? { x: ["-100%", "100%"] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>

              <div className="flex justify-center">
                {!isActive ? (
                  <button 
                    onClick={startSession}
                    className="flex items-center gap-4 bg-[#d90429] text-white px-10 py-5 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all"
                  >
                    <Mic className="w-5 h-5" /> INITIALIZE SESSION
                  </button>
                ) : (
                  <button 
                    onClick={stopSession}
                    className="flex items-center gap-4 border-2 border-[#d90429] text-[#d90429] px-10 py-5 font-black uppercase tracking-widest text-sm hover:bg-[#d90429] hover:text-white transition-all"
                  >
                    <MicOff className="w-5 h-5" /> TERMINATE SESSION
                  </button>
                )}
              </div>
              
              <p className="text-[10px] text-zinc-600 mono text-center uppercase tracking-tighter">
                NOTICE: Session is recorded in the Central Archive. Encrypted end-to-end.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SovereigntyStrategist;