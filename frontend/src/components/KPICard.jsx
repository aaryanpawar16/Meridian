import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const KPICard = ({ title, value, subtext, trend, isNegative }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-xl shadow-lg relative overflow-hidden group hover:border-slate-600 transition-all"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Activity size={60} />
    </div>
    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
    <div className="flex items-baseline space-x-2">
      <span className="text-3xl font-bold text-white">{value}</span>
    </div>
    <div className="flex items-center mt-3 space-x-2">
      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${isNegative ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
        {trend}
      </span>
      <span className="text-xs text-slate-500">{subtext}</span>
    </div>
  </motion.div>
);

export default KPICard;