import React from 'react';
import { Thermometer, Droplets, Wind, Clock } from 'lucide-react';
import { SensorReading } from '../../types';

interface LiveSensorReadingsProps {
  data: SensorReading[];
  selectedZone: string | null;
}

export const LiveSensorReadings: React.FC<LiveSensorReadingsProps> = ({ data, selectedZone }) => {
  const filteredData = selectedZone 
    ? data.filter(reading => reading.Zone === selectedZone)
    : data;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'alert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSmokeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'none': return 'text-green-600';
      case 'low': return 'text-yellow-600';
      case 'moderate': return 'text-orange-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Live Sensor Readings</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Real-time</span>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredData.map((reading, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{reading.Zone}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(reading.Status)}`}>
                {reading.Status}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{reading.Temperature}</div>
                  <div className="text-xs text-gray-600">Temperature</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wind className={`w-4 h-4 ${getSmokeColor(reading['Smoke Level'])}`} />
                <div>
                  <div className="text-sm font-medium text-gray-900">{reading['Smoke Level']}</div>
                  <div className="text-xs text-gray-600">Smoke Level</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{reading.Humidity}</div>
                  <div className="text-xs text-gray-600">Humidity</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(reading['Last Updated']).toLocaleTimeString()}
                  </div>
                  <div className="text-xs text-gray-600">Last Updated</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};