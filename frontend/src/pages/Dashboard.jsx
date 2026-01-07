import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, PieChart, Activity, Settings, TrendingUp, Search, Bell, Filter, Download, MoreVertical } from 'lucide-react';
import SidebarItem from '../components/SidebarItem';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { LOAN_DATA } from '../data/mockData';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLoans = LOAN_DATA.filter(loan => 
    loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30"
    >
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-20"
      >
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <TrendingUp size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">MERIDIAN</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">Platform</div>
          <SidebarItem icon={Home} label="Dashboard" active={activeTab === 'dashboard'} />
          <SidebarItem icon={FileText} label="Loan Agreements" />
          <SidebarItem icon={PieChart} label="Portfolio Analytics" />
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mt-8 mb-2">Operations</div>
          <SidebarItem icon={Activity} label="Activity Log" />
          <SidebarItem icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 p-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400">JD</div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium text-white truncate">John Doe</div>
              <div className="text-xs text-slate-500 truncate">Senior Agent</div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-indigo-900/10 blur-[100px] pointer-events-none" />

        <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10">
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
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="h-6 w-px bg-slate-800 mx-2"></div>
            <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300">New Deal +</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Market Overview</h1>
                <p className="text-slate-400 mt-1">Real-time syndicated loan facility management.</p>
              </div>
              <div className="flex space-x-3">
                 <button className="flex items-center px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                   <Filter size={16} className="mr-2" /> Filter
                 </button>
                 <button className="flex items-center px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                   <Download size={16} className="mr-2" /> Export
                 </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard title="Total Exposure" value="$1.24B" trend="+2.4%" subtext="vs last month" />
              <KPICard title="Active Facilities" value="142" trend="+5" subtext="New this week" />
              <KPICard title="Pending Actions" value="8" trend="+3" isNegative={true} subtext="Requires attention" />
              <KPICard title="Avg Spread" value="345 bps" trend="-2 bps" subtext="Market tightening" />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl"
            >
              <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h2 className="text-lg font-semibold text-white">Active Loan Portfolio</h2>
                <div className="text-xs text-slate-500">Live Updates • 2m ago</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-4">Deal ID</th>
                      <th className="px-6 py-4">Borrower</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Facility Amount</th>
                      <th className="px-6 py-4">Next Payment</th>
                      <th className="px-6 py-4">Pricing</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {filteredLoans.map((loan, index) => (
                      <motion.tr 
                        key={loan.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                        className="group hover:bg-indigo-900/10 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap"><span className="font-mono text-slate-400 text-xs">{loan.id}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs mr-3">
                              {loan.borrower.substring(0,2).toUpperCase()}
                            </div>
                            <div className="font-medium text-slate-200">{loan.borrower}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{loan.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-200">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: loan.currency, maximumFractionDigits: 0 }).format(loan.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{loan.next_payment}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400"><span className="bg-slate-800 px-2 py-1 rounded text-xs">{loan.spread}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={loan.status} /></td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"><MoreVertical size={16} /></button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
          <div className="h-20" />
        </div>
      </main>
    </motion.div>
  );
};

export default Dashboard;