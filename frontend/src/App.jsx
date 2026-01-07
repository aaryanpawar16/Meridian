import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, FileText, PieChart, Activity, Settings, 
  Search, Bell, Filter, Download, 
  MoreVertical, CheckCircle, AlertCircle, ArrowRight,
  Shield, Globe, File as FileIcon, BarChart as BarChartIcon, Menu, X,
  Zap, BrainCircuit, TrendingDown, Clock, Plus, Save, Trash2, Eye, FileCheck,
  User, Lock, RefreshCw
} from 'lucide-react';

// --- FONTS & STYLES ---
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    
    .font-heading { font-family: 'Space Grotesk', sans-serif; }
    .font-body { font-family: 'Outfit', sans-serif; }
    
    body { 
      -webkit-font-smoothing: antialiased; 
      -moz-osx-font-smoothing: grayscale; 
    }

    /* Custom Scrollbar for Sidebar/Content */
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.5); 
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(71, 85, 105, 0.8); 
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(148, 163, 184, 0.8); 
    }

    /* Simple CSS Chart Animations */
    @keyframes grow-bar {
      from { height: 0; }
      to { height: var(--height); }
    }
    .animate-bar {
      animation: grow-bar 1s ease-out forwards;
    }
    
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
);

// --- UTILS ---
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// --- BRANDING ---
const MeridianLogo = ({ className, size = 24 }) => (
  <img 
    src="/logo.png" 
    alt="Meridian Logo" 
    className={cn("object-contain", className)}
    style={{ width: size, height: size }}
  />
);

// --- WAVY BACKGROUND COMPONENT ---
const WavyBackground = ({ children, className, containerClassName, colors, waveWidth, backgroundFill, blur = 10, speed = "fast", waveOpacity = 0.5, ...props }) => {
  let w, h, nt, i, x, ctx, canvas;
  const canvasRef = useRef(null);
  const getSpeed = () => speed === "slow" ? 0.001 : 0.002;

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };

  const waveColors = colors ?? ["#4f46e5", "#7c3aed", "#9333ea", "#2563eb", "#c026d3"];
  
  const drawWave = (n) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        const y = Math.sin(x * 0.002 + nt + i * 0.5) * 60 + Math.sin(x * 0.005 + nt * 2 + i * 0.3) * 30;
        ctx.lineTo(x, y + h * 0.5); 
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId;
  const render = () => {
    ctx.fillStyle = backgroundFill || "#020617";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => { init(); return () => cancelAnimationFrame(animationId); }, []);

  return (
    <div className={cn("h-screen flex flex-col items-center justify-center font-body", containerClassName)}>
      <canvas className="absolute inset-0 z-0" ref={canvasRef} id="canvas"></canvas>
      <div className={cn("relative z-10", className)} {...props}>{children}</div>
    </div>
  );
};

// --- SHARED COMPONENTS ---

const Toast = ({ message, type, onClose }) => (
  <div className={cn(
    "fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300 transform translate-y-0 opacity-100",
    type === 'success' ? "bg-emerald-500/10 border border-emerald-500/50 text-emerald-400" :
    type === 'error' ? "bg-rose-500/10 border border-rose-500/50 text-rose-400" :
    "bg-slate-800 border border-slate-700 text-white"
  )}>
    {type === 'success' && <CheckCircle size={18} />}
    {type === 'error' && <AlertCircle size={18} />}
    {type === 'info' && <Activity size={18} />}
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 hover:text-white/80"><X size={14} /></button>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl transform transition-all scale-100 opacity-100 font-body">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h3 className="text-xl font-heading font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Action Required': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    'Pending Review': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Draft': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };
  const icon = {
    'Active': <CheckCircle size={12} className="mr-1" />,
    'Action Required': <AlertCircle size={12} className="mr-1" />,
    'Pending Review': <Activity size={12} className="mr-1" />,
    'Draft': <FileIcon size={12} className="mr-1" />,
  };
  return (
    <span className={`font-body flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-slate-700 text-slate-300'}`}>
      {icon[status]} {status}
    </span>
  );
};

const KPICard = ({ title, value, subtext, trend, isNegative }) => (
  <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-xl shadow-lg hover:border-indigo-500/30 transition-all font-body group">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider font-heading">{title}</h3>
      <Activity size={16} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
    </div>
    <div className="flex items-baseline space-x-2">
      <span className="text-3xl font-bold text-white font-heading tracking-tight">{value}</span>
    </div>
    <div className="flex items-center mt-3 space-x-2">
      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${isNegative ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
        {trend}
      </span>
      <span className="text-xs text-slate-500">{subtext}</span>
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all ${active ? 'bg-indigo-600/10 text-indigo-400 border-r-2 border-indigo-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
    <Icon size={20} strokeWidth={1.5} />
    <span className="ml-3 font-medium text-sm tracking-wide font-body">{label}</span>
  </div>
);

const AICommandCenter = ({ onReviewExposure, onAutoApply }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full flex flex-col shadow-xl">
    <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <BrainCircuit size={20} className="text-indigo-400" />
        </div>
        <div>
          <h3 className="text-white font-heading font-semibold text-base">Meridian AI</h3>
          <p className="text-xs text-slate-500 font-body">Real-time Risk Engine</p>
        </div>
    </div>
    
    <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="p-4 bg-slate-800/30 rounded-lg border-l-2 border-rose-500 hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-rose-400 text-[10px] font-bold uppercase tracking-wider flex items-center"><AlertCircle size={10} className="mr-1"/> Risk Alert</span>
                <span className="text-slate-600 text-[10px]">2m ago</span>
            </div>
            <p className="text-slate-300 text-sm font-medium font-heading leading-tight mb-2">Covenant breach detected for NorthSea Energy.</p>
            <p className="text-slate-500 text-xs mb-3">EBITDA coverage ratio dropped below 2.5x threshold.</p>
            <button onClick={onReviewExposure} className="text-xs bg-rose-500/10 text-rose-400 px-3 py-1.5 rounded hover:bg-rose-500/20 transition-colors w-full font-medium flex items-center justify-center">
              Review Exposure <ArrowRight size={10} className="ml-1" />
            </button>
        </div>

        <div className="p-4 bg-slate-800/30 rounded-lg border-l-2 border-emerald-500 hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center"><Zap size={10} className="mr-1"/> Efficiency</span>
                <span className="text-slate-600 text-[10px]">15m ago</span>
            </div>
            <p className="text-slate-300 text-sm font-medium font-heading leading-tight mb-2">Vertex Logistics ESG target verified.</p>
            <p className="text-slate-500 text-xs mb-3">Carbon reduction target met via IoT feed.</p>
             <button onClick={onAutoApply} className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded hover:bg-emerald-500/20 transition-colors w-full font-medium flex items-center justify-center">
               Auto-Apply -5 bps <Zap size={10} className="ml-1" />
             </button>
        </div>
        
         <div className="p-4 bg-slate-800/30 rounded-lg border-l-2 border-indigo-500 hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider flex items-center"><TrendingDown size={10} className="mr-1"/> Liquidity</span>
                <span className="text-slate-600 text-[10px]">1h ago</span>
            </div>
            <p className="text-slate-300 text-sm font-medium font-heading leading-tight mb-2">Secondary market interest for L-1029.</p>
            <p className="text-slate-500 text-xs">Match found: $5M block at 98.50.</p>
        </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-slate-800 text-center">
        <p className="text-[10px] text-slate-500 mb-3 flex items-center justify-center"><Clock size={10} className="mr-1"/> System Confidence: 99.4%</p>
        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors font-body">View All Insights</button>
    </div>
  </div>
);

// --- CONTENT VIEWS ---

const DashboardContent = ({ filteredLoans, stats, onAction, onFilter, onExport }) => (
  <div className="space-y-8 animate-fade-in font-body">
    {/* Header */}
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight font-heading">Market Overview</h1>
        <p className="text-slate-400 mt-1 font-body">Real-time syndicated loan facility management.</p>
      </div>
      <div className="flex space-x-3">
          <button onClick={onFilter} className="flex items-center px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700 font-body">
            <Filter size={16} className="mr-2" /> Filter
          </button>
          <button onClick={onExport} className="flex items-center px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700 font-body">
            <Download size={16} className="mr-2" /> Export
          </button>
      </div>
    </div>

    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard title="Total Exposure" value={stats ? `$${(stats.total_exposure / 1000000).toLocaleString()}M` : "$1,245M"} trend="+2.4%" subtext="vs last month" />
      <KPICard title="Active Facilities" value={stats ? stats.active_facilities : "142"} trend="+5" subtext="New this week" />
      <KPICard title="Pending Actions" value={stats ? stats.pending_actions : "8"} trend="+3" isNegative={true} subtext="Requires attention" />
      <KPICard title="Avg Risk Score" value={stats ? stats.avg_risk_score : "92"} trend="-2 pts" subtext="Market tightening" />
    </div>

    {/* Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-9 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-lg font-semibold text-white font-heading">Active Loan Portfolio</h2>
          <div className="text-xs text-slate-500 font-body flex items-center"><Activity size={12} className="mr-1 text-emerald-500"/> Live Updates</div>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider font-semibold font-heading">
              <tr>
                <th className="px-6 py-4">Deal ID</th>
                <th className="px-6 py-4">Borrower</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Facility Amount</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-body">
              {filteredLoans.length > 0 ? filteredLoans.map((loan) => (
                <tr key={loan.id} className="group hover:bg-indigo-900/10 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="font-mono text-slate-400 text-xs tracking-wider">{loan.id}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs mr-3 font-heading">
                        {loan.borrower.substring(0,2).toUpperCase()}
                      </div>
                      <div className="font-medium text-slate-200">{loan.borrower}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{loan.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-200 tracking-wide">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: loan.currency, maximumFractionDigits: 0 }).format(loan.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono">{loan.spread}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={loan.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button onClick={() => onAction('details', loan)} className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="8" className="px-6 py-10 text-center text-slate-500">No matching loans found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="lg:col-span-3">
        <AICommandCenter onReviewExposure={() => onAction('review-exposure')} onAutoApply={() => onAction('auto-apply')} />
      </div>
    </div>
  </div>
);

const DocsContent = ({ onAction }) => (
  <div className="space-y-8 animate-fade-in font-body">
     <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight font-heading">Loan Documentation</h1>
        <p className="text-slate-400 mt-1">Manage standard LMA agreements and amendments.</p>
      </div>
      <button onClick={() => onAction('upload-draft')} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors font-body">
         <FileIcon size={16} className="mr-2" /> Upload Draft
      </button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       {[1,2,3].map((i) => (
         <div key={i} onClick={() => onAction('view-doc', { id: i, title: `Facility Agreement ${i}`, status: 'Compliant' })} className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500/50 transition-colors group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-800 rounded-lg text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                <FileText size={24} />
              </div>
              <span className="text-xs font-mono text-slate-500 tracking-wider">DOC-2026-00{i}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 font-heading">Facility Agreement {i}</h3>
            <p className="text-sm text-slate-400 mb-4">Standard syndicated facility agreement based on LMA templates.</p>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800">
              <span>Updated 2h ago</span>
              <span className="flex items-center text-emerald-400"><CheckCircle size={10} className="mr-1" /> Compliant</span>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const AnalyticsContent = () => (
  <div className="space-y-8 animate-fade-in font-body">
     <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight font-heading">Portfolio Analytics</h1>
        <p className="text-slate-400 mt-1">Exposure analysis and risk concentration.</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exposure by Currency Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 font-heading flex items-center"><PieChart size={18} className="mr-2 text-indigo-400"/> Exposure by Currency</h3>
            <div className="space-y-4">
                {[
                    { label: "USD", val: "65%", amount: "$810M", color: "bg-indigo-500", width: "65%" },
                    { label: "EUR", val: "20%", amount: "$250M", color: "bg-purple-500", width: "20%" },
                    { label: "GBP", val: "15%", amount: "$185M", color: "bg-emerald-500", width: "15%" },
                ].map((item, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>{item.label}</span>
                            <span className="text-white font-mono">{item.amount} ({item.val})</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                            <div className={`h-2.5 rounded-full ${item.color} animate-bar`} style={{ width: item.width, '--height': '100%' }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Risk Distribution Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 font-heading flex items-center"><BarChartIcon size={18} className="mr-2 text-rose-400"/> Risk Distribution</h3>
            <div className="flex items-end justify-between h-40 space-x-4 pt-4 px-2">
                {[
                    { label: "Low", value: 450, height: "45%", color: "from-emerald-600 to-emerald-400" },
                    { label: "Med", value: 680, height: "68%", color: "from-indigo-600 to-indigo-400" },
                    { label: "High", value: 120, height: "25%", color: "from-amber-600 to-amber-400" },
                    { label: "Critical", value: 45, height: "15%", color: "from-rose-600 to-rose-400" },
                ].map((item, i) => (
                    <div key={i} className="w-full bg-slate-800/50 rounded-t-lg relative group flex flex-col justify-end h-full">
                        <div className={`w-full rounded-t-lg bg-gradient-to-t ${item.color} transition-all duration-1000 ease-out relative`} style={{ height: item.height }}>
                             <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-slate-700 text-white text-[10px] py-1 px-2 rounded shadow-lg font-bold transition-opacity whitespace-nowrap z-10">
                                ${item.value}M
                            </div>
                        </div>
                        <div className="text-center mt-2 text-xs text-slate-400 font-medium">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>

    {/* Additional Insight Panel */}
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h4 className="text-sm font-bold text-white mb-4 flex items-center"><Activity size={16} className="mr-2 text-indigo-400"/> Risk Concentration Insight</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Top Sector Exposure</div>
                <div className="text-lg font-bold text-white font-heading">Energy & Power</div>
                <div className="text-xs text-emerald-400 mt-1 flex items-center"><TrendingDown size={12} className="mr-1"/> 2.5% vs last Q</div>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Largest Single Counterparty</div>
                <div className="text-lg font-bold text-white font-heading">Acme Global</div>
                <div className="text-xs text-slate-400 mt-1">12% of Portfolio</div>
            </div>
             <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Avg Credit Rating</div>
                <div className="text-lg font-bold text-white font-heading">BBB+</div>
                <div className="text-xs text-indigo-400 mt-1">Stable Outlook</div>
            </div>
        </div>
    </div>
  </div>
);

const ActivityLogContent = ({ logs }) => (
    <div className="space-y-8 animate-fade-in font-body">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight font-heading">Activity Log</h1>
                <p className="text-slate-400 mt-1">Audit trail of system events and user actions.</p>
            </div>
            <div className="relative">
                <input type="text" placeholder="Search logs..." className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-indigo-500" />
                <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <table className="w-full text-left">
                <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider font-semibold font-heading">
                    <tr>
                        <th className="px-6 py-4">Timestamp</th>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Action</th>
                        <th className="px-6 py-4">Details</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-sm">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-indigo-900/10 transition-colors">
                            <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{log.time}</td>
                            <td className="px-6 py-4 font-medium text-white">{log.user}</td>
                            <td className="px-6 py-4 text-indigo-400">{log.action}</td>
                            <td className="px-6 py-4 text-slate-300">{log.details}</td>
                            <td className="px-6 py-4">
                                <span className="flex items-center text-emerald-400 text-xs bg-emerald-500/10 px-2 py-1 rounded-full w-fit">
                                    <CheckCircle size={12} className="mr-1" /> Success
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const SettingsContent = ({ onSave }) => (
    <div className="space-y-8 animate-fade-in font-body max-w-4xl">
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight font-heading">Settings</h1>
            <p className="text-slate-400 mt-1">Manage your profile and system preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center border-b border-slate-800 pb-2"><User size={18} className="mr-2 text-indigo-400"/> Profile Information</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                        <input defaultValue="Aaryan Pawar" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Email Address</label>
                        <input defaultValue="aaryan.pawar@meridian.finance" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Role</label>
                        <input disabled defaultValue="Senior Agent" className="w-full bg-slate-800/50 border border-slate-800 rounded p-2 text-slate-500 cursor-not-allowed" />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
                    <h3 className="text-lg font-bold text-white flex items-center border-b border-slate-800 pb-2"><Bell size={18} className="mr-2 text-indigo-400"/> Notifications</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300 text-sm">Email Alerts</span>
                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1"></div></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300 text-sm">Desktop Push Notifications</span>
                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1"></div></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300 text-sm">Weekly Reports</span>
                            <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute top-1 left-1"></div></div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
                    <h3 className="text-lg font-bold text-white flex items-center border-b border-slate-800 pb-2"><Lock size={18} className="mr-2 text-indigo-400"/> Security</h3>
                    <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded border border-slate-600 text-sm transition-colors flex items-center justify-center">
                        <RefreshCw size={14} className="mr-2"/> Reset API Keys
                    </button>
                </div>
            </div>
        </div>
        
        <div className="flex justify-end pt-4">
            <button onClick={onSave} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all flex items-center">
                <Save size={18} className="mr-2"/> Save Changes
            </button>
        </div>
    </div>
);

const LandingPage = ({ onEnter }) => (
  <WavyBackground className="max-w-4xl mx-auto pb-40" backgroundFill="#020617">
    <div className="z-10 text-center px-4">
      <div className="mb-10 flex justify-center">
          <MeridianLogo size={80} className="drop-shadow-2xl" />
      </div>
      <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-sm font-heading">
        MERIDIAN
      </h1>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mb-8 opacity-50" />
      <p className="text-xl md:text-2xl text-white font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed font-body">
        Automated settlement. Real-time risk mitigation. <br/>
        <span className="text-indigo-400">The future of syndicated lending.</span>
      </p>
      <div className="flex flex-col items-center space-y-6">
        <button onClick={onEnter} className="group relative px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg tracking-wide transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:bg-slate-100 cursor-pointer z-50 flex items-center font-heading">
            Launch Terminal <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
        </button>
        <div className="flex items-center space-x-6 text-slate-600 text-xs font-mono uppercase tracking-widest pt-8">
          <span className="flex items-center hover:text-indigo-400 transition-colors cursor-help"><Shield size={12} className="mr-2" /> AES-256 Encrypted</span>
          <span className="w-1 h-1 bg-slate-800 rounded-full" />
          <span className="flex items-center hover:text-indigo-400 transition-colors cursor-help"><Globe size={12} className="mr-2" /> LMA Compliant</span>
        </div>
      </div>
    </div>
  </WavyBackground>
);

// --- MAIN APP LOGIC ---

export default function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [loans, setLoans] = useState([
    { id: "L-1024", borrower: "Acme Global Industries", type: "Term Loan B", amount: 500000000, currency: "USD", status: "Active", next_payment: "2026-02-15", spread: "SOFR + 3.5%" },
    { id: "L-1025", borrower: "NorthSea Energy Partners", type: "Revolving Credit", amount: 120000000, currency: "EUR", status: "Action Required", next_payment: "2026-01-20", spread: "EURIBOR + 4.0%" },
    { id: "L-1026", borrower: "Vertex Logistics", type: "Sustain. Linked", amount: 75000000, currency: "GBP", status: "Active", next_payment: "2026-03-01", spread: "SONIA + 2.75%" },
    { id: "L-1027", borrower: "Helios Tech Corp", type: "Bridge Facility", amount: 250000000, currency: "USD", status: "Pending Review", next_payment: "2026-01-30", spread: "SOFR + 4.5%" },
    { id: "L-1028", borrower: "Apex Maritime", type: "Ship Finance", amount: 80000000, currency: "USD", status: "Active", next_payment: "2026-04-12", spread: "SOFR + 3.2%" },
    { id: "L-1029", borrower: "Quantum Health", type: "Term Loan A", amount: 150000000, currency: "USD", status: "Active", next_payment: "2026-02-28", spread: "SOFR + 2.5%" }
  ]);
  const [stats, setStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeModalType, setActiveModalType] = useState(null); 
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Mock Activity Log Data
  const activityLogs = [
      { id: 1, time: "10:42 AM", user: "Aaryan Pawar", action: "Updated Margin", details: "L-1026 Vertex Logistics (-5 bps)" },
      { id: 2, time: "09:15 AM", user: "System AI", action: "Risk Alert", details: "Covenant Breach Detection: NorthSea Energy" },
      { id: 3, time: "Yesterday", user: "Sarah Chen", action: "Document Upload", details: "Uploaded Facility_Agreement_Draft_v3.pdf" },
      { id: 4, time: "Yesterday", user: "Aaryan Pawar", action: "Login", details: "Successful login from IP 192.168.1.42" },
      { id: 5, time: "2 days ago", user: "System", action: "Batch Processing", details: "Daily interest accrual calculation completed" },
  ];

  // API Config
  // NOTE: Replace this URL with your Render Backend URL when deploying (e.g., "https://meridian-api.onrender.com")
  const API_URL = "http://127.0.0.1:8000";

  // --- ACTIONS ---
  const addNotification = (msg, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const handleAction = (type, payload) => {
    if (type === 'review-exposure') {
      setActiveTab('dashboard');
      setSearchTerm("NorthSea");
      addNotification("Filtering for High Risk Exposure: NorthSea Energy", "error");
    } else if (type === 'auto-apply') {
      setLoans(prev => prev.map(l => l.borrower === "Vertex Logistics" ? { ...l, spread: "SONIA + 2.70%" } : l));
      addNotification("ESG Margin Adjustment Applied: -5 bps for Vertex Logistics", "success");
    } else if (type === 'new-deal') {
      setActiveModalType('new-deal');
      setModalOpen(true);
    } else if (type === 'details') {
      setSelectedLoan(payload);
      setActiveModalType('details');
      setModalOpen(true);
    } else if (type === 'export') {
      addNotification("Exporting Portfolio Report to CSV...", "info");
      setTimeout(() => addNotification("Download Complete: Portfolio_Report_2026.csv", "success"), 2000);
    } else if (type === 'filter') {
      addNotification("Filter Panel Toggled (Simulation)", "info");
    } else if (type === 'upload-draft') {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
            if (e.target.files?.[0]) {
                addNotification(`Uploading ${e.target.files[0].name}...`, 'info');
                setTimeout(() => addNotification("Document Uploaded & Parsed Successfully", "success"), 2000);
            }
        };
        input.click();
    } else if (type === 'view-doc') {
        setSelectedDoc(payload);
        setActiveModalType('view-doc');
        setModalOpen(true);
    } else if (type === 'save-settings') {
        addNotification("Settings Saved Successfully", "success");
    }
  };

  const handleNewDealSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDeal = {
      id: `L-${1030 + loans.length}`,
      borrower: formData.get('borrower'),
      type: formData.get('type'),
      amount: parseInt(formData.get('amount')),
      currency: "USD",
      status: "Pending Review",
      next_payment: "2026-06-01",
      spread: "SOFR + 4.0%"
    };
    setLoans(prev => [newDeal, ...prev]);
    setModalOpen(false);
    addNotification(`New Facility Created: ${newDeal.id}`, "success");
  };

  useEffect(() => {
    const initData = async () => {
        try {
            // Try backend first
            const lRes = await fetch(`${API_URL}/api/loans`);
            const sRes = await fetch(`${API_URL}/api/stats`);
            if (lRes.ok && sRes.ok) {
                setLoans(await lRes.json());
                setStats(await sRes.json());
                return;
            }
        } catch (e) {
            console.warn("Backend unavailable, running in standalone mode.");
        }
        
        // Fallback/Standalone logic (Calculate stats from local/mock loans)
        const total = loans.reduce((acc, curr) => acc + curr.amount, 0);
        const active = loans.length;
        const pending = loans.filter(l => l.status !== "Active").length;
        setStats({ total_exposure: total, active_facilities: active, pending_actions: pending, avg_risk_score: 92 });
    };
    initData();
  }, []); // Run once on mount

  // Recalculate stats when loans change (e.g. new deal added locally)
  useEffect(() => {
      const total = loans.reduce((acc, curr) => acc + curr.amount, 0);
      const active = loans.length;
      const pending = loans.filter(l => l.status !== "Active").length;
      setStats({ total_exposure: total, active_facilities: active, pending_actions: pending, avg_risk_score: 92 });
  }, [loans]);

  const filteredLoans = loans.filter(loan => 
    loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <FontStyles />
      {view === 'landing' ? (
        <LandingPage onEnter={() => setView('dashboard')} />
      ) : (
        <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
          <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-20 flex-shrink-0">
            <div className="p-6 flex items-center space-x-3">
              <MeridianLogo size={24} className="" />
              <span className="text-xl font-bold tracking-tight text-white font-heading">MERIDIAN</span>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2 font-heading">Platform</div>
              <SidebarItem icon={Home} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
              <SidebarItem icon={FileText} label="Loan Agreements" active={activeTab === 'docs'} onClick={() => setActiveTab('docs')} />
              <SidebarItem icon={PieChart} label="Portfolio Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mt-8 mb-2 font-heading">Operations</div>
              <SidebarItem icon={Activity} label="Activity Log" active={activeTab === 'activity'} onClick={() => setActiveTab('activity')} />
              <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
            </nav>
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center space-x-3 p-2 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400 font-heading">AP</div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium text-white truncate font-body">Aaryan Pawar</div>
                  <div className="text-xs text-slate-500 truncate font-body">Senior Agent</div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 flex flex-col overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-96 bg-indigo-900/10 blur-[100px] pointer-events-none" />
            <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10 flex-shrink-0">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative group w-96">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input type="text" placeholder="Search deals, borrowers..." className="block w-full pl-10 pr-3 py-2 border border-slate-800 rounded-lg leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-indigo-500/50 sm:text-sm transition-all font-body" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-slate-400 hover:text-white transition-colors relative group"><Bell size={20} /><span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950 group-hover:bg-rose-400 transition-colors"></span></button>
                <div className="h-6 w-px bg-slate-800 mx-2"></div>
                <button onClick={() => handleAction('new-deal')} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 px-3 py-1.5 rounded hover:bg-indigo-400/10 transition-colors font-body flex items-center">New Deal <Plus size={16} className="ml-1"/></button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="max-w-7xl mx-auto">
                 {activeTab === 'dashboard' && <DashboardContent filteredLoans={filteredLoans} stats={stats} onAction={handleAction} onFilter={() => handleAction('filter')} onExport={() => handleAction('export')} />}
                 {activeTab === 'docs' && <DocsContent onAction={handleAction} />}
                 {activeTab === 'analytics' && <AnalyticsContent />}
                 {activeTab === 'activity' && <ActivityLogContent logs={activityLogs} />}
                 {activeTab === 'settings' && <SettingsContent onSave={() => handleAction('save-settings')} />}
              </div>
              <div className="h-20" />
            </div>
          </main>

          {/* Toast Container */}
          <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
            {notifications.map(n => (
              <div key={n.id} className="pointer-events-auto"><Toast message={n.msg} type={n.type} onClose={() => setNotifications(prev => prev.filter(item => item.id !== n.id))} /></div>
            ))}
          </div>

          {/* Modals */}
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={activeModalType === 'new-deal' ? 'Originate New Facility' : activeModalType === 'view-doc' ? 'Document Preview' : 'Facility Details'}>
            {activeModalType === 'new-deal' ? (
              <form onSubmit={handleNewDealSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Borrower Name</label>
                  <input name="borrower" required className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-indigo-500" placeholder="e.g. Acme Corp" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Facility Amount ($)</label>
                    <input name="amount" type="number" required className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-indigo-500" placeholder="50000000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
                    <select name="type" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-indigo-500">
                      <option>Term Loan A</option>
                      <option>Term Loan B</option>
                      <option>Revolving Credit</option>
                      <option>Bridge Facility</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex justify-end space-x-3">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-sm font-medium">Create Facility</button>
                </div>
              </form>
            ) : activeModalType === 'details' && selectedLoan ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white">{selectedLoan.borrower}</h4>
                    <p className="text-sm text-slate-500">{selectedLoan.id} • {selectedLoan.type}</p>
                  </div>
                  <StatusBadge status={selectedLoan.status} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-slate-500">Amount:</span> <span className="text-white block font-mono">{new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedLoan.currency }).format(selectedLoan.amount)}</span></div>
                  <div><span className="text-slate-500">Pricing:</span> <span className="text-white block font-mono">{selectedLoan.spread}</span></div>
                  <div><span className="text-slate-500">Next Payment:</span> <span className="text-white block">{selectedLoan.next_payment}</span></div>
                  <div><span className="text-slate-500">Risk Score:</span> <span className="text-white block">92/100</span></div>
                </div>
                <div className="pt-4 flex space-x-3">
                   <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-sm flex items-center justify-center"><FileText size={16} className="mr-2"/> View Docs</button>
                   <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded text-sm flex items-center justify-center"><Settings size={16} className="mr-2"/> Amend</button>
                </div>
              </div>
            ) : activeModalType === 'view-doc' && selectedDoc ? (
                <div className="space-y-4">
                    <div className="flex items-start space-x-4 border-b border-slate-800 pb-4">
                        <div className="p-3 bg-slate-800 rounded-lg text-indigo-400">
                            <FileText size={24} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">{selectedDoc.title}</h4>
                            <p className="text-sm text-slate-500">Version 1.0 • Updated 2 hours ago</p>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-slate-400 h-40 flex items-center justify-center border border-slate-700 border-dashed">
                        <p>Document Preview Placeholder</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Status: <span className="text-emerald-400 font-medium">Compliant</span></span>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors">Download PDF</button>
                            <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors">Edit Metadata</button>
                        </div>
                    </div>
                </div>
            ) : null}
          </Modal>
        </div>
      )}
    </>
  );
}
