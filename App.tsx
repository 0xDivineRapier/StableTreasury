import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Globe2, 
  Bitcoin, 
  Activity,
  AlertCircle,
  TrendingUp,
  User as UserIcon,
  LogOut,
  Wallet
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Clock } from './components/Clock';
import { RateCard } from './components/RateCard';
import { Logo } from './components/Logo';
import { Landing } from './components/Landing';
import { Platform } from './components/Platform';
import { API } from './components/API';
import { Enterprise } from './components/Enterprise';
import { LoginModal } from './components/LoginModal';
import { TradeModal } from './components/TradeModal';
import { RouteOption, CalculationResult, MarketInsight, User, View } from './types';
import { getMarketAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('LANDING');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [amountIdr, setAmountIdr] = useState<number>(100000000);
  const [loadingAi, setLoadingAi] = useState(false);
  const [marketInsight, setMarketInsight] = useState<MarketInsight | null>(null);
  
  // Trade Modal State
  const [tradeModalConfig, setTradeModalConfig] = useState<{isOpen: boolean, type: 'BUY' | 'SELL'}>({
    isOpen: false,
    type: 'BUY'
  });

  // Constants
  const RATES = {
    BCA: 16750,
    WISE: 16450,
    USDT: 16550
  };

  // Define routes logic with updated formulas
  const routes: RouteOption[] = useMemo(() => [
    {
      id: 'bca',
      name: 'BCA Counter Rate',
      provider: 'Bank TT',
      type: 'BANK',
      rate: RATES.BCA,
      feeDescription: 'Flat fee 50,000 IDR',
      calculateFeesIdr: () => 50000,
      calculateUsdReceived: (input) => (input - 50000) / RATES.BCA
    },
    {
      id: 'wise',
      name: 'Wise Business',
      provider: 'Fintech',
      type: 'FINTECH',
      rate: RATES.WISE,
      feeDescription: '0.6% Transfer Fee',
      calculateFeesIdr: (input) => input * 0.006,
      calculateUsdReceived: (input) => (input - (input * 0.006)) / RATES.WISE
    },
    {
      id: 'usdt',
      name: 'Stable Rail',
      provider: 'Crypto (USDT)',
      type: 'CRYPTO',
      rate: RATES.USDT,
      feeDescription: '0.3% Trading + 1 USDT Network',
      calculateFeesIdr: (input) => (input * 0.003) + (1 * RATES.USDT), // Approx fee display
      calculateUsdReceived: (input) => ((input - (input * 0.003)) / RATES.USDT) - 1.0
    }
  ], [RATES]);

  // Calculations
  const results: CalculationResult[] = useMemo(() => {
    return routes.map(route => {
      const usdReceived = route.calculateUsdReceived(amountIdr);
      const feesIdr = route.calculateFeesIdr(amountIdr);
      return {
        routeId: route.id,
        usdReceived,
        feesIdr,
        effectiveRate: amountIdr / usdReceived
      };
    });
  }, [amountIdr, routes]);

  const bestResult = results.reduce((prev, current) => 
    (current.usdReceived > prev.usdReceived) ? current : prev
  );

  const bestRoute = routes.find(r => r.id === bestResult.routeId)!;
  
  // Calculate savings vs Bank TT
  const bankResult = results.find(r => r.routeId === 'bca')!;
  const usdDiff = bestResult.usdReceived - bankResult.usdReceived;
  // Convert the USD difference back to IDR using the best rate to estimate value saved
  const savingsIdr = usdDiff * bestRoute.rate;

  const handleAiAnalysis = async () => {
    setLoadingAi(true);
    const insight = await getMarketAnalysis(amountIdr);
    setMarketInsight(insight);
    setLoadingAi(false);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false);
    setCurrentView('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMarketInsight(null);
    setCurrentView('LANDING');
  };

  const handleTrade = (type: 'BUY' | 'SELL') => {
    setTradeModalConfig({ isOpen: true, type });
  };

  const formatIdr = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  // Generate Mock History Data
  const historyData = useMemo(() => {
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayIndex = 6 - i;
      const baseMarket = 16650 + (Math.sin(dayIndex * 0.5) * 50);
      const noise = (Math.cos(dayIndex * 20) * 20);
      const bankRate = baseMarket + 120 + noise;
      const usdtRate = baseMarket - 100 + noise;

      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        Bank: Math.round(bankRate),
        USDT: Math.round(usdtRate),
      });
    }
    return data;
  }, []);

  // View Routing
  if (currentView !== 'DASHBOARD' && !currentUser) {
    // Shared Props for Marketing Pages
    const marketingProps = {
      onNavigate: setCurrentView,
      onLoginClick: () => setIsLoginModalOpen(true)
    };

    return (
      <>
        {currentView === 'LANDING' && <Landing {...marketingProps} />}
        {currentView === 'PLATFORM' && <Platform {...marketingProps} />}
        {currentView === 'API' && <API {...marketingProps} />}
        {currentView === 'ENTERPRISE' && <Enterprise {...marketingProps} />}
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

  // Dashboard View (Protected)
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans selection:bg-emerald-500/30 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
          <div className="cursor-pointer" onClick={() => setCurrentView('LANDING')}>
            <Logo />
            <p className="text-slate-400 mt-2 font-mono text-sm pl-1">FX Optimization Engine &bull; IDR Settlement</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            
            {/* User Profile Badge */}
            <div className="flex items-center gap-2 pl-4 pr-3 py-1.5 bg-slate-800 rounded-full border border-slate-700">
               <div className={`w-2 h-2 rounded-full ${currentUser?.type === 'WEB3' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
               {currentUser?.type === 'WEB3' ? (
                 <Wallet size={14} className="text-slate-400" />
               ) : (
                 <UserIcon size={14} className="text-slate-400" />
               )}
               <span className="text-sm font-mono text-slate-200">
                 {currentUser?.identifier}
               </span>
               <button 
                onClick={handleLogout}
                className="ml-2 p-1 hover:bg-slate-700 rounded-full text-slate-500 hover:text-red-400 transition-colors"
                title="Disconnect"
               >
                 <LogOut size={14} />
               </button>
            </div>

            <div className="h-6 w-px bg-slate-800 hidden md:block" />

            <button 
              onClick={handleAiAnalysis}
              disabled={loadingAi}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-600/30 rounded transition-colors text-sm font-medium"
            >
              {loadingAi ? <Activity className="animate-spin" size={16} /> : <Activity size={16} />}
              {marketInsight ? 'Refresh Analysis' : 'AI Market Insight'}
            </button>
            
            <Clock />
          </div>
        </header>

        {/* AI Insight Panel */}
        {marketInsight && (
          <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-4 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Activity className="text-indigo-400" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-indigo-200">Market Intelligence</h3>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                    marketInsight.sentiment === 'BULLISH' ? 'bg-green-500/20 text-green-400' :
                    marketInsight.sentiment === 'BEARISH' ? 'bg-red-500/20 text-red-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    USD SENTIMENT: {marketInsight.sentiment}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">{marketInsight.summary}</p>
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-300">
                  <AlertCircle size={12} />
                  <span>RECOMMENDATION: {marketInsight.recommendation}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Control Panel */}
        <section className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <label className="block text-sm font-medium text-slate-400 mb-2 font-mono">
            INVOICE AMOUNT (IDR)
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={amountIdr.toLocaleString('id-ID')}
              onChange={(e) => {
                const val = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                setAmountIdr(val);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-6 py-4 text-3xl font-mono text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder-slate-600"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-mono font-bold pointer-events-none">
              IDR
            </div>
          </div>
        </section>

        {/* Rate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map((route) => (
            <RateCard
              key={route.id}
              option={route}
              result={results.find(r => r.routeId === route.id)!}
              isBest={bestResult.routeId === route.id}
              totalAmountIdr={amountIdr}
              onTrade={route.type === 'CRYPTO' ? handleTrade : undefined}
            />
          ))}
        </div>

        {/* Spread History Chart */}
        <section className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-500" />
              Spread History (7 Days)
            </h3>
            <div className="text-xs text-slate-400 font-mono">
              Lower rate = Better for Buy USD
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  domain={['auto', 'auto']} 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  width={60}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ fontSize: '12px', fontFamily: 'monospace' }}
                  labelStyle={{ color: '#cbd5e1', marginBottom: '8px', fontSize: '12px' }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  wrapperStyle={{ fontSize: '12px', fontFamily: 'monospace' }}
                />
                <Line 
                  name="Bank Rate (TT)"
                  type="monotone" 
                  dataKey="Bank" 
                  stroke="#f87171" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#f87171', strokeWidth: 0 }}
                  activeDot={{ r: 6, stroke: '#f87171', strokeWidth: 2, fill: '#0f172a' }}
                />
                <Line 
                  name="USDT Rate (Stable)"
                  type="monotone" 
                  dataKey="USDT" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#0f172a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* The Verdict */}
        <div className="bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/40 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="p-4 bg-emerald-500 text-slate-900 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              {bestRoute.type === 'CRYPTO' ? <Bitcoin size={32} /> : 
               bestRoute.type === 'BANK' ? <Building2 size={32} /> : 
               <Globe2 size={32} />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Best Route: <span className="text-emerald-400">{bestRoute.name}</span></h2>
              <p className="text-lg text-slate-300 mt-2">
                You save <span className="text-emerald-400 font-bold font-mono border-b border-emerald-500/50 pb-0.5">{formatIdr(savingsIdr)}</span> IDR vs Bank TT.
              </p>
            </div>
          </div>
          
          <div className="text-right bg-slate-900/80 p-5 rounded-lg border border-slate-700 backdrop-blur-sm relative z-10 min-w-[200px]">
             <div className="text-xs text-slate-400 font-mono uppercase tracking-wide">Total USD Received</div>
             <div className="text-3xl font-bold text-emerald-400 font-mono mt-1">
               ${bestResult.usdReceived.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
             </div>
          </div>
        </div>

      </div>

      <TradeModal 
        isOpen={tradeModalConfig.isOpen}
        onClose={() => setTradeModalConfig(prev => ({ ...prev, isOpen: false }))}
        type={tradeModalConfig.type}
        amountIdr={amountIdr}
        rate={RATES.USDT}
      />
    </div>
  );
};

export default App;