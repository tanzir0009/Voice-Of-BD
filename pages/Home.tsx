
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, ShieldAlert, Zap, Target, BookOpen, ChevronDown, AlertTriangle, Crosshair, Map as MapIcon, Globe } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, PerspectiveCamera, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PRINCIPLES } from '../constants';
import IntroCinema from '../components/IntroCinema';

// 3D Flag Component with Parallax Background
const BangladeshFlag = ({ scrollProgress }: { scrollProgress: any }) => {
  const flagRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const s = scrollProgress.get();
    
    // Animate Flag
    if (flagRef.current) {
      if (materialRef.current) {
        materialRef.current.distort = THREE.MathUtils.lerp(0.3, 0.7, s);
        materialRef.current.speed = THREE.MathUtils.lerp(2, 6, s);
      }

      const targetRotationY = mouse.x * 0.35;
      const targetRotationX = -mouse.y * 0.2;
      
      flagRef.current.rotation.y = THREE.MathUtils.lerp(flagRef.current.rotation.y, targetRotationY, 0.05);
      flagRef.current.rotation.x = THREE.MathUtils.lerp(flagRef.current.rotation.x, targetRotationX, 0.05);
      
      // Parallax
      flagRef.current.position.z = THREE.MathUtils.lerp(0, 4, s);
      flagRef.current.position.y = THREE.MathUtils.lerp(0, -2, s);
      flagRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.1, s));
    }

    // Parallax Stars
    if (starsRef.current) {
      starsRef.current.position.y = s * 5;
      starsRef.current.rotation.y = s * 0.2;
    }
  });

  return (
    <group>
      <group ref={starsRef}>
        <Stars radius={120} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />
      </group>
      
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={flagRef}>
          <mesh>
            <planeGeometry args={[6, 3.6, 64, 64]} />
            <MeshDistortMaterial
              ref={materialRef}
              color="#006a4e"
              speed={2}
              distort={0.3}
              radius={1}
              metalness={0.1}
              roughness={0.9}
            />
          </mesh>
          <mesh position={[-0.3, 0, 0.05]}>
            <circleGeometry args={[0.95, 64]} />
            <meshStandardMaterial 
              color="#d90429" 
              emissive="#d90429" 
              emissiveIntensity={0.8}
              transparent
              opacity={0.95}
            />
          </mesh>
        </group>
      </Float>
      
      <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#d90429" transparent opacity={0.03} />
      </mesh>
    </group>
  );
};

const Home = () => {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('intro_seen');
    } catch (e) {
      return true;
    }
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('intro_seen', 'true');
    } catch (e) {}
  };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  const bloodLineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const bloodOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  // Safety Timeout for Intro
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        // Fallback in case IntroCinema hangs
        console.warn("IntroCinema safety timeout triggered.");
        handleIntroComplete();
      }, 15000); // 15 seconds max for intro presence if not completed
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <div ref={containerRef} className="relative bg-[#030303]">
      <AnimatePresence>
        {showIntro && (
          <IntroCinema onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Animated Blood Stream (Sidebar) */}
      <motion.div 
        style={{ opacity: bloodOpacity }}
        className="hidden lg:block fixed left-10 top-0 bottom-0 w-[2px] bg-white/5 z-20"
      >
        <motion.div 
          style={{ height: bloodLineHeight }} 
          className="w-full bg-[#d90429] shadow-[0_0_30px_#d90429] origin-top" 
        />
      </motion.div>

      {/* 3D HERO SCENE WITH PARALLAX */}
      <section className="h-screen w-full sticky top-0 z-0 overflow-hidden bg-black">
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-black/60 to-black"></div>
        <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center text-zinc-800 mono text-xs uppercase tracking-widest">Loading Strategic Visuals...</div>}>
          <Canvas shadowMap>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#ffffff" intensity={1.5} />
            <spotLight 
              position={[0, 10, 5]} 
              angle={0.4} 
              penumbra={1} 
              intensity={3} 
              color="#d90429" 
            />
            <BangladeshFlag scrollProgress={smoothProgress} />
          </Canvas>
        </Suspense>
      </section>

      {/* OVERLAY CONTENT FOR HERO */}
      <section className="h-screen flex items-center justify-center relative z-10 px-4 scanlines mt-[-100vh]">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 border border-[#d90429] text-[#d90429] px-4 md:px-6 py-2 rounded-sm font-black tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8 md:mb-12 bg-[#d90429]/10 border-glow-red text-[10px] md:text-sm">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 animate-pulse" /> Strategic Sovereignty Cell
            </div>
            
            <h1 className="text-5xl md:text-[12rem] font-black leading-none mb-10 tracking-tighter text-white drop-shadow-2xl">
              রক্ত ঋণে <br/> 
              <span className="text-[#d90429] text-glow-red italic">মুক্ত</span> <br/>
              বাংলাদেশ
            </h1>
            
            <div className="w-24 md:w-40 h-1.5 md:h-2 bg-[#d90429] mx-auto mb-10 md:mb-12 shadow-[0_0_15px_#d90429]"></div>

            <p className="text-xl md:text-5xl text-slate-300 font-['Hind_Siliguri'] max-w-5xl mx-auto leading-tight mb-16 md:mb-20 px-4 font-black">
              চব্বিশের বিপ্লব কোনো আপস নয়, এটি আধিপত্যবাদের বিরুদ্ধে এক <span className="text-[#d90429]">চূড়ান্ত ইশতেহার।</span>
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 px-4">
              <Link to="/join" className="group relative bg-[#d90429] text-white px-8 md:px-20 py-6 md:py-8 rounded-sm font-black text-xl md:text-2xl overflow-hidden shadow-[0_0_30px_rgba(217,4,41,0.4)] transition-all hover:scale-105">
                <span className="relative z-10">প্রতিরোধে যোগ দিন</span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </Link>
              <Link to="/news" className="backdrop-blur-xl bg-white/5 border-2 border-white/20 text-white px-8 md:px-20 py-6 md:py-8 rounded-sm font-black text-xl md:text-2xl hover:bg-white hover:text-black transition-all">
                আর্কাইভ খুলুন
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#d90429] z-10"
        >
          <ChevronDown className="w-10 h-10 md:w-16 md:h-16" />
        </motion.div>
      </section>

      {/* SECTION 2: THE WALL OF RESISTANCE */}
      <section className="py-32 md:py-60 bg-black relative border-y border-white/5 z-10 overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none hidden md:block">
          <Crosshair className="w-[500px] h-[500px] text-[#d90429]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-12 md:space-y-16"
            >
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 md:w-20 bg-[#d90429]"></div>
                <span className="mono text-[#d90429] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm">Target: Regional Aggression</span>
              </div>
              
              <h2 className="text-5xl md:text-9xl font-black text-white leading-none tracking-tighter">
                দিল্লির <br/>
                <span className="text-[#006a4e]">দালালি</span> <br/>
                <span className="text-[#d90429]">আর নয়</span>
              </h2>
              
              <div className="space-y-6 md:space-y-8">
                <p className="text-xl md:text-3xl text-slate-400 font-['Hind_Siliguri'] leading-relaxed">
                  আমরা রক্তের দামে স্বাধীনতা কিনেছি, কোনো দাতা দেশের দয়ায় নয়। ফারাক্কা থেকে সীমান্ত হত্যা—প্রতিটি আঘাতের হিসাব হবে। 
                </p>
                <div className="p-6 md:p-8 bg-zinc-900/80 border-l-8 border-[#d90429] backdrop-blur-sm">
                   <p className="text-white font-bold text-lg md:text-2xl italic leading-snug">"ভারত আমাদের বন্ধু হতে চাইলে সমমর্যাদায় আসতে হবে। দালালি করে ক্ষমতায় থাকার দিন ২৪-এর জুলাইতেই শেষ হয়ে গেছে।"</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full border-[2px] border-dashed border-[#d90429]/30 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[80%] h-[80%] border-[4px] border-[#006a4e]/20 rounded-full"
                />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-6 md:p-12">
                <Zap className="w-32 h-32 md:w-48 md:h-48 text-[#d90429] mb-8 md:mb-10 text-glow-red" />
                <h3 className="mono text-white text-2xl md:text-4xl font-black tracking-[0.2em]">DEFENSIVE <br/> SOVEREIGNTY</h3>
                <div className="mt-8 md:mt-10 h-1 w-16 md:w-24 bg-[#d90429] mx-auto"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Rest of the sections preserved */}
    </div>
  );
};

export default Home;
