import React from 'react';
import { Battery, Wifi, Power, AlertCircle } from 'lucide-react';
import { DeviceHealth } from '../../types';

interface DeviceHealthMonitorProps {
  data: DeviceHealth[];
}

export const DeviceHealthMonitor: React.FC<DeviceHealthMonitorProps> = ({ data }) => {
  const getBatteryColor = (battery: string) => {
    const percentage = parseInt(battery);
    if (percentage > 60) return 'text-green-600';
    if (percentage > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSignalColor = (strength: string) => {
    switch (strength.toLowerCase()) {
      case 'strong': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'weak': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    return status.toLowerCase() === 'online' 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Device Health</h2>
        <div className="text-sm text-gray-600">
          {data.filter(d => d.Status === 'Online').length}/{data.length} Online
        </div>
      </div>

      <div className="space-y-4">
        {data.map((device, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{device.DeviceID}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(device.Status)}`}>
                {device.Status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className={`w-4 h-4 ${getBatteryColor(device.Battery)}`} />
                  <span className="text-sm text-gray-600">Battery</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{device.Battery}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className={`w-4 h-4 ${getSignalColor(device.SignalStrength)}`} />
                  <span className="text-sm text-gray-600">Signal</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{device.SignalStrength}</span>
              </div>
            </div>

            {device.Status === 'Offline' && (
              <div className="mt-3 flex items-center gap-2 p-2 bg-red-50 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">Device requires attention</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};