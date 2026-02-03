
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  prompt: string;
  className?: string;
  aspectRatio?: "1:1" | "4:3" | "16:9" | "9:16" | "3:4";
}

export const AIGeneratedImage: React.FC<Props> = ({ prompt, className, aspectRatio = "16:9" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const generate = async () => {
      if (!process.env.API_KEY) {
        setLoading(false);
        setError(true);
        return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Refined prefix to enforce the gritty, high-contrast, struggle-themed documentary aesthetic
        const grittyPrompt = `A gritty, high-contrast historical documentary still. Cinematic lighting, dramatic shadows, heavy film grain, 1970s investigative documentary style, authentic and serious tone, depicting themes of national struggle and sovereign resistance: ${prompt}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: grittyPrompt }],
          },
          config: {
            imageConfig: { aspectRatio }
          }
        });

        if (!isMounted) return;

        const candidates = response.candidates;
        if (candidates && candidates.length > 0) {
          for (const part of candidates[0].content.parts) {
            if (part.inlineData) {
              setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
              setLoading(false);
              return;
            }
          }
        }
        setError(true);
      } catch (e) {
        console.error("Image generation failed:", e);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    generate();
    return () => { isMounted = false; };
  }, [prompt, aspectRatio]);

  if (loading) {
    return (
      <div className={`bg-zinc-900 animate-pulse flex items-center justify-center border border-white/5 relative ${className}`}>
        <div className="text-center relative z-10">
          <div className="w-8 h-8 border-2 border-[#d90429] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <span className="mono text-[10px] text-zinc-500 tracking-widest uppercase">Decrypting Still...</span>
        </div>
        <div className="absolute inset-0 scanlines opacity-10 pointer-events-none"></div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-zinc-900 flex items-center justify-center border border-white/10 ${className}`}>
        <span className="mono text-[10px] text-zinc-700 tracking-widest uppercase">[DATA CORRUPTED / UNAVAILABLE]</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden group border border-white/5 bg-black ${className}`}>
      {/* The AI Image with base styling */}
      <img 
        src={imageUrl} 
        alt={prompt} 
        className="w-full h-full object-cover grayscale contrast-150 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-in-out" 
      />
      
      {/* Local Grain/Noise Overlay for localized "grittiness" */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay grain-overlay"></div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
      
      {/* Dramatic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-60"></div>
      
      {/* Corner Brackets for 'Archival' look */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-white/20 group-hover:border-[#d90429]/40 transition-colors"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-white/20 group-hover:border-[#d90429]/40 transition-colors"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-white/20 group-hover:border-[#d90429]/40 transition-colors"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-white/20 group-hover:border-[#d90429]/40 transition-colors"></div>
    </div>
  );
};
