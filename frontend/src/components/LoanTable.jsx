import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import StatusBadge from './StatusBadge';

const LoanTable = ({ data }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
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
            {data.map((loan, index) => (
              <motion.tr 
                key={loan.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.3 }}
                className="group hover:bg-indigo-900/10 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-slate-400 text-xs">{loan.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs mr-3">
                      {loan.borrower.substring(0,2).toUpperCase()}
                    </div>
                    <div className="font-medium text-slate-200">{loan.borrower}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  {loan.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-200">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: loan.currency, maximumFractionDigits: 0 }).format(loan.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  {loan.next_payment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                   <span className="bg-slate-800 px-2 py-1 rounded text-xs">{loan.spread}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={loan.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {data.length} records</span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-300 transition-colors">Previous</button>
          <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-300 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

export default LoanTable;