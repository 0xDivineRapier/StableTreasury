import React, { useState } from 'react';
import { User } from '../types';
import { Lock, X, Wallet, ArrowRight, Loader2, Mail } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [loginState, setLoginState] = useState<'IDLE' | 'CONNECTING_WALLET' | 'LOGGING_IN_WEB2'>('IDLE');
  const [web2Email, setWeb2Email] = useState('');

  if (!isOpen) return null;

  const handleWeb3Login = () => {
    setLoginState('CONNECTING_WALLET');
    setTimeout(() => {
      onLogin({
        type: 'WEB3',
        identifier: '0x71C...9A23',
        isConnected: true
      });
      setLoginState('IDLE');
    }, 1500);
  };

  const handleWeb2Login = (e: React.FormEvent) => {
    e.preventDefault();
    if (!web2Email) return;
    setLoginState('LOGGING_IN_WEB2');
    setTimeout(() => {
      onLogin({
        type: 'WEB2',
        identifier: web2Email,
        isConnected: true
      });
      setLoginState('IDLE');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock size={20} className="text-emerald-500" />
            Access Terminal
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Web3 Option */}
          <button 
            onClick={handleWeb3Login}
            disabled={loginState !== 'IDLE'}
            className="w-full group relative flex items-center justify-between p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500 rounded-xl transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                {loginState === 'CONNECTING_WALLET' ? <Loader2 className="animate-spin" size={20} /> : <Wallet size={20} />}
              </div>
              <div className="text-left">
                <div className="font-bold text-emerald-400">Connect Wallet</div>
                <div className="text-xs text-emerald-500/60 font-mono">Metamask / Rabby / Phantom</div>
              </div>
            </div>
            <ArrowRight size={18} className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Web2 Option */}
          <form onSubmit={handleWeb2Login} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1.5 ml-1">WORK EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  value={web2Email}
                  onChange={(e) => setWeb2Email(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={loginState !== 'IDLE' || !web2Email}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginState === 'LOGGING_IN_WEB2' ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Authenticating...
                </>
              ) : (
                'Continue with Email'
              )}
            </button>
          </form>

        </div>
        
        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/50 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            By connecting, you agree to our <span className="text-slate-400 underline cursor-pointer">Terms of Service</span>.
          </p>
        </div>
      </div>
    </div>
  );
};