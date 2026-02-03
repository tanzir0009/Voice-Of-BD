
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
    if (flagRef.current) {
      if (materialRef.current) {
        materialRef.current.distort = THREE.MathUtils.lerp(0.3, 0.7, s);
        materialRef.current.speed = THREE.MathUtils.lerp(2, 6, s);
      }
      flagRef.current.rotation.y = THREE.MathUtils.lerp(flagRef.current.rotation.y, mouse.x * 0.35, 0.05);
      flagRef.current.rotation.x = THREE.MathUtils.lerp(flagRef.current.rotation.x, -mouse.y * 0.2, 0.05);
      flagRef.current.position.z = THREE.MathUtils.lerp(0, 4, s);
    }
    if (starsRef.current) {
      starsRef.current.position.y = s * 5;
    }
  });

  return (
    <group>
      <group ref={starsRef}>
        <Stars radius={120} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
      </group>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={flagRef}>
          <mesh>
            <planeGeometry args={[6, 3.6, 64, 64]} />
            <MeshDistortMaterial ref={materialRef} color="#006a4e" speed={2} distort={0.3} radius={1} metalness={0.1} roughness={0.9} />
          </mesh>
          <mesh position={[-0.3, 0, 0.05]}>
            <circleGeometry args={[0.95, 64]} />
            <meshStandardMaterial color="#d90429" emissive="#d90429" emissiveIntensity={0.8} transparent opacity={0.95} />
          </mesh>
        </group>
      </Float>
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
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative bg-[#030303]">
      <AnimatePresence>
        {showIntro && (
          <IntroCinema onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <section className="h-screen w-full sticky top-0 z-0 overflow-hidden bg-black">
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-black/80 to-[#030303]"></div>
        <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center text-zinc-800 mono text-xs uppercase tracking-widest">Loading Strategic Visuals...</div>}>
          <Canvas shadowMap dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <BangladeshFlag scrollProgress={smoothProgress} />
          </Canvas>
        </Suspense>
      </section>

      <section className="h-screen flex items-center justify-center relative z-10 px-4 mt-[-100vh]">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <div className="inline-flex items-center gap-3 border border-[#d90429] text-[#d90429] px-6 py-2 font-black tracking-[0.3em] uppercase mb-12 bg-[#d90429]/10 text-sm">
              <AlertTriangle className="w-5 h-5 animate-pulse" /> Strategic Sovereignty Cell
            </div>
            
            <h1 className="text-6xl md:text-[13rem] font-black leading-none mb-10 tracking-tighter text-white drop-shadow-2xl">
              রক্ত ঋণে <br/> 
              <span className="text-[#d90429] italic">মুক্ত</span> <br/>
              বাংলাদেশ
            </h1>
            
            <p className="text-xl md:text-5xl text-slate-300 font-['Hind_Siliguri'] max-w-5xl mx-auto leading-tight mb-20 px-4 font-black">
              চব্বিশের বিপ্লব কোনো আপস নয়, এটি আধিপত্যবাদের বিরুদ্ধে এক <span className="text-[#d90429]">চূড়ান্ত ইশতেহার।</span>
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10">
              <Link to="/join" className="group bg-[#d90429] text-white px-20 py-8 rounded-sm font-black text-2xl shadow-2xl transition-all hover:scale-105">
                প্রতিরোধে যোগ দিন
              </Link>
              <Link to="/news" className="backdrop-blur-xl bg-white/5 border-2 border-white/20 text-white px-20 py-8 rounded-sm font-black text-2xl hover:bg-white hover:text-black transition-all">
                আর্কাইভ খুলুন
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Additional sections follow the same high-end theme */}
      <section className="py-60 bg-black relative border-y border-white/5 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
           <h2 className="text-5xl md:text-9xl font-black text-white italic uppercase tracking-tighter">আমাদের লক্ষ্য</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {PRINCIPLES.map((p, i) => (
                <div key={i} className="p-12 bg-zinc-900/50 border border-white/5 backdrop-blur-xl hover:border-[#d90429]/50 transition-all text-left">
                  <div className="mb-8">{p.icon}</div>
                  <h3 className="text-3xl font-black text-white mb-4 font-['Hind_Siliguri']">{p.title}</h3>
                  <p className="text-slate-500 text-lg font-['Hind_Siliguri']">{p.description}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
