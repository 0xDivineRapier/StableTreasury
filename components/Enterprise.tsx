import React from 'react';
import { View } from '../types';
import { NavBar } from './NavBar';
import { Building, Lock, FileCheck, Users, Globe, PieChart } from 'lucide-react';

interface EnterpriseProps {
  onNavigate: (view: View) => void;
  onLoginClick: () => void;
}

export const Enterprise: React.FC<EnterpriseProps> = ({ onNavigate, onLoginClick }) => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col">
       <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
      
      <NavBar currentView="ENTERPRISE" onNavigate={onNavigate} onLoginClick={onLoginClick} />

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Treasury Management <br />
            <span className="text-slate-500">at Global Scale.</span>
          </h1>
          <p className="text-xl text-slate-400">
            Custom liquidity solutions, dedicated account management, and white-glove onboarding for high-volume institutions.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button 
              onClick={onLoginClick}
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Contact Sales
            </button>
            <button 
              onClick={() => onNavigate('PLATFORM')}
              className="px-8 py-4 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
            >
              View Platform
            </button>
          </div>
        </div>

        {/* Trust Section */}
        <div className="border-y border-slate-800 py-12 mb-20">
           <div className="text-center text-sm font-mono text-slate-500 mb-8 uppercase tracking-widest">Trusted by Finance Teams at</div>
           <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Mock Logos */}
              {['Acme Corp', 'Global Ventures', 'TechFlow', 'Stark Industries', 'Wayne Ent'].map(name => (
                <span key={name} className="text-xl font-bold font-mono text-white">{name}</span>
              ))}
           </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white">Why Enterprise?</h2>
              {[
                {
                  icon: Users,
                  title: "Dedicated Account Manager",
                  desc: "24/7 direct access to a treasury expert for execution support and strategy."
                },
                {
                  icon: PieChart,
                  title: "Custom Liquidity Pools",
                  desc: "Access deep, OTC liquidity for block trades >$1M with zero slippage."
                },
                {
                  icon: FileCheck,
                  title: "Automated Compliance",
                  desc: "Built-in KYC/KYB checks and travel rule compliance for all crypto settlements."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                   <div className="mt-1">
                     <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                        <item.icon className="text-emerald-500" size={20} />
                     </div>
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-white">{item.title}</h3>
                     <p className="text-slate-400 mt-1">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>

           <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Globe size={200} />
              </div>
              <h3 className="text-xl font-bold text-white mb-6">Security First</h3>
              <ul className="space-y-4 relative z-10">
                 <li className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <Lock className="text-emerald-500" size={20} />
                    <div>
                      <div className="font-bold text-slate-200">SOC2 Type II Certified</div>
                      <div className="text-xs text-slate-500">Audited annually by Big 4</div>
                    </div>
                 </li>
                 <li className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <Building className="text-emerald-500" size={20} />
                    <div>
                      <div className="font-bold text-slate-200">Qualified Custodian Support</div>
                      <div className="text-xs text-slate-500">Assets held in segregated cold storage</div>
                    </div>
                 </li>
              </ul>
           </div>
        </div>

      </main>
    </div>
  );
};