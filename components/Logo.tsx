import React from 'react';
import { Box } from 'lucide-react';

export const Logo: React.FC<{ className?: string, size?: number }> = ({ className = "", size = 32 }) => (
  <div className={`flex items-center gap-3 font-mono font-bold tracking-tighter select-none ${className}`}>
    <div className="relative flex items-center justify-center text-emerald-500">
      <Box size={size} strokeWidth={2.5} />
      <div className="absolute inset-0 bg-emerald-500/20 blur-lg" />
    </div>
    <span className="text-white text-xl md:text-2xl">
      STABLE<span className="text-emerald-500">.TREASURY</span>
    </span>
  </div>
);