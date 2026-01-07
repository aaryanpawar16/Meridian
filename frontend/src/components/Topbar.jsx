import React from 'react';
import { Search, Bell } from 'lucide-react';

const Topbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search Area */}
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative group w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search deals, borrowers, or document IDs..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-800 rounded-lg leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 sm:text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Actions Area */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-400 hover:text-white transition-colors relative group">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950 group-hover:bg-rose-400 transition-colors"></span>
        </button>
        <div className="h-6 w-px bg-slate-800 mx-2"></div>
        <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors px-3 py-1.5 rounded hover:bg-indigo-400/10">
          New Deal +
        </button>
      </div>
    </header>
  );
};

export default Topbar;