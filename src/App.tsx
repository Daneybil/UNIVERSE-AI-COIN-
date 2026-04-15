import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract, parseEther, formatEther } from 'ethers';
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
  ExternalLink,
  Play,
  Copy,
  Plus,
  Info,
  BookOpen,
  Share2
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

declare global {
  interface Window {
    ethereum?: any;
  }
}

const TOKEN_NAME = "Universe AI";
const TOKEN_SYMBOL = "UNIVERSE";
const TOTAL_SUPPLY = "500,000,000";
const PRESALE_PRICE = 0.11;
const LAUNCH_PRICE = 0.88;
const AIRDROP_REWARD = 20;
const REFERRAL_PERCENT = 5;

const CONTRACT_ADDRESS = "0xF4d4336BC1c676818f3f74c307877F54689D7396";
const CONTRACT_ABI = [
	{
		"inputs": [],
		"name": "latestRoundData",
		"outputs": [
			{ "internalType": "uint80", "name": "roundId", "type": "uint80" },
			{ "internalType": "int256", "name": "price", "type": "int256" },
			{ "internalType": "uint256", "name": "startedAt", "type": "uint256" },
			{ "internalType": "uint256", "name": "updatedAt", "type": "uint256" },
			{ "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }
		],
		"stateMutability": "view",
		"type": "function"
	},
  {
    "inputs": [],
    "name": "buyPresale",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_referrer", "type": "address" }
    ],
    "name": "buyPresale",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimAirdrop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// --- Components ---

const CosmicBackground = () => {
  return (
    <div className="cosmic-container">
      <div className="stars" />
      <div className="nebula" />
      <div className="star-particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="star-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              '--duration': `${Math.random() * 3 + 2}s`,
            } as any}
          />
        ))}
      </div>
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

const Navbar = ({ onConnect, onNavigate, currentPage }: { onConnect: () => void, onNavigate: (page: string) => void, currentPage: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', page: 'home' },
    { name: 'Presale', href: '#presale', page: 'home' },
    { name: 'Airdrop', href: '#airdrop', page: 'home' },
    { name: 'Whitepaper', href: '#whitepaper', page: 'whitepaper' },
    { name: 'Roadmap', href: '#roadmap', page: 'home' },
    { name: 'Tokenomics', href: '#tokenomics', page: 'home' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled || currentPage === 'whitepaper' ? 'bg-cosmic-blue/80 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-gold to-fiery-orange p-0.5 shadow-[0_0_20px_rgba(253,185,49,0.2)] group-hover:shadow-[0_0_30px_rgba(253,185,49,0.4)] transition-all">
              <div className="w-full h-full rounded-[14px] bg-cosmic-blue overflow-hidden">
                <img 
                  src="https://img.sanishtech.com/u/d86b9678c87c13790586dfe448e2aff2.jpg" 
                  alt="UNIVERSE AI COIN" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <span className="text-lg md:text-xl font-display font-bold tracking-tighter gold-gradient-text hidden sm:block uppercase">
              {TOKEN_NAME}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => {
                  onNavigate(link.page);
                  if (link.page === 'home') {
                    window.location.hash = link.href;
                  }
                }}
                className={`nav-link font-tech text-[10px] uppercase tracking-widest transition-all hover:text-gold ${currentPage === link.page ? 'text-gold' : 'text-white/70'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => onNavigate('whitepaper')}
              className="px-6 py-2 rounded-full border border-gold/30 text-gold font-tech text-[10px] uppercase tracking-widest hover:bg-gold/10 transition-all"
            >
              Whitepaper
            </button>
            <button 
              onClick={onConnect}
              className="fiery-button py-2 px-6"
            >
              <div className="flex items-center gap-2">
                <Wallet size={14} />
                <span className="text-[10px]">Connect</span>
              </div>
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
                <button 
                  key={link.name} 
                  onClick={() => {
                    onNavigate(link.page);
                    if (link.page === 'home') {
                      window.location.hash = link.href;
                    }
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left py-3 text-lg font-medium ${currentPage === link.page ? 'text-gold' : 'text-white/70'}`}
                >
                  {link.name}
                </button>
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
        <div className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-gold/10 rounded-full blur-[100px] md:blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-cosmic-purple/20 rounded-full blur-[100px] md:blur-[120px]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold tracking-widest uppercase mb-6">
            <Zap size={14} />
            The Future of Intelligence
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-display font-bold leading-[0.9] md:leading-[0.8] mb-8 md:mb-10 tracking-tighter uppercase">
            <span className="block">{TOKEN_NAME}</span>
            <span className="gold-gradient-text italic opacity-95 block mt-4 text-2xl md:text-3xl lg:text-5xl font-tech tracking-normal normal-case">The First Truly Intelligent Digital Asset.</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
            <span className="font-bold text-white">{TOKEN_NAME}</span> is a pioneering ecosystem that merges the psychology of the universe with blockchain technology to create a limitless intelligent digital environment.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
            <a href="#presale" className="fiery-button">
              Join Presale
            </a>
            <a href="#about" className="px-6 md:px-10 py-4 md:py-5 rounded-full border border-white/10 hover:bg-white/5 transition-all font-tech text-[8px] md:text-[10px] uppercase tracking-widest flex items-center gap-2">
              <Info size={14} />
              Learn More
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-[280px] md:max-w-md aspect-square">
            {/* Main Coin Image Simulation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold via-gold-dark to-fiery-orange p-1 shadow-[0_0_60px_rgba(253,185,49,0.3)] md:shadow-[0_0_100px_rgba(253,185,49,0.4)] animate-float overflow-hidden">
              <div className="w-full h-full rounded-full bg-cosmic-blue overflow-hidden relative">
                <img 
                  src="https://img.sanishtech.com/u/d86b9678c87c13790586dfe448e2aff2.jpg" 
                  alt={TOKEN_NAME} 
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

const Partners = () => {
  const partners = [
    { name: 'Binance', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.svg' },
    { name: 'OKX', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/OKX_logo.svg' },
    { name: 'Kraken', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Kraken_Logo.svg' },
    { name: 'Coinbase', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Coinbase_Logo.svg' },
    { name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
  ];

  return (
    <section className="py-24 overflow-hidden border-y border-white/5 bg-white/[0.01] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-blue via-transparent to-cosmic-blue z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-20">
        <h2 className="text-white/20 uppercase tracking-[0.5em] text-[10px] font-tech">Strategic Global Partners</h2>
      </div>
      <div className="flex relative z-0">
        <div className="flex animate-scroll gap-24 items-center whitespace-nowrap">
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div key={i} className="flex items-center gap-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer group">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:border-gold/30 transition-all">
                <img src={partner.logo} alt={partner.name} className="h-6 md:h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <span className="text-white/40 font-tech text-[10px] uppercase tracking-[0.2em] group-hover:text-gold transition-colors">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight uppercase">What is {TOKEN_NAME}?</h2>
          <p className="text-white/60 text-lg mb-12 leading-relaxed font-light">
            Universe AI merges the psychology of the universe—infinite expansion, intelligence, and evolution—with blockchain technology to create a limitless intelligent digital ecosystem. We are building a visionary, intelligent, and revolutionary platform for the next generation of digital assets.
          </p>
          
          {/* Embedded Video Placeholder */}
          <div className="glass-card aspect-video mb-16 overflow-hidden relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gold/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="text-gold fill-gold" size={32} />
              </div>
            </div>
            <img 
              src="https://picsum.photos/seed/universe-space/1280/720" 
              alt="Explainer Video" 
              className="w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Infinite Expansion", desc: "Our ecosystem is designed to grow and adapt like the universe itself.", icon: Globe },
              { title: "Universal Intelligence", desc: "Advanced AI models that evolve based on community interaction.", icon: Zap },
              { title: "Evolutionary Tech", desc: "Blockchain architecture that supports the next decade of innovation.", icon: BarChart3 }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 border-white/5 hover:border-gold/20 transition-all">
                <item.icon className="text-gold mb-6" size={32} />
                <h3 className="text-xl font-display font-bold mb-4 text-white/90">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Presale = ({ onConnect, walletConnected }: { onConnect: () => void, walletConnected: boolean }) => {
  const [progress, setProgress] = useState(0);
  const [usdAmount, setUsdAmount] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate live progress starting from 0
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 0.005; // Slow live increment
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleBuy = async () => {
    if (!walletConnected) {
      onConnect();
      return;
    }
    
    if (!usdAmount || parseFloat(usdAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      // 1. Get BNB Price (Fallback to 600 if call fails)
      let bnbPrice = 600;
      try {
        console.log("Fetching BNB price...");
        const roundData = await contract.latestRoundData();
        bnbPrice = Number(roundData.price) / 1e8;
        console.log("Current BNB Price:", bnbPrice);
      } catch (priceError) {
        console.warn("Could not fetch price from contract, using fallback $600", priceError);
      }

      // 2. Calculate BNB amount
      const bnbNeeded = parseFloat(usdAmount) / bnbPrice;
      const valueToSend = parseEther(bnbNeeded.toFixed(18));
      console.log(`Sending ${bnbNeeded} BNB for $${usdAmount}`);

      // 3. Get Referrer
      const urlParams = new URLSearchParams(window.location.search);
      const referrer = urlParams.get('ref') || "0x0000000000000000000000000000000000000000";
      
      console.log("Initiating buyPresale transaction...");
      
      // Try calling with referrer first, then fallback to parameterless if it fails
      let tx;
      try {
        tx = await contract.buyPresale(referrer, { value: valueToSend });
      } catch (err) {
        console.log("Referrer call failed, trying parameterless buyPresale...");
        tx = await contract.buyPresale({ value: valueToSend });
      }
      
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed!");
      
      setPurchaseSuccess(true);
    } catch (error: any) {
      console.error("Presale Error:", error);
      alert(error.reason || error.message || "Transaction failed. Please check your balance and network.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: '0x0000000000000000000000000000000000000000', // Placeholder
              symbol: TOKEN_SYMBOL,
              decimals: 18,
              image: 'https://img.sanishtech.com/u/d86b9678c87c13790586dfe448e2aff2.jpg',
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask or a compatible wallet.");
    }
  };

  return (
    <section id="presale" className="py-16 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-tech uppercase tracking-widest mb-8">
            <Globe size={14} />
            BSC Network Exclusive
          </div>
          <h2 className="text-3xl md:text-6xl font-display font-bold mb-4 md:mb-6 tracking-tight uppercase">{TOKEN_NAME} Presale</h2>
          <p className="text-white/40 text-xs md:text-sm max-w-2xl mx-auto mb-8 font-light">
            Presale & Airdrop launching exclusively on BSC Network. Future cross-chain migration will occur via cross-bridge integration as stated in the roadmap.
          </p>
          <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-gold to-pink-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            className="glass-card p-6 md:p-14 border-white/5"
          >
            <div className="flex justify-between items-center mb-8 md:mb-10">
              <div>
                <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-2 font-tech">Current Price</p>
                <p className="text-2xl md:text-4xl font-bold text-gold font-tech">${PRESALE_PRICE}</p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-2 font-tech">Launch Price</p>
                <p className="text-2xl md:text-4xl font-bold text-white/90 font-tech">${LAUNCH_PRICE}</p>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="relative">
                <input 
                  type="number" 
                  value={usdAmount}
                  onChange={(e) => setUsdAmount(e.target.value)}
                  placeholder="Amount in USD" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 focus:outline-none focus:border-gold/50 transition-colors font-tech text-xs md:text-sm"
                />
                <span className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white/20 font-tech text-[8px] md:text-[10px]">USD</span>
              </div>
              
              <div className="relative">
                <input 
                  type="text" 
                  value={usdAmount ? (parseFloat(usdAmount) / PRESALE_PRICE).toLocaleString() : "0.00"}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 text-gold font-bold font-tech text-xs md:text-sm"
                />
                <span className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white/20 font-tech text-[8px] md:text-[10px]">{TOKEN_SYMBOL}</span>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4">
                {purchaseSuccess ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-center font-tech text-[10px]">
                      Purchase Successful!
                    </div>
                    <button 
                      onClick={handleAddToWallet}
                      className="w-full fiery-button py-4 md:py-5 text-[8px] md:text-[10px] flex items-center justify-center gap-2"
                    >
                      <Plus size={14} />
                      Add {TOKEN_SYMBOL} to Wallet
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleBuy}
                    disabled={loading}
                    className="w-full fiery-button py-4 md:py-5 text-[8px] md:text-[10px] disabled:opacity-50"
                  >
                    {loading ? "Processing..." : `Buy ${TOKEN_SYMBOL} Now`}
                  </button>
                )}
              </div>
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

const ReferralDashboard = ({ onConnect, walletConnected }: { onConnect: () => void, walletConnected: boolean }) => {
  const referralLink = `https://universe-ai.io/?ref=0x123...abc`;
  
  const handleCopy = () => {
    if (!walletConnected) {
      onConnect();
      return;
    }
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  return (
    <section id="referral" className="py-16 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-6 md:p-16 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gold/5 blur-[80px] md:blur-[100px] -mr-32 md:-mr-48 -mt-32 md:-mt-48" />
          
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-6xl font-display font-bold mb-6 md:mb-8 tracking-tight uppercase">Referral System</h2>
              <p className="text-white/50 text-base md:text-lg mb-8 md:mb-10 leading-relaxed font-light">
                Invite your friends to join the Universe AI revolution and earn <span className="text-gold font-bold">{REFERRAL_PERCENT}%</span> of every purchase they make. Rewards are distributed instantly to your wallet.
              </p>
              
              <div className="space-y-6">
                <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-4 font-tech">Your Referral Link</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="text" 
                      readOnly 
                      value={walletConnected ? referralLink : "Connect wallet to view link"}
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-white/60 focus:outline-none font-tech"
                    />
                    <button 
                      onClick={handleCopy}
                      className="p-3 md:p-4 rounded-xl bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Copy size={18} />
                      <span className="sm:hidden text-[10px] font-tech uppercase tracking-widest">Copy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { label: "Total Referred", value: walletConnected ? "0" : "---", icon: Users },
                { label: "Total Earned", value: walletConnected ? `0 ${TOKEN_SYMBOL}` : "---", icon: Coins },
                { label: "Pending Rewards", value: walletConnected ? `0 ${TOKEN_SYMBOL}` : "---", icon: Clock },
                { label: "Reward Rate", value: `${REFERRAL_PERCENT}%`, icon: Zap }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-4 md:p-8 border-white/5 text-center hover:border-gold/20 transition-all">
                  <stat.icon className="mx-auto text-gold/50 mb-3 md:mb-4" size={20} md:size={24} />
                  <p className="text-white/30 text-[6px] md:text-[8px] uppercase tracking-[0.2em] mb-1 md:mb-2 font-tech">{stat.label}</p>
                  <p className="text-lg md:text-2xl font-display font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Airdrop = ({ onConnect, walletConnected }: { onConnect: () => void, walletConnected: boolean }) => {
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleClaim = async () => {
    if (!walletConnected) {
      onConnect();
      return;
    }
    
    setLoading(true);
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      console.log("Initiating claimAirdrop transaction...");
      const tx = await contract.claimAirdrop();
      console.log("Transaction sent:", tx.hash);
      
      await tx.wait();
      console.log("Airdrop claimed!");
      
      setClaimed(true);
    } catch (error: any) {
      console.error("Airdrop Error:", error);
      alert(error.reason || error.message || "Claim failed. You may have already claimed or the airdrop is paused.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="airdrop" className="py-16 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-block p-6 md:p-8 rounded-full bg-gold/5 border border-gold/10 mb-8 md:mb-10 shadow-[0_0_50px_rgba(253,185,49,0.1)]">
          <Coins size={48} md:size={64} className="text-gold" />
        </div>
        <h2 className="text-3xl md:text-6xl font-display font-bold mb-6 md:mb-8 tracking-tight uppercase">Claim Your {TOKEN_SYMBOL} Airdrop</h2>
        <p className="text-white/50 text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          We are rewarding our early community members. Connect your wallet to receive your <span className="text-gold font-bold">{AIRDROP_REWARD} {TOKEN_SYMBOL}</span> tokens instantly.
        </p>
        <div className="glass-card p-8 md:p-12 max-w-md mx-auto border-white/5">
          <div className="flex justify-between items-center mb-6 md:mb-8 text-[8px] md:text-[10px] font-tech uppercase tracking-widest">
            <span className="text-white/40">Reward Amount</span>
            <span className="text-gold font-bold">{AIRDROP_REWARD} {TOKEN_SYMBOL}</span>
          </div>
          
          {claimed ? (
            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 font-tech text-[10px] md:text-xs">
              <CheckCircle2 className="mx-auto mb-3" size={24} />
              Airdrop Claimed Successfully!
            </div>
          ) : (
            <button 
              onClick={handleClaim}
              disabled={loading}
              className="w-full fiery-button py-4 md:py-5 text-[8px] md:text-[10px] disabled:opacity-50"
            >
              {loading ? "Processing..." : `Claim ${AIRDROP_REWARD} ${TOKEN_SYMBOL} Now`}
            </button>
          )}
          
          <p className="text-[6px] md:text-[8px] text-white/20 mt-6 md:mt-8 uppercase tracking-[0.4em] font-tech">
            * Limited to one claim per wallet address.
          </p>
        </div>
      </div>
    </section>
  );
};

const Tokenomics = () => {
  const descriptions: Record<string, string> = {
    "Presale": "The majority of supply is allocated to the community through presale. Universe AI is community-first. This ensures strong decentralization and fair access from the beginning.",
    "Liquidity": "Reserved strictly for liquidity provisioning on launch. This guarantees healthy market depth, smoother trading, and long-term price stability.",
    "Team": "Allocated for long-term development, infrastructure expansion, security upgrades, ecosystem scaling, and continuous innovation. Structured for sustainability, not short-term selling.",
    "Marketing": "Dedicated to strategic awareness campaigns, partnerships, global expansion, and long-term brand positioning."
  };

  return (
    <section id="tokenomics" className="py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight uppercase">Tokenomics</h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-sm">Transparent & Sustainable Economic Model</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TOKENOMICS}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {TOKENOMICS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#010103', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1 font-tech">Total Supply</p>
              <p className="text-2xl md:text-3xl font-display font-bold text-gold">{TOTAL_SUPPLY}</p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="glass-card p-8 border-white/5">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-2 font-tech">Total Supply</p>
                  <p className="text-xl md:text-2xl font-display font-bold text-gold truncate">{TOTAL_SUPPLY}</p>
                </div>
                <div>
                  <p className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-2 font-tech">Token Name</p>
                  <p className="text-xl md:text-2xl font-display font-bold truncate">{TOKEN_NAME}</p>
                </div>
                <div>
                  <p className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-2 font-tech">Symbol</p>
                  <p className="text-xl md:text-2xl font-display font-bold truncate">{TOKEN_SYMBOL}</p>
                </div>
                <div>
                  <p className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-2 font-tech">Decimal</p>
                  <p className="text-xl md:text-2xl font-display font-bold truncate">18</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {TOKENOMICS.map((item) => (
                <div key={item.name} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-bold text-white uppercase tracking-widest font-tech">{item.name} – {item.value}%</span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed font-light pl-7">
                    {descriptions[item.name]}
                  </p>
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
                      {(item.status === 'completed' || item.phase === 'Phase 2') && <CheckCircle2 size={16} className="text-blue-500" />}
                      {item.status === 'active' && item.phase !== 'Phase 2' && <Clock size={16} className="text-gold animate-pulse" />}
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
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nebula-purple/5 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight uppercase">Whitepaper</h2>
              <p className="text-white/50 mb-10 leading-relaxed text-lg font-light">
                Our whitepaper outlines the vision for a decentralized intelligence network that scales with human progress. Explore the technical architecture and economic framework of {TOKEN_NAME}.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-12">
                {[
                  { label: "Token Name", value: TOKEN_NAME },
                  { label: "Symbol", value: TOKEN_SYMBOL },
                  { label: "Total Supply", value: TOTAL_SUPPLY },
                  { label: "Decimals", value: "18" },
                  { label: "Presale Price", value: `$${PRESALE_PRICE}` },
                  { label: "Launch Price", value: `$${LAUNCH_PRICE}` },
                  { label: "Referral Reward", value: `${REFERRAL_PERCENT}%` },
                  { label: "Airdrop", value: `${AIRDROP_REWARD} ${TOKEN_SYMBOL}` }
                ].map((item) => (
                  <div key={item.label} className="border-b border-white/5 pb-4">
                    <p className="text-white/20 text-[8px] uppercase tracking-widest mb-1 font-tech">{item.label}</p>
                    <p className="text-sm font-bold text-white/80 font-tech">{item.value}</p>
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
                    <BookOpen className="text-gold" size={24} />
                  </div>
                  <div className="space-y-5">
                    <div className="h-5 w-3/4 bg-white/5 rounded-full" />
                    <div className="h-5 w-full bg-white/5 rounded-full" />
                    <div className="h-5 w-5/6 bg-white/5 rounded-full" />
                    <div className="h-5 w-2/3 bg-white/5 rounded-full" />
                  </div>
                  <div className="mt-auto pt-8 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-3 font-tech">Official Document</p>
                    <p className="text-2xl font-display font-bold gold-gradient-text">{TOKEN_SYMBOL} v1.0</p>
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
                    alt={TOKEN_NAME} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <span className="text-2xl font-display font-bold gold-gradient-text tracking-tighter uppercase">{TOKEN_NAME}</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Empowering the future of finance through decentralized artificial intelligence. Join the revolution of truly intelligent digital assets.
            </p>
            <div className="flex gap-5">
              {[
                { Icon: Twitter, href: "https://x.com/UNIVERSEAICOIN" },
                { Icon: Send, href: "#" },
                { Icon: Discord, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-gold hover:text-cosmic-blue transition-all duration-500">
                  <social.Icon size={20} />
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

const WhitepaperView = ({ onNavigate }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-32 pb-20 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-8 md:p-16 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nebula-purple/10 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold tracking-widest uppercase mb-8">
              <BookOpen size={14} />
              Official Whitepaper v1.0
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-12 tracking-tighter uppercase gold-gradient-text">
              Vision & Technical Architecture
            </h1>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="space-y-8">
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight border-l-4 border-gold pl-6">Token Details</h2>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Token Name", value: TOKEN_NAME },
                    { label: "Symbol", value: TOKEN_SYMBOL },
                    { label: "Total Supply", value: TOTAL_SUPPLY },
                    { label: "Decimals", value: "18" },
                    { label: "Presale Price", value: `$${PRESALE_PRICE}` },
                    { label: "Launch Price", value: `$${LAUNCH_PRICE}` },
                    { label: "Referral Reward", value: `${REFERRAL_PERCENT}%` },
                    { label: "Airdrop", value: `${AIRDROP_REWARD} ${TOKEN_SYMBOL}` },
                    { label: "Network", value: "Binance Smart Chain (BSC)" }
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="text-white/30 text-[10px] uppercase tracking-widest font-tech">{item.label}</span>
                      <span className="text-sm font-bold text-white/80 font-tech">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight border-l-4 border-fiery-orange pl-6">Mission Driven</h2>
                <div className="space-y-4 text-white/60 text-sm leading-relaxed font-light">
                  <p>Universe AI is built for mankind. Designed to empower the community. Built to help the poor. Built to raise decentralized opportunity.</p>
                  <p>Engineered for transparency and fairness. No anti-community mechanisms. No hidden traps. Smart contract structured for long-term sustainability.</p>
                  <p>Built for every bull run. Built for forever. A mission-driven ecosystem blending psychology of the universe with blockchain intelligence.</p>
                  <p className="text-gold font-bold">Presale & Airdrop launching exclusively on BSC Network. Future cross-chain migration will occur via cross-bridge integration as stated in the roadmap.</p>
                </div>
              </div>
            </div>

            <div className="space-y-12 mb-20">
              <h2 className="text-3xl font-display font-bold uppercase text-center">Allocation Breakdown</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TOKENOMICS.map((item) => (
                  <div key={item.name} className="glass-card p-6 border-white/5">
                    <div className="w-2 h-2 rounded-full mb-4" style={{ backgroundColor: item.color }} />
                    <h3 className="text-sm font-bold mb-2 uppercase tracking-widest font-tech">{item.name}</h3>
                    <p className="text-2xl font-display font-bold text-white mb-2">{item.value}%</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12 mb-20">
              <h2 className="text-3xl font-display font-bold uppercase text-center">Roadmap Summary</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {ROADMAP.slice(0, 4).map((item, i) => (
                  <div key={i} className="glass-card p-8 border-white/5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-gold font-bold font-tech text-[10px] uppercase tracking-widest">{item.phase}</h3>
                      {i < 2 && <CheckCircle2 size={16} className="text-blue-500" />}
                    </div>
                    <h4 className="text-lg font-display font-bold mb-4">{item.title}</h4>
                    <ul className="space-y-2">
                      {item.items.slice(0, 3).map((point, j) => (
                        <li key={j} className="text-white/40 text-[10px] flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-gold" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12 mb-20">
              <h2 className="text-3xl font-display font-bold uppercase text-center">Sustainability Model</h2>
              <div className="glass-card p-10 border-white/5 text-center">
                <p className="text-white/60 text-sm leading-relaxed max-w-3xl mx-auto">
                  Universe AI utilizes a multi-layered economic framework designed to survive market volatility. By combining a community-first allocation (60% Presale) with strategic liquidity locking (15%) and a long-term team vesting structure (20%), we ensure that the ecosystem remains stable and growth-oriented for the next decade.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-3xl font-display font-bold uppercase text-center">Core Pillars</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Transparency", desc: "Every transaction and AI evolution is recorded on-chain for full auditability." },
                  { title: "Community First", desc: "Governance models that ensure the community dictates the ecosystem's path." },
                  { title: "Sustainability", desc: "Economic frameworks designed to survive market volatility and thrive long-term." }
                ].map((pillar, i) => (
                  <div key={i} className="glass-card p-8 border-white/5 hover:border-gold/20 transition-all">
                    <h3 className="text-lg font-display font-bold mb-4 text-gold">{pillar.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 p-8 rounded-3xl bg-gold/5 border border-gold/10 text-center">
              <p className="text-white/60 italic font-light mb-6">"The universe is infinite, and so is our potential for collective intelligence."</p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => onNavigate('home')}
                  className="fiery-button px-8 py-4 text-[10px]"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleConnect = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (window.ethereum) {
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          setWalletConnected(true);
        }
      });

      // Listen for changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          setWalletConnected(true);
        } else {
          setUserAddress("");
          setWalletConnected(false);
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Check for BSC Network
        const network = await provider.getNetwork();
        if (network.chainId !== 56n) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x38' }], // BSC Mainnet
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x38',
                  chainName: 'Binance Smart Chain',
                  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
                  rpcUrls: ['https://bsc-dataseed.binance.org/'],
                  blockExplorerUrls: ['https://bscscan.com/'],
                }],
              });
            }
          }
        }

        setUserAddress(accounts[0]);
        setWalletConnected(true);
        setShowModal(false);
      } catch (error) {
        console.error("Connection Error:", error);
        alert("Failed to connect wallet");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      <CosmicBackground />
      <PinkyDrops />
      <Navbar onConnect={handleConnect} onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main className="w-full">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <Partners />
              <AboutSection />
              <Presale onConnect={handleConnect} walletConnected={walletConnected} />
              <ReferralDashboard onConnect={handleConnect} walletConnected={walletConnected} />
              <Airdrop onConnect={handleConnect} walletConnected={walletConnected} />
              <Tokenomics />
              <Roadmap />
              <FAQ />
            </motion.div>
          ) : (
            <WhitepaperView key="whitepaper" onNavigate={handleNavigate} />
          )}
        </AnimatePresence>
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
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight">Connect Wallet</h3>
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
                    onClick={connectWallet}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" referrerPolicy="no-referrer" />
                      <span className="font-bold text-white/90 font-tech text-xs uppercase tracking-widest">{wallet.name}</span>
                    </div>
                    <ArrowUpRight size={18} className="text-white/20 group-hover:text-gold transition-colors" />
                  </button>
                ))}
              </div>
              
              <p className="text-center text-[10px] uppercase tracking-widest text-white/30 mt-8 font-tech">
                Secure Connection Guaranteed
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
              <p className="text-xs text-white/50">{userAddress.slice(0, 6)}...{userAddress.slice(-4)}</p>
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
