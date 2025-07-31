import React, { useState, useEffect } from 'react';
import { LogOut,  Shield, AlertTriangle,  Plus, Users, Clock } from 'lucide-react';
import { LiveSensorReadings } from './dashboard/LiveSensorReadings';
import { DeviceHealthMonitor } from './dashboard/DeviceHealthMonitor';
import { EventHistoryLog } from './dashboard/EventHistoryLog';
import { FireOriginMap } from './dashboard/FireOriginMap';
import { FirmwareStatus } from './dashboard/FirmwareStatus';
import { MaintenanceLogs } from './dashboard/MaintenanceLogs';
import { SensorHealthOverview } from './dashboard/SensorHealthOverview';
import { ZoneListPanel } from './dashboard/ZoneListPanel';
import { useRealTimeData } from '../hooks/useRealTimeData';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { sensorReadings, deviceHealth, sensorHealthData } = useRealTimeData();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeAlerts = 1; // Fixed to show only 1 alert

  const handleGenerateAlert = () => {
    // Admin alert generation functionality
    alert('Alert generation feature - Admin access required');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header - Fixed at top */}
      <header className="bg-white shadow-lg border-b border-gray-200 flex-shrink-0">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">FireForce Safety Dashboard</h1>
                  <p className="text-sm text-gray-600">Advanced Fire Safety Monitoring System</p>
                </div>
              </div>
              
              {activeAlerts > 0 && (
                <div className="flex items-center gap-3 px-4 py-2 bg-red-100 rounded-full border border-red-200">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-semibold text-red-700">
                    {activeAlerts} Active Alert{activeAlerts !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Admin Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Live</span>
                </div>

                {/* Generate Alert Button */}
                <button
                  onClick={handleGenerateAlert}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Alert</span>
                </button>

                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Flex container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed width, static */}
        <div className="w-80 bg-white shadow-sm border-r border-gray-200 flex-shrink-0 overflow-y-auto">
          <ZoneListPanel selectedZone={selectedZone} onZoneSelect={setSelectedZone} />
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {/* Live Sensor Readings */}
              <div className="xl:col-span-2">
                <LiveSensorReadings 
                  data={sensorReadings} 
                  selectedZone={selectedZone} 
                />
              </div>

              {/* Device Health Monitor */}
              <div>
                <DeviceHealthMonitor data={deviceHealth} />
              </div>

              {/* Fire Origin Map */}
              <div className="xl:col-span-3">
                <FireOriginMap />
              </div>

              {/* Sensor Health Overview */}
              <div className="xl:col-span-3">
                <SensorHealthOverview data={sensorHealthData} />
              </div>

              {/* Event History Log and Firmware Status */}
              <div className="xl:col-span-2">
                <EventHistoryLog selectedZone={selectedZone} />
              </div>

              {/* Firmware Status */}
              <div>
                <FirmwareStatus />
              </div>

              {/* Maintenance Logs */}
              <div className="xl:col-span-3">
                <MaintenanceLogs />
              </div>
            </div>
          </div>

          {/* Footer - Fixed at bottom of main content */}
          <footer className="bg-white border-t border-gray-200 flex-shrink-0">
            <div className="px-8 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">FireForce Safety System</span>
                      <span className="text-sm text-gray-600 ml-2">v2.1.3</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>© 2025 FireForce Safety Solutions</span>
                    <span>•</span>
                    <span>Emergency: 911</span>
                    <span>•</span>
                    <span>Support: +1-800-FIRE-911</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">All Systems Operational</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Last Updated: {currentTime.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};