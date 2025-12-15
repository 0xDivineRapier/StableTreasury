import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'BUY' | 'SELL';
  amountIdr: number;
  rate: number;
}

export const TradeModal: React.FC<TradeModalProps> = ({ isOpen, onClose, type, amountIdr, rate }) => {
  const [status, setStatus] = useState<'IDLE' | 'EXECUTING' | 'SUCCESS'>('IDLE');

  useEffect(() => {
    if (isOpen) setStatus('IDLE');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExecute = () => {
    setStatus('EXECUTING');
    // Simulate API call
    setTimeout(() => {
      setStatus('SUCCESS');
    }, 2000);
  };

  const usdAmount = amountIdr / rate;
  const fees = amountIdr * 0.003; // Mock 0.3% fee
  const finalAmount = amountIdr - fees;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className={type === 'BUY' ? 'text-emerald-500' : 'text-red-500'}>
              {type} USDT
            </span>
            <span className="text-slate-500 text-sm font-mono font-normal">@ {rate.toLocaleString('id-ID')}</span>
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'SUCCESS' ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white">Trade Executed</h3>
              <p className="text-slate-400">
                Successfully {type === 'BUY' ? 'bought' : 'sold'} <span className="text-white font-mono">{usdAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })} USDT</span>
              </p>
              <button 
                onClick={onClose}
                className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Close Receipt
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Amount (IDR)</span>
                  <span className="text-white font-mono">{amountIdr.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Est. Fees (0.3%)</span>
                  <span className="text-red-400 font-mono">-{fees.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                  <span className="text-slate-400">Total {type === 'BUY' ? 'USDT Received' : 'IDR Received'}</span>
                  <span className={`text-xl font-bold font-mono ${type === 'BUY' ? 'text-emerald-400' : 'text-white'}`}>
                    {type === 'BUY' 
                      ? `~${(finalAmount / rate).toLocaleString('en-US', { maximumFractionDigits: 2 })}` 
                      : `~${finalAmount.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`
                    }
                  </span>
                </div>
              </div>

              {/* Warning */}
              <div className="flex gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertTriangle className="text-yellow-500 shrink-0" size={18} />
                <p className="text-xs text-yellow-500/80">
                  Rate is locked for 30 seconds. Slippage tolerance is set to 0.5%.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleExecute}
                disabled={status === 'EXECUTING'}
                className={`w-full font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  type === 'BUY' 
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                    : 'bg-red-500 hover:bg-red-400 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                } ${status === 'EXECUTING' ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {status === 'EXECUTING' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm {type} <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};