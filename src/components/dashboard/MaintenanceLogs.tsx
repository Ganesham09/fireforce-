import React, { useState } from 'react';
import { Wrench, User, Calendar, FileText, Plus } from 'lucide-react';
import { MaintenanceLog } from '../../types';

export const MaintenanceLogs: React.FC = () => {
  const [logs] = useState<MaintenanceLog[]>([
    {
      date: '2025-07-30',
      type: 'Hardware',
      technician: 'John Smith',
      remarks: 'Replaced thermal sensor in Lab A, calibrated temperature readings'
    },
    {
      date: '2025-07-28',
      type: 'Firmware',
      technician: 'Sarah Johnson',
      remarks: 'Updated smoke detector firmware to v2.3.1, improved detection algorithms'
    },
    {
      date: '2025-07-25',
      type: 'Hardware',
      technician: 'Mike Chen',
      remarks: 'Routine battery replacement for wireless sensors, tested connectivity'
    },
    {
      date: '2025-07-22',
      type: 'Software',
      technician: 'Emily Davis',
      remarks: 'Dashboard system update, enhanced real-time monitoring capabilities'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hardware': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'firmware': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'software': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Maintenance Logs</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Log</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Technician</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(log.date).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(log.type)}`}>
                    {log.type}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-900">{log.technician}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-900">{log.remarks}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};