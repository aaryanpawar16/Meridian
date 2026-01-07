import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, Shield, Globe } from 'lucide-react';

const LandingPage = ({ onEnter }) => {
  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden selection:bg-indigo-500/30">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center px-4 max-w-4xl"
      >
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-10 flex justify-center"
        >
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 ring-1 ring-white/20 backdrop-blur-xl">
                <TrendingUp size={56} className="text-white" />
            </div>
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-sm">
          MERIDIAN
        </h1>
        
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mb-8 opacity-50" />

        <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed">
          Advancing <span className="text-indigo-400 font-normal">Liquidity</span>, <span className="text-indigo-400 font-normal">Efficiency</span>, and <span className="text-indigo-400 font-normal">Transparency</span>.
          <br />The new standard for syndicated lending.
        </p>

        <div className="flex flex-col items-center space-y-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="group relative px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg tracking-wide transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:bg-slate-100"
          >
            <span className="flex items-center">
              Launch Terminal 
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
            </span>
          </motion.button>
          
          <div className="flex items-center space-x-6 text-slate-600 text-xs font-mono uppercase tracking-widest pt-8">
            <span className="flex items-center hover:text-indigo-400 transition-colors cursor-help"><Shield size={12} className="mr-2" /> AES-256 Encrypted</span>
            <span className="w-1 h-1 bg-slate-800 rounded-full" />
            <span className="flex items-center hover:text-indigo-400 transition-colors cursor-help"><Globe size={12} className="mr-2" /> LMA Compliant</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;