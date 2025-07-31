import React from 'react';
import { MapPin, Building, Layers, CheckCircle, AlertTriangle } from 'lucide-react';
import { Zone } from '../../types';

interface ZoneListPanelProps {
  selectedZone: string | null;
  onZoneSelect: (zone: string | null) => void;
}

export const ZoneListPanel: React.FC<ZoneListPanelProps> = ({ selectedZone, onZoneSelect }) => {
  const zones: Zone[] = [
    { id: 'Lab A', name: 'Lab A', floor: '2nd Floor', active: true },
    { id: 'Lab B', name: 'Lab B', floor: '2nd Floor', active: false },
    { id: 'Lab C', name: 'Lab C', floor: '2nd Floor', active: true },
    { id: 'Server Room', name: 'Server Room', floor: '1st Floor', active: true },
    { id: 'Storage Room', name: 'Storage Room', floor: '1st Floor', active: true }
  ];

  const floors = Array.from(new Set(zones.map(zone => zone.floor)));
  const activeZones = zones.filter(zone => zone.active).length;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Zone Monitor</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>{activeZones}/{zones.length} zones active</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* All Zones Button */}
        <button
          onClick={() => onZoneSelect(null)}
          className={`w-full mb-6 p-3 rounded-lg border transition-all ${
            selectedZone === null
              ? 'bg-blue-50 border-blue-200 text-blue-900'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">All Zones</div>
              <div className="text-sm opacity-75">View all monitoring data</div>
            </div>
          </div>
        </button>

        {/* Zones by Floor */}
        {floors.map(floor => (
          <div key={floor} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Building className="w-4 h-4 text-gray-500" />
              <h3 className="font-medium text-gray-900">{floor}</h3>
            </div>
            
            <div className="space-y-2">
              {zones
                .filter(zone => zone.floor === floor)
                .map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => onZoneSelect(zone.id)}
                    className={`w-full p-3 rounded-lg border transition-all ${
                      selectedZone === zone.id
                        ? 'bg-blue-50 border-blue-200 text-blue-900'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-medium">{zone.name}</div>
                          <div className="text-sm opacity-75">
                            {zone.active ? 'Monitoring active' : 'Offline'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {zone.active ? (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Quick Stats</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Zones</span>
              <span className="font-medium text-gray-900">{zones.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active</span>
              <span className="font-medium text-green-700">{activeZones}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Offline</span>
              <span className="font-medium text-red-700">{zones.length - activeZones}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};