import React from 'react';
import { RouteOption, CalculationResult } from '../types';
import { DollarSign, Info } from 'lucide-react';

interface RateCardProps {
  option: RouteOption;
  result: CalculationResult;
  isBest: boolean;
  totalAmountIdr: number;
  onTrade?: (type: 'BUY' | 'SELL') => void;
}

export const RateCard: React.FC<RateCardProps> = ({ option, result, isBest, totalAmountIdr, onTrade }) => {
  const formatCurrency = (amount: number, currency: 'IDR' | 'USD') => {
    return new Intl.NumberFormat(currency === 'IDR' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: currency === 'IDR' ? 0 : 2,
    }).format(amount);
  };

  return (
    <div className={`
      relative overflow-hidden rounded-xl transition-all duration-300 flex flex-col
      ${isBest 
        ? 'bg-slate-800 border-2 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.3)] transform scale-[1.03] z-10' 
        : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600 opacity-90 hover:opacity-100'
      }
    `}>
      {isBest && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-lg font-mono shadow-md">
          RECOMMENDED
        </div>
      )}

      <div className="p-6 space-y-4 flex-grow">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
               <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                 option.type === 'BANK' ? 'bg-blue-500/20 text-blue-400' :
                 option.type === 'FINTECH' ? 'bg-purple-500/20 text-purple-400' :
                 'bg-orange-500/20 text-orange-400'
               }`}>
                 {option.type}
               </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-2">{option.provider}</h3>
            <p className="text-slate-400 text-sm">{option.name}</p>
          </div>
        </div>

        {/* Rate Display */}
        <div className="py-4 border-t border-slate-700/50 border-b space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Rate</span>
            <span className="font-mono text-white">{formatCurrency(option.rate, 'IDR')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Fees</span>
            <span className="font-mono text-red-400">-{formatCurrency(result.feesIdr, 'IDR')}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center justify-end">
             {option.feeDescription}
          </div>
        </div>

        {/* Output */}
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">You Receive</span>
          <div className={`text-2xl font-mono font-bold mt-1 flex items-center space-x-2 ${isBest ? 'text-emerald-400' : 'text-slate-200'}`}>
            <DollarSign size={20} className={isBest ? 'text-emerald-500' : 'text-slate-500'} />
            <span>{formatCurrency(result.usdReceived, 'USD').replace('$', '')}</span>
          </div>
          
          <div className="mt-2 text-xs flex items-center space-x-1 text-slate-500">
             <span>Effective: {formatCurrency(result.effectiveRate, 'IDR')}</span>
             <Info size={12} />
          </div>
        </div>
      </div>
      
      {/* Trade Actions (Only for CRYPTO) */}
      {option.type === 'CRYPTO' && onTrade && (
        <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3">
          <button 
            onClick={() => onTrade('BUY')}
            className="py-2 px-4 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-slate-900 border border-emerald-500/50 hover:border-emerald-500 transition-all font-bold text-sm uppercase tracking-wide"
          >
            Buy
          </button>
          <button 
            onClick={() => onTrade('SELL')}
            className="py-2 px-4 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 hover:border-red-500 transition-all font-bold text-sm uppercase tracking-wide"
          >
            Sell
          </button>
        </div>
      )}
      
      {/* Visual Bar at bottom (only if no buttons, to keep rounded corners nice, or always) */}
      {option.type !== 'CRYPTO' && (
        <div className={`h-1 w-full ${isBest ? 'bg-emerald-500' : 'bg-slate-700'}`} />
      )}
    </div>
  );
};