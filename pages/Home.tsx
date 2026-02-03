
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
      
      // Parallax: Flag moves slightly slower than the scroll to create depth
      flagRef.current.position.z = THREE.MathUtils.lerp(0, 4, s);
      flagRef.current.position.y = THREE.MathUtils.lerp(0, -2, s);
      flagRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.1, s));
    }

    // Parallax: Stars move at a different rate to create depth
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
      
      {/* Subtle Background Glow Plane */}
      <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#d90429" transparent opacity={0.03} />
      </mesh>
    </group>
  );
};

const Home = () => {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('intro_seen');
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('intro_seen', 'true');
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
      <section className="h-screen w-full sticky top-0 z-0 overflow-hidden">
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-black/60 to-black"></div>
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
          <Suspense fallback={null}>
            <BangladeshFlag scrollProgress={smoothProgress} />
          </Suspense>
        </Canvas>
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
            <div className="inline-flex items-center gap-3 border border-[#d90429] text-[#d90429] px-6 py-2 rounded-sm font-black tracking-[0.3em] uppercase mb-12 bg-[#d90429]/10 border-glow-red">
              <AlertTriangle className="w-5 h-5 animate-pulse" /> Strategic Sovereignty Cell
            </div>
            
            <h1 className="text-6xl md:text-[12rem] font-black leading-none mb-10 tracking-tighter text-white drop-shadow-2xl">
              রক্ত ঋণে <br/> 
              <span className="text-[#d90429] text-glow-red italic">মুক্ত</span> <br/>
              বাংলাদেশ
            </h1>
            
            <div className="w-40 h-2 bg-[#d90429] mx-auto mb-12 shadow-[0_0_15px_#d90429]"></div>

            <p className="text-2xl md:text-5xl text-slate-300 font-['Hind_Siliguri'] max-w-5xl mx-auto leading-tight mb-20 px-4 font-black">
              চব্বিশের বিপ্লব কোনো আপস নয়, এটি আধিপত্যবাদের বিরুদ্ধে এক <span className="text-[#d90429]">চূড়ান্ত ইশতেহার।</span>
            </p>

            <div className="flex flex-wrap justify-center gap-10">
              <Link to="/join" className="group relative bg-[#d90429] text-white px-20 py-8 rounded-sm font-black text-2xl overflow-hidden shadow-[0_0_30px_rgba(217,4,41,0.4)] transition-all hover:scale-105">
                <span className="relative z-10">প্রতিরোধে যোগ দিন</span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </Link>
              <Link to="/news" className="backdrop-blur-xl bg-white/5 border-2 border-white/20 text-white px-20 py-8 rounded-sm font-black text-2xl hover:bg-white hover:text-black transition-all">
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
          <ChevronDown className="w-16 h-16" />
        </motion.div>
      </section>

      {/* SECTION 2: THE WALL OF RESISTANCE (Anti-Aggression) */}
      <section className="py-60 bg-black relative border-y border-white/5 z-10 overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <Crosshair className="w-[500px] h-[500px] text-[#d90429]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-16"
            >
              <div className="flex items-center gap-4">
                <div className="h-1 w-20 bg-[#d90429]"></div>
                <span className="mono text-[#d90429] font-bold tracking-[0.4em] uppercase text-sm">Target: Regional Aggression</span>
              </div>
              
              <h2 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter">
                দিল্লির <br/>
                <span className="text-[#006a4e]">দালালি</span> <br/>
                <span className="text-[#d90429]">আর নয়</span>
              </h2>
              
              <div className="space-y-8">
                <p className="text-3xl text-slate-400 font-['Hind_Siliguri'] leading-relaxed">
                  আমরা রক্তের দামে স্বাধীনতা কিনেছি, কোনো দাতা দেশের দয়ায় নয়। ফারাক্কা থেকে সীমান্ত হত্যা—প্রতিটি আঘাতের হিসাব হবে। 
                </p>
                <div className="p-8 bg-zinc-900/80 border-l-8 border-[#d90429] backdrop-blur-sm">
                   <p className="text-white font-bold text-2xl italic leading-snug">"ভারত আমাদের বন্ধু হতে চাইলে সমমর্যাদায় আসতে হবে। দালালি করে ক্ষমতায় থাকার দিন ২৪-এর জুলাইতেই শেষ হয়ে গেছে।"</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-16">
                <div className="p-10 bg-zinc-900 border border-white/10 group hover:border-[#d90429] transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                     <ShieldAlert className="w-20 h-20 text-[#d90429]" />
                  </div>
                  <Target className="w-12 h-12 text-[#d90429] mb-8" />
                  <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">Zero Tolerance</h4>
                  <p className="text-slate-500 text-lg mono">Any border aggression will be met with active strategic defense. No more Felani.</p>
                </div>
                <div className="p-10 bg-zinc-900 border border-white/10 group hover:border-[#006a4e] transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
                     <Globe className="w-20 h-20 text-[#006a4e]" />
                  </div>
                  <MapIcon className="w-12 h-12 text-[#006a4e] mb-8" />
                  <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">River Rights</h4>
                  <p className="text-slate-500 text-lg mono">Common rivers are not private assets. Fair share or international court.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
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
                <div className="absolute w-[60%] h-[60%] border-[1px] border-white/10 rounded-full animate-pulse" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-12">
                <Zap className="w-48 h-48 text-[#d90429] mb-10 text-glow-red" />
                <h3 className="mono text-white text-4xl font-black tracking-[0.2em]">DEFENSIVE <br/> SOVEREIGNTY</h3>
                <div className="mt-10 h-1 w-24 bg-[#d90429] mx-auto"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE BLOOD DEBT (Principles) */}
      <section className="py-40 bg-[#030303] relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-32 flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="max-w-3xl">
              <h2 className="text-7xl font-black mb-8 italic text-white leading-none">রক্ত ঋণের <span className="text-[#d90429]">দাবি</span></h2>
              <p className="text-slate-400 text-3xl font-['Hind_Siliguri']">জুলাই-আগস্টের শহীদের প্রতিটি ফোঁটা রক্তের হিসাব আমাদের এই ইশতেহার।</p>
            </div>
            <Link to="/about" className="group flex items-center gap-4 text-white font-black text-2xl uppercase border-b-4 border-[#d90429] pb-2">
               বিস্তারিত জানুন <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PRINCIPLES.map((p, i) => {
              // Alternate hover colors based on index/theme
              const hoverColor = i === 2 ? '#006a4e' : '#d90429';
              const shadowColor = i === 2 ? 'rgba(0, 106, 78, 0.2)' : 'rgba(217, 4, 41, 0.2)';

              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    y: -10, 
                    borderColor: hoverColor,
                    boxShadow: `0 20px 40px ${shadowColor}`
                  }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="group relative p-16 bg-gradient-to-br from-zinc-900/80 to-black border border-white/5 transition-all flex flex-col gap-10 overflow-hidden cursor-pointer"
                >
                  {/* Subtle Background Icon Parallax */}
                  <motion.div 
                    initial={{ opacity: 0.02 }}
                    whileHover={{ opacity: 0.08, scale: 1.1, rotate: 5 }}
                    className="absolute -top-10 -right-10 p-4 pointer-events-none transition-all duration-700"
                  >
                     <div className="w-64 h-64 flex items-center justify-center opacity-40">
                       {p.icon}
                     </div>
                  </motion.div>

                  <div className="relative z-10 p-6 bg-black/50 border border-white/10 w-fit rounded-full shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6">
                    {p.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 
                      className="text-4xl font-black mb-8 text-white transition-colors tracking-tighter uppercase"
                      style={{ 
                        color: 'inherit' // Handled by group-hover classes in CSS if needed, or inline
                      }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-2xl leading-relaxed font-['Hind_Siliguri'] group-hover:text-slate-200 transition-colors">
                      {p.description}
                    </p>
                  </div>

                  {/* Dynamic Progress Bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-current w-0 group-hover:w-full transition-all duration-700"
                       style={{ backgroundColor: hoverColor }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL: JOIN THE RESISTANCE */}
      <section className="py-60 bg-black text-center relative z-10 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-[#d90429]/10 to-transparent"></div>
         <div className="max-w-5xl mx-auto px-4 relative z-10">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
            >
              <h2 className="text-7xl md:text-[10rem] font-black mb-16 italic uppercase leading-[0.85] tracking-tighter">
                 দেশ বাঁচাতে <br/> <span className="text-[#d90429] text-glow-red">ঐক্যবদ্ধ</span> হোন
              </h2>
              <p className="text-3xl text-slate-400 mb-24 font-['Hind_Siliguri'] max-w-4xl mx-auto">
                 আমরা কোনো অপশক্তির কাছে নতি স্বীকার করব না। আমাদের সার্বভৌমত্ব আমাদের পবিত্র আমানত। 
              </p>
              <Link to="/join" className="group relative inline-block bg-white text-black px-24 py-10 rounded-sm font-black text-4xl hover:bg-[#d90429] hover:text-white transition-all shadow-[0_30px_70px_rgba(255,255,255,0.15)] overflow-hidden">
                 <span className="relative z-10">সদস্যপদ নিন</span>
                 <div className="absolute inset-0 bg-[#d90429] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
            </motion.div>
         </div>
      </section>
    </div>
  );
};

export default Home;
