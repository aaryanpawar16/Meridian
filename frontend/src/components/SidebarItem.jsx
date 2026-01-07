import React from 'react';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, active, collapsed }) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
    className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${
      active ? 'bg-indigo-600/20 text-indigo-400 border-r-2 border-indigo-500' : 'text-slate-400 hover:text-slate-200'
    }`}
  >
    <Icon size={20} strokeWidth={1.5} />
    {!collapsed && (
      <motion.span 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="ml-3 font-medium text-sm tracking-wide"
      >
        {label}
      </motion.span>
    )}
  </motion.div>
);

export default SidebarItem;