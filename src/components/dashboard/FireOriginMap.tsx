import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Clock, Thermometer, CheckCircle, Users, Flame, Shield, Eye, Zap } from 'lucide-react';
import { FireOrigin } from '../../types';

interface LabStatus {
  id: string;
  name: string;
  status: 'normal' | 'warning' | 'critical';
  temperature: string;
  smokeLevel: string;
  humidity: string;
  occupancy: number;
  lastAlert?: string;
  sensors: {
    temp: string;
    smoke: string;
    co2: string;
    motion: boolean;
  };
  evacuationRoute: string;
  fireSuppression: 'active' | 'standby' | 'offline';
}

export const FireOriginMap: React.FC = () => {
  const [fireData, setFireData] = useState<FireOrigin | null>(null);
  const [selectedLab, setSelectedLab] = useState<string>('Lab B');
  
  const labStatuses: LabStatus[] = [
    {
      id: 'Lab A',
      name: 'Lab A',
      status: 'normal',
      temperature: '22.1°C',
      smokeLevel: 'None',
      humidity: '45%',
      occupancy: 8,
      lastAlert: 'No recent alerts',
      sensors: {
        temp: '22.1°C',
        smoke: '0 ppm',
        co2: '400 ppm',
        motion: true
      },
      evacuationRoute: 'Main Exit → Stairwell A',
      fireSuppression: 'standby'
    },
    {
      id: 'Lab B',
      name: 'Lab B',
      status: 'critical',
      temperature: '43.7°C',
      smokeLevel: 'Moderate',
      humidity: '78%',
      occupancy: 0,
      lastAlert: '2025-07-31T23:10:30',
      sensors: {
        temp: '43.7°C',
        smoke: '150 ppm',
        co2: '1200 ppm',
        motion: false
      },
      evacuationRoute: 'Emergency Exit → Fire Escape',
      fireSuppression: 'active'
    },
    {
      id: 'Lab C',
      name: 'Lab C',
      status: 'warning',
      temperature: '28.9°C',
      smokeLevel: 'Low',
      humidity: '52%',
      occupancy: 3,
      lastAlert: '2025-07-30T14:22:15',
      sensors: {
        temp: '28.9°C',
        smoke: '25 ppm',
        co2: '650 ppm',
        motion: true
      },
      evacuationRoute: 'Side Exit → Stairwell B',
      fireSuppression: 'standby'
    },
    {
      id: 'Storage',
      name: 'Storage',
      status: 'normal',
      temperature: '24.3°C',
      smokeLevel: 'None',
      humidity: '38%',
      occupancy: 0,
      lastAlert: 'No recent alerts',
      sensors: {
        temp: '24.3°C',
        smoke: '0 ppm',
        co2: '380 ppm',
        motion: false
      },
      evacuationRoute: 'Back Exit → Loading Dock',
      fireSuppression: 'standby'
    },
    {
      id: 'Hallway',
      name: 'Hallway',
      status: 'normal',
      temperature: '23.8°C',
      smokeLevel: 'None',
      humidity: '42%',
      occupancy: 2,
      lastAlert: 'No recent alerts',
      sensors: {
        temp: '23.8°C',
        smoke: '0 ppm',
        co2: '420 ppm',
        motion: true
      },
      evacuationRoute: 'Main Exit → Stairwell A',
      fireSuppression: 'standby'
    },
    {
      id: 'Server',
      name: 'Server',
      status: 'normal',
      temperature: '26.1°C',
      smokeLevel: 'None',
      humidity: '35%',
      occupancy: 1,
      lastAlert: 'No recent alerts',
      sensors: {
        temp: '26.1°C',
        smoke: '0 ppm',
        co2: '450 ppm',
        motion: true
      },
      evacuationRoute: 'Emergency Exit → Fire Escape',
      fireSuppression: 'standby'
    }
  ];

  useEffect(() => {
    import('../../data/fire_origin_map.json').then(data => {
      setFireData(data.default);
    });
  }, []);

  const getLabColor = (status: string, isSelected: boolean) => {
    const baseClasses = "rounded-lg border-2 flex flex-col items-center justify-center relative cursor-pointer transition-all hover:scale-105 p-4 min-h-[80px]";
    const selectedClasses = isSelected ? "ring-2 ring-blue-400 ring-offset-2" : "";
    
    switch (status) {
      case 'critical':
        return `${baseClasses} bg-red-100 border-red-400 text-red-800 animate-pulse ${selectedClasses}`;
      case 'warning':
        return `${baseClasses} bg-yellow-100 border-yellow-400 text-yellow-800 ${selectedClasses}`;
      case 'normal':
        return `${baseClasses} bg-green-100 border-green-400 text-green-800 ${selectedClasses}`;
      default:
        return `${baseClasses} bg-white border-gray-200 ${selectedClasses}`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600 absolute -top-2 -right-2" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600 absolute -top-2 -right-2" />;
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-green-600 absolute -top-2 -right-2" />;
      default:
        return null;
    }
  };

  const selectedLabData = labStatuses.find(lab => lab.id === selectedLab);
  const criticalLabs = labStatuses.filter(lab => lab.status === 'critical').length;
  const totalOccupancy = labStatuses.reduce((sum, lab) => sum + lab.occupancy, 0);

  if (!fireData) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">Fire Origin Map</h2>
          {criticalLabs > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full">
              <Flame className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-700">{criticalLabs} Active Alert{criticalLabs !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="font-medium">{totalOccupancy} occupants</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Suppression Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
        {/* Floor Plan Visualization */}
        <div className="lg:col-span-3">
          <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300 h-full">
            <div className="text-center mb-6">
              <h3 className="font-semibold text-gray-900 text-xl mb-2">Building Layout</h3>
              <p className="text-sm text-gray-600">2nd Floor - Real-time Monitoring</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 h-64">
              {labStatuses.map((lab) => (
                <div
                  key={lab.id}
                  onClick={() => setSelectedLab(lab.id)}
                  className={getLabColor(lab.status, selectedLab === lab.id)}
                >
                  <div className="text-center">
                    <span className="text-sm font-semibold block mb-1">{lab.name}</span>
                    <span className="text-xs opacity-75">{lab.occupancy} people</span>
                  </div>
                  {getStatusIcon(lab.status)}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
                <span className="font-medium">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded"></div>
                <span className="font-medium">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
                <span className="font-medium">Critical</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Lab Details */}
        <div className="lg:col-span-1">
          {selectedLabData && (
            <div className={`border rounded-lg p-6 h-full ${
              selectedLabData.status === 'critical' ? 'bg-red-50 border-red-200' :
              selectedLabData.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
              'bg-green-50 border-green-200'
            }`}>
              <h3 className={`font-semibold mb-6 text-xl ${
                selectedLabData.status === 'critical' ? 'text-red-900' :
                selectedLabData.status === 'warning' ? 'text-yellow-900' :
                'text-green-900'
              }`}>
                {selectedLabData.name} Details
              </h3>
              
              <div className="space-y-6">
                {/* Status Overview */}
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                    selectedLabData.status === 'critical' ? 'bg-red-100 text-red-800' :
                    selectedLabData.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedLabData.status}
                  </span>
                </div>

                {/* Sensor Readings */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Sensor Readings
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-gray-600">Temperature</span>
                      </div>
                      <span className="text-lg font-semibold">{selectedLabData.sensors.temp}</span>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <span className="text-sm text-gray-600">Smoke</span>
                      </div>
                      <span className="text-lg font-semibold">{selectedLabData.sensors.smoke}</span>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-600">CO₂</span>
                      </div>
                      <span className="text-lg font-semibold">{selectedLabData.sensors.co2}</span>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-purple-500" />
                        <span className="text-sm text-gray-600">Motion</span>
                      </div>
                      <span className={`text-lg font-semibold ${selectedLabData.sensors.motion ? 'text-green-600' : 'text-gray-400'}`}>
                        {selectedLabData.sensors.motion ? 'Detected' : 'None'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Environment & Safety */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Safety Info
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Humidity</span>
                      <span className="font-medium">{selectedLabData.humidity}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Occupancy</span>
                      <span className="font-medium">{selectedLabData.occupancy} people</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Fire Suppression</span>
                      <span className={`font-medium capitalize ${
                        selectedLabData.fireSuppression === 'active' ? 'text-red-600' :
                        selectedLabData.fireSuppression === 'standby' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {selectedLabData.fireSuppression}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Evacuation Route */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Evacuation Route</h4>
                  <p className="text-sm text-blue-800">{selectedLabData.evacuationRoute}</p>
                </div>

                {/* Last Alert */}
                {selectedLabData.lastAlert !== 'No recent alerts' && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Last Alert: {new Date(selectedLabData.lastAlert!).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};