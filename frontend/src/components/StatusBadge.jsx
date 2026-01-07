import React from 'react';
import { CheckCircle, AlertCircle, Activity } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Action Required': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    'Pending Review': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };
  
  const icon = {
    'Active': <CheckCircle size={12} className="mr-1" />,
    'Action Required': <AlertCircle size={12} className="mr-1" />,
    'Pending Review': <Activity size={12} className="mr-1" />,
  };

  return (
    <span className={`flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-slate-700 text-slate-300'}`}>
      {icon[status]}
      {status}
    </span>
  );
};

export default StatusBadge;