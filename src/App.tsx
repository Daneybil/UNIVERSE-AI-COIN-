import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  ChevronRight, 
  Twitter, 
  Send, 
  Disc as Discord, 
  Menu, 
  X, 
  ArrowUpRight, 
  Download, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap,
  Globe,
  Coins,
  BarChart3,
  Users,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';
import { ROADMAP, TOKENOMICS, FAQS } from './constants';

// --- Components ---

const UniversalCloud = () => {
  return (
    <div className="universal-cloud">
      <div className="cloud-layer w-[800px] h-[800px] bg-gold/10 -top-1/4 -left-1/4" />
      <div className="cloud-layer w-[600px] h-[600px] bg-pink-accent/10 top-1/2 -right-1/4" />
      <div className="cloud-layer w-[700px] h-[700px] bg-cloud-blue/10 -bottom-1/4 left-1/4" />
    </div>
  );
};

const PinkyDrops = () => {
  const [drops, setDrops] = useState<{ id: number; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const newDrops = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 5 + 5}s`,
      delay: `${Math.random() * 10}s`,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="pinky-drop"
          style={{
            left: drop.left,
            animationDuration: drop.duration,
            animationDelay: drop.delay,
          }}
        />
      ))}
    </div>
  );
};

const Navbar = ({ onConnect }: { onConnect: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Presale', href: '#presale' },
    { name: 'Airdrop', href: '#airdrop' },
    { name: 'Whitepaper', href: '#whitepaper' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Tokenomics', href: '#tokenomics' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-cosmic-blue/80 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-fiery-orange p-0.5 shadow-[0_0_20px_rgba(253,185,49,0.2)] group-hover:shadow-[0_0_30px_rgba(253,185,49,0.4)] transition-all">
              <div className="w-full h-full rounded-[14px] bg-cosmic-blue overflow-hidden">
                <img 
                  src="https://img.sanishtech.com/u/d86b9678c87c13790586dfe448e2aff2.jpg" 
                  alt="UNIVERSE AI COIN" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <span className="text-xl font-display font-bold tracking-tighter gold-gradient-text hidden sm:block uppercase">
              UNIVERSE AI COIN
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
            <button 
              onClick={onConnect}
              className="fiery-button flex items-center gap-2 text-sm py-2 px-6"
            >
              <Wallet size={16} />
              Connect Wallet
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cosmic-blue border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="block py-3 text-lg font-medium text-white/70 hover:text-gold"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => { onConnect(); setIsOpen(false); }}
                className="w-full fiery-button flex items-center justify-center gap-2 mt-4"
              >
                <Wallet size={18} />
                Connect Wallet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cosmic-purple/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold tracking-widest uppercase mb-6">
            <Zap size={14} />
            The Future of Intelligence
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold leading-[0.85] mb-10 tracking-tighter uppercase">
            <span className="block">UNIVERSE AI COIN</span>
            <span className="gold-gradient-text italic opacity-95 block mt-4 text-4xl md:text-6xl">The First Truly Intelligent Digital Asset.</span>
          </h1>
          <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
            <span className="font-bold text-white">UNIVERSE AI COIN</span> is a pioneering cryptocurrency that integrates robust blockchain technology with advanced, scalable artificial intelligence, establishing itself as the world's first truly intelligent digital asset dedicated to advancing human progress on a global scale.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#presale" className="fiery-button flex items-center gap-2">
              Buy Presale
              <ChevronRight size={18} />
            </a>
            <a href="#airdrop" className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors font-bold">
              Claim Airdrop
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-square">
            {/* Main Coin Image Simulation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold via-gold-dark to-fiery-orange p-1 shadow-[0_0_100px_rgba(253,185,49,0.4)] animate-float overflow-hidden">
              <div className="w-full h-full rounded-full bg-cosmic-blue overflow-hidden relative">
                <img 
                  src="https://img.sanishtech.com/u/d86b9678c87c13790586dfe448e2aff2.jpg" 
                  alt="UNIVERSE AI COIN" 
                  className="w-full h-full object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-blue/60 to-transparent" />
              </div>
            </div>
            
            {/* Decorative Rings */}
            <div className="absolute -inset-4 border border-gold/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-10 border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Presale = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 5, minutes: 42, seconds: 18 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate live progress starting from 0
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 0.01; // Slow live increment
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="presale" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">UNIVERSE AI COIN Presale</h2>
          <div className="h-1 w-32 bg-gradient-to-r from-gold to-pink-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            className="glass-card p-10 lg:p-14 border-white/5"
          >
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Current Price</p>
                <p className="text-4xl font-bold text-gold">$0.01</p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Listing Price</p>
                <p className="text-4xl font-bold text-white/90">$0.80</p>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white/60 font-medium">Presale Progress (Live)</span>
                <span className="text-gold font-bold">{progress.toFixed(4)}% Sold</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-fiery-orange via-gold to-pink-accent"
                />
              </div>
              <div className="flex justify-between text-[10px] mt-3 text-white/30 uppercase tracking-widest">
                <span>0 UNIVERSE AI</span>
                <span>1,000,000,000 UNIVERSE AI</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-2xl font-bold text-white">{value}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1 block">{unit}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="Amount in USD" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">USD</span>
              </div>
              <div className="flex items-center justify-center py-2">
                <div className="h-px flex-1 bg-white/10" />
                <span className="px-4 text-xs text-white/30 uppercase tracking-widest">You Receive</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="0.00" 
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-gold font-bold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">UNIVERSE AI</span>
              </div>
              <button className="w-full fiery-button py-4 text-lg mt-4">
                Buy UNIVERSE AI COIN Now
              </button>
            </div>
          </motion.div>

          <div className="space-y-8">
            <div className="glass-card p-6 flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Secure & Audited</h3>
                <p className="text-white/60 text-sm">Our smart contracts are fully audited by top security firms, ensuring your assets are safe and secure throughout the presale.</p>
              </div>
            </div>
            <div className="glass-card p-6 flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-fiery-orange/10 flex items-center justify-center shrink-0">
                <Zap className="text-fiery-orange" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Instant Token Allocation</h3>
                <p className="text-white/60 text-sm">Tokens are allocated to your wallet instantly upon successful transaction confirmation on the blockchain.</p>
              </div>
            </div>
            <div className="glass-card p-6 flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <Globe className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Global Accessibility</h3>
                <p className="text-white/60 text-sm">Participate from anywhere in the world using Ethereum, BSC, or Polygon networks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Airdrop = () => {
  return (
    <section id="airdrop" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-block p-6 rounded-full bg-gold/5 border border-gold/10 mb-10">
          <Coins size={64} className="text-gold" />
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Claim Your UNIVERSE AI COIN Airdrop</h2>
        <p className="text-white/50 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          We are rewarding our early community members. Connect your wallet to check your eligibility and claim your share of the UNIVERSE AI COIN ecosystem.
        </p>
        <div className="glass-card p-10 max-w-md mx-auto border-white/5">
          <div className="flex justify-between items-center mb-8 text-sm">
            <span className="text-white/40 uppercase tracking-widest">Eligibility Status</span>
            <span className="text-pink-accent font-bold flex items-center gap-2">
              <Clock size={16} />
              Wallet Not Connected
            </span>
          </div>
          <button className="w-full fiery-button py-5 text-lg">
            Connect Wallet to Check
          </button>
          <p className="text-[10px] text-white/20 mt-6 uppercase tracking-[0.3em]">
            * Gas fees apply for claiming. Limited to one claim per wallet.
          </p>
        </div>
      </div>
    </section>
  );
};

const Tokenomics = () => {
  return (
    <section id="tokenomics" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">Tokenomics</h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-sm">Strategic distribution for long-term sustainability</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="h-[450px] w-full relative">
            <div className="absolute inset-0 bg-pink-accent/5 rounded-full blur-[100px] pointer-events-none" />
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TOKENOMICS}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={160}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {TOKENOMICS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-10 border-white/5">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2">Total Supply</p>
                  <p className="text-3xl font-display font-bold text-gold">1,000,000,000</p>
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2">Token Name</p>
                  <p className="text-3xl font-display font-bold">UNIVERSE AI</p>
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2">Network</p>
                  <p className="text-3xl font-display font-bold">Multi-Chain</p>
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2">Decimal</p>
                  <p className="text-3xl font-display font-bold">18</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOKENOMICS.map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                  <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-white/60">{item.name}</span>
                  <span className="ml-auto font-bold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">Project Roadmap</h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-sm">Our journey towards building the most intelligent AI ecosystem</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-pink-accent to-transparent hidden lg:block" />

          <div className="space-y-20">
            {ROADMAP.map((item, index) => (
              <motion.div 
                key={item.phase}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className={`glass-card p-10 relative border-white/5 ${item.status === 'active' ? 'border-gold/30 shadow-[0_0_40px_rgba(253,185,49,0.05)]' : ''}`}>
                    <div className={`flex items-center gap-3 mb-6 justify-start lg:justify-normal ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                      <span className="text-gold font-bold tracking-[0.2em] uppercase text-[10px]">{item.phase}</span>
                      {item.status === 'completed' && <CheckCircle2 size={16} className="text-green-500" />}
                      {item.status === 'active' && <Clock size={16} className="text-gold animate-pulse" />}
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-6">{item.title}</h3>
                    <ul className={`space-y-3 text-white/50 text-sm ${index % 2 === 0 ? 'lg:ml-auto' : ''}`}>
                      {item.items.map((point) => (
                        <li key={point} className={`flex items-center gap-3 ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="w-16 h-16 rounded-full bg-cosmic-blue border-4 border-white/10 z-10 hidden lg:flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <div className={`w-5 h-5 rounded-full ${item.status === 'active' ? 'bg-gold animate-ping' : item.status === 'completed' ? 'bg-green-500' : 'bg-white/20'}`} />
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Whitepaper = () => {
  return (
    <section id="whitepaper" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-16 overflow-hidden relative border-white/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-accent/5 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">UNIVERSE AI Whitepaper</h2>
              <p className="text-white/50 mb-10 leading-relaxed text-lg">
                Dive deep into the technical architecture, AI integration models, and economic framework of the UNIVERSE AI ecosystem. Our whitepaper outlines the vision for a decentralized intelligence network that scales with human progress.
              </p>
              <div className="space-y-6 mb-12">
                {[
                  "Detailed Tokenomics & Allocation",
                  "AI Model Scalability Roadmap",
                  "Governance & DAO Framework"
                ].map((text) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-gold" size={14} />
                    </div>
                    <span className="text-sm font-medium text-white/70">{text}</span>
                  </div>
                ))}
              </div>
              <button className="fiery-button flex items-center gap-3 px-10">
                <Download size={20} />
                Download Whitepaper PDF
              </button>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl border border-white/10 p-10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700 group">
                <div className="h-full border border-white/5 rounded-2xl p-8 flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-8">
                    <span className="text-gold font-bold text-xl">PDF</span>
                  </div>
                  <div className="space-y-5">
                    <div className="h-5 w-3/4 bg-white/5 rounded-full" />
                    <div className="h-5 w-full bg-white/5 rounded-full" />
                    <div className="h-5 w-5/6 bg-white/5 rounded-full" />
                    <div className="h-5 w-2/3 bg-white/5 rounded-full" />
                  </div>
                  <div className="mt-auto pt-8 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-3">Official Document</p>
                    <p className="text-2xl font-display font-bold gold-gradient-text">UNIVERSE AI COIN v1.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">FAQ</h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-sm">Everything you need to know about UNIVERSE AI COIN</p>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="glass-card overflow-hidden border-white/5">
              <button 
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-bold text-white/80 text-lg">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform ${activeIdx === idx ? 'rotate-180' : ''}`}>
                  <ChevronRight size={18} className="text-gold" />
                </div>
              </button>
              <AnimatePresence>
                {activeIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-white/50 text-base leading-relaxed border-t border-white/5 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-pink-accent/5 blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-fiery-orange p-0.5 shadow-lg">
                <div className="w-full h-full rounded-[14px] bg-cosmic-blue overflow-hidden">
                  <img 
                    src="https://img.sanishtech.com/u/d86b9678c87c13790586dfe448e2aff2.jpg" 
                    alt="UNIVERSE AI COIN" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <span className="text-2xl font-display font-bold gold-gradient-text tracking-tighter">UNIVERSE AI COIN</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Empowering the future of finance through decentralized artificial intelligence. Join the revolution of truly intelligent digital assets.
            </p>
            <div className="flex gap-5">
              {[Twitter, Send, Discord].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-gold hover:text-cosmic-blue transition-all duration-500">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-8 text-lg">Quick Links</h4>
            <ul className="space-y-5 text-sm text-white/40">
              {['Home', 'Presale', 'Airdrop', 'Roadmap'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-8 text-lg">Resources</h4>
            <ul className="space-y-5 text-sm text-white/40">
              <li><a href="#whitepaper" className="hover:text-white transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Smart Contract</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Audit Report</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-8 text-lg">Newsletter</h4>
            <p className="text-white/40 text-sm mb-6">Stay updated with the latest AI developments.</p>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gold/30 transition-all"
              />
              <button className="w-full fiery-button py-4 text-sm">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-white/20 uppercase tracking-[0.4em]">
          <p>© 2026 UNIVERSE AI COIN. All Rights Reserved.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleConnect = () => {
    setShowModal(true);
  };

  const simulateConnect = () => {
    setWalletConnected(true);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen relative">
      <UniversalCloud />
      <PinkyDrops />
      <Navbar onConnect={handleConnect} />
      
      <main>
        <Hero />
        <Presale />
        <Airdrop />
        <Whitepaper />
        <Tokenomics />
        <Roadmap />
        <FAQ />
      </main>

      <Footer />

      {/* Wallet Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md glass-card p-8 bg-cosmic-blue border-gold/20"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif font-bold">Connect Wallet</h3>
                <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Logo.svg' },
                  { name: 'Trust Wallet', icon: 'https://trustwallet.com/assets/images/media/assets/trust_platform.svg' },
                  { name: 'WalletConnect', icon: 'https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg' },
                  { name: 'Coinbase Wallet', icon: 'https://avatars.githubusercontent.com/u/18060234?s=200&v=4' }
                ].map((wallet) => (
                  <button 
                    key={wallet.name}
                    onClick={simulateConnect}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" referrerPolicy="no-referrer" />
                      <span className="font-bold text-white/90">{wallet.name}</span>
                    </div>
                    <ArrowUpRight size={18} className="text-white/20 group-hover:text-gold transition-colors" />
                  </button>
                ))}
              </div>
              
              <p className="text-center text-xs text-white/30 mt-8">
                By connecting your wallet, you agree to our <a href="#" className="text-gold hover:underline">Terms of Service</a>.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {walletConnected && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 right-8 z-[100] glass-card p-4 flex items-center gap-4 border-green-500/50"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="text-green-500" />
            </div>
            <div>
              <p className="font-bold text-sm">Wallet Connected</p>
              <p className="text-xs text-white/50">0x71C...392A</p>
            </div>
            <button onClick={() => setWalletConnected(false)} className="ml-4 text-white/30 hover:text-white">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
