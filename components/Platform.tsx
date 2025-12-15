import React from 'react';
import { View } from '../types';
import { NavBar } from './NavBar';
import { BarChart3, Zap, Globe2, Shield, Layers, ArrowRight } from 'lucide-react';

interface PlatformProps {
  onNavigate: (view: View) => void;
  onLoginClick: () => void;
}

export const Platform: React.FC<PlatformProps> = ({ onNavigate, onLoginClick }) => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col">
       {/* Background Effects */}
       <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 pointer-events-none" />
      
      <NavBar currentView="PLATFORM" onNavigate={onNavigate} onLoginClick={onLoginClick} />

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Institutional-Grade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Execution Engine</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            A unified terminal for managing cross-border treasury operations. 
            Access real-time FX rates, execute trades instantly, and reconcile across multiple liquidity rails.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart3,
              title: "Advanced Charting",
              desc: "Visualise spread history and arbitrage opportunities with sub-second latency data feeds from 12+ liquidity providers."
            },
            {
              icon: Zap,
              title: "Instant Settlement",
              desc: "Bypass T+2 banking delays. Our stablecoin rails settle in T+0 (avg. 12 seconds) 24/7/365."
            },
            {
              icon: Globe2,
              title: "Multi-Currency Support",
              desc: "Native support for IDR, SGD, USD, and EUR. Auto-hedging capabilities to mitigate FX risk during transfer."
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              desc: "Role-based access control (RBAC), multi-sig wallet integration, and SOC2 Type II compliant infrastructure."
            },
            {
              icon: Layers,
              title: "Smart Routing",
              desc: "Our algorithm automatically splits large orders across Bank, Fintech, and Crypto rails to minimize slippage."
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:bg-slate-800/60 transition-colors group">
              <div className="h-12 w-12 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700 mb-6 group-hover:border-blue-500/50 transition-colors">
                <feature.icon className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
          
          {/* CTA Card */}
          <div className="p-8 bg-gradient-to-br from-emerald-900/50 to-slate-900 border border-emerald-500/30 rounded-2xl flex flex-col justify-center items-start">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to optimize?</h3>
            <p className="text-slate-300 text-sm mb-6">Join 500+ forward-thinking treasury teams.</p>
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 text-emerald-400 font-bold hover:gap-3 transition-all"
            >
              Launch Terminal <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};