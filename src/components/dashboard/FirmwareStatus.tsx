import React, { useState, useEffect } from 'react';
import { Ship as Chip, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { FirmwareStatus as FirmwareStatusType } from '../../types';

export const FirmwareStatus: React.FC = () => {
  const [firmwareData, setFirmwareData] = useState<FirmwareStatusType[]>([]);

  useEffect(() => {
    import('../../data/firmware_status.json').then(data => {
      setFirmwareData(data.default);
    });
  }, []);

  const getStatusColor = (status: string) => {
    return status.toLowerCase() === 'up-to-date'
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getStatusIcon = (status: string) => {
    return status.toLowerCase() === 'up-to-date' ? CheckCircle : AlertCircle;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Firmware Status</h2>
        <div className="text-sm text-gray-600">
          {firmwareData.filter(f => f.Status === 'Up-to-date').length}/{firmwareData.length} Updated
        </div>
      </div>

      <div className="space-y-4">
        {firmwareData.map((firmware, index) => {
          const StatusIcon = getStatusIcon(firmware.Status);
          
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Chip className="w-4 h-4 text-gray-600" />
                  <h3 className="font-medium text-gray-900">{firmware.Device}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(firmware.Status)}`}>
                  {firmware.Status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Version</span>
                  <span className="text-sm font-medium text-gray-900">{firmware.Firmware}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Last Update</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{firmware.LastUpdate}</span>
                </div>
              </div>

              {firmware.Status === 'Outdated' && (
                <div className="mt-3 flex items-center gap-2 p-2 bg-yellow-50 rounded-md">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-yellow-700">Update available</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Check for Updates
        </button>
      </div>
    </div>
  );
};