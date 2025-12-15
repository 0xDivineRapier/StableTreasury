import React from 'react';
import { View } from '../types';
import { NavBar } from './NavBar';
import { Terminal, Code2, Cpu, Check } from 'lucide-react';

interface APIProps {
  onNavigate: (view: View) => void;
  onLoginClick: () => void;
}

export const API: React.FC<APIProps> = ({ onNavigate, onLoginClick }) => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col">
       <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-950 pointer-events-none" />
      
      <NavBar currentView="API" onNavigate={onNavigate} onLoginClick={onLoginClick} />

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-4">
              <Terminal size={12} />
              V2.4.0 STABLE
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Build on the <br/>
              <span className="text-indigo-400">Financial Infrastructure</span> <br/>
              of the Future.
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed">
              Integrate real-time FX rates, smart routing, and instant settlement directly into your ERP or internal dashboard. 
              Our REST and WebSocket APIs are designed for developers, by developers.
            </p>

            <div className="space-y-4 pt-4">
              {[
                "99.99% Uptime SLA",
                "Sub-50ms Latency on Rate Quotes",
                "Webhooks for Transaction Status",
                "Sandbox Environment Available"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="h-5 w-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Check size={12} className="text-indigo-400" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            
            <div className="pt-6">
              <button 
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                onClick={onLoginClick}
              >
                <Code2 size={18} />
                Get API Keys
              </button>
            </div>
          </div>

          {/* Right Code Block */}
          <div className="flex-1 w-full max-w-xl">
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="text-xs font-mono text-slate-500">POST /v2/quote</div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                  <code className="text-blue-300">curl</code> <span className="text-slate-400">-X POST</span> <span className="text-green-400">https://api.stable-treasury.com/v2/quote</span> \<br/>
                  <span className="text-slate-400">  -H</span> <span className="text-orange-300">"Authorization: Bearer sk_live_..."</span> \<br/>
                  <span className="text-slate-400">  -d</span> {'{'}<br/>
                  <span className="text-purple-300">    "pair"</span>: <span className="text-green-300">"USD-IDR"</span>,<br/>
                  <span className="text-purple-300">    "amount"</span>: <span className="text-yellow-300">100000</span>,<br/>
                  <span className="text-purple-300">    "side"</span>: <span className="text-green-300">"BUY"</span>,<br/>
                  <span className="text-purple-300">    "strategy"</span>: <span className="text-green-300">"BEST_EXECUTION"</span><br/>
                  {'  }'}
                </pre>
              </div>
              <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50">
                 <div className="text-xs font-mono text-slate-500 mb-2">// Response (12ms)</div>
                 <pre className="font-mono text-xs text-slate-300">
{`{
  "quote_id": "q_8293712",
  "rate": 16550.00,
  "route": "USDT_RAIL",
  "savings": "2,450,000 IDR"
}`}
                 </pre>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-4">
               {[
                 { label: "Requests/sec", val: "10k+" },
                 { label: "Avg Latency", val: "45ms" },
                 { label: "Pairs", val: "24" }
               ].map((stat, i) => (
                 <div key={i} className="p-4 bg-slate-800/30 rounded-lg border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-white font-mono">{stat.val}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};