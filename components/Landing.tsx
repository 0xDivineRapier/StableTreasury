import React from 'react';
import { View } from '../types';
import { NavBar } from './NavBar';
import { ArrowRight, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';

interface LandingProps {
  onNavigate: (view: View) => void;
  onLoginClick: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate, onLoginClick }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden font-sans text-slate-100">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Navigation */}
      <NavBar currentView="LANDING" onNavigate={onNavigate} onLoginClick={onLoginClick} />

      {/* Main Hero */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 relative z-10 max-w-5xl mx-auto mt-[-2rem]">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-8 shadow-lg backdrop-blur-md animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          LIVE FX RATES ACTIVE
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl leading-tight">
          The Operating System for <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
            Cross-Border Capital
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Stop overpaying for settlement. Compare Bank TT, Wise, and Stablecoin rails in real-time to find the <span className="text-slate-200 font-semibold">arbitrage in every invoice</span>.
        </p>

        {/* CTA Button */}
        <button 
          onClick={onLoginClick}
          className="group relative px-8 py-5 bg-emerald-500 text-slate-900 font-bold text-lg rounded-xl hover:bg-emerald-400 transition-all duration-200 hover:scale-105 shadow-[0_0_40px_rgba(16,185,129,0.3)] ring-offset-2 ring-offset-slate-900 focus:ring-2 ring-emerald-500"
        >
          <span className="flex items-center gap-3">
            INITIALIZE ENGINE
            <ArrowRight className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
          </span>
        </button>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full max-w-4xl">
          {[
            { 
              icon: Zap, 
              title: "Real-Time Arbitrage", 
              desc: "Detect live spreads between legacy banking (SWIFT) and modern crypto rails instantly." 
            },
            { 
              icon: Lock, 
              title: "Institutional Grade", 
              desc: "Bank-level encryption with enterprise-ready APIs for automated treasury management." 
            },
            { 
              icon: Globe, 
              title: "Global Liquidity", 
              desc: "Access deep liquidity pools for IDR, USD, and USDT settlements 24/7." 
            }
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/60 hover:border-emerald-500/30 transition-all group">
              <div className="h-10 w-10 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700 mb-4 group-hover:border-emerald-500/50 transition-colors">
                <f.icon className="text-emerald-500" size={20} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center border-t border-slate-800/50 mt-12 bg-slate-900/50 backdrop-blur-md">
        <p className="text-slate-600 text-sm font-mono mb-2">
          &copy; 2024 STABLE-TREASURY SYSTEMS INC.
        </p>
        <div className="flex justify-center gap-6 text-xs text-slate-500">
           <span>Privacy Protocol</span>
           <span>Terms of Service</span>
           <span>Status</span>
        </div>
      </footer>
    </div>
  );
};