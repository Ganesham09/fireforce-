import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle, XCircle, Wrench, Clock, Zap, Shield, TrendingUp, Battery } from 'lucide-react';
import { SensorHealth } from '../../types';

interface SensorHealthOverviewProps {
  data: SensorHealth[];
}

interface ExtendedSensorHealth extends SensorHealth {
  lastMaintenance: string;
  nextMaintenance: string;
  uptime: number;
  batteryLevel: number;
  signalStrength: 'strong' | 'medium' | 'weak';
  temperature: number;
  humidity: number;
}

export const SensorHealthOverview: React.FC<SensorHealthOverviewProps> = ({ data }) => {
  const [extendedData, setExtendedData] = useState<ExtendedSensorHealth[]>([]);

  // Generate clean, stable data that updates every 1-1.5 minutes
  useEffect(() => {
    const generateCleanData = () => {
      return data.map((sensor, index) => ({
        ...sensor,
        lastMaintenance: new Date(Date.now() - (30 + Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        nextMaintenance: new Date(Date.now() + (15 + Math.random() * 45) * 24 * 60 * 60 * 1000).toISOString(),
        uptime: Math.round(85 + Math.random() * 15),
        batteryLevel: Math.round(20 + Math.random() * 80),
        signalStrength: ['strong', 'medium', 'weak'][Math.floor(Math.random() * 3)] as 'strong' | 'medium' | 'weak',
        temperature: Math.round(20 + Math.random() * 15),
        humidity: Math.round(30 + Math.random() * 50)
      }));
    };

    // Set initial data
    setExtendedData(generateCleanData());

    // Update data every 1-1.5 minutes (90 seconds)
    const interval = setInterval(() => {
      setExtendedData(generateCleanData());
    }, 90000);

    return () => clearInterval(interval);
  }, [data]);

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600';
    if (health >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBarColor = (health: number) => {
    if (health >= 80) return 'bg-green-500';
    if (health >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy': return CheckCircle;
      case 'needs attention': return AlertTriangle;
      case 'faulty': return XCircle;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'needs attention': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'faulty': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSignalColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'weak': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level >= 60) return 'text-green-600';
    if (level >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Clean percentage formatting
  const formatPercentage = (value: number) => {
    return Math.round(value * 10) / 10; // Round to 1 decimal place
  };

  const healthyCount = extendedData.filter(sensor => sensor.status === 'Healthy').length;
  const averageHealth = Math.round(extendedData.reduce((sum, sensor) => sum + sensor.health, 0) / extendedData.length);
  const needsMaintenance = extendedData.filter(sensor => 
    new Date(sensor.nextMaintenance) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-900">Sensor Health</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">{healthyCount}/{extendedData.length} Healthy</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            <span>{needsMaintenance} need maintenance</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>{averageHealth}% avg health</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Overall Health Summary */}
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium text-gray-700">Overall System Health</span>
            <span className={`text-3xl font-bold ${getHealthColor(averageHealth)}`}>
              {averageHealth}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${getHealthBarColor(averageHealth)}`}
              style={{ width: `${averageHealth}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-4 gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{healthyCount}</div>
              <div className="text-gray-600">Healthy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{extendedData.filter(s => s.status === 'Needs Attention').length}</div>
              <div className="text-gray-600">Warning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{extendedData.filter(s => s.status === 'Faulty').length}</div>
              <div className="text-gray-600">Faulty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{needsMaintenance}</div>
              <div className="text-gray-600">Maintenance</div>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Avg Uptime</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {Math.round(extendedData.reduce((sum, s) => sum + s.uptime, 0) / extendedData.length)}%
            </span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Avg Battery</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {Math.round(extendedData.reduce((sum, s) => sum + s.batteryLevel, 0) / extendedData.length)}%
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Avg Signal</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {Math.round(extendedData.filter(s => s.signalStrength === 'strong').length / extendedData.length * 100)}%
            </span>
          </div>
        </div>

        {/* Maintenance Alerts */}
        {needsMaintenance > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-900">Maintenance Required</h4>
            </div>
            <p className="text-sm text-yellow-800">
              {needsMaintenance} sensor{needsMaintenance !== 1 ? 's' : ''} need{needsMaintenance !== 1 ? '' : 's'} maintenance within 7 days
            </p>
          </div>
        )}

        {/* Individual Sensors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {extendedData.map((sensor, index) => {
            const StatusIcon = getStatusIcon(sensor.status);
            const isMaintenanceDue = new Date(sensor.nextMaintenance) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-600" />
                    <h3 className="font-medium text-gray-900">{sensor.sensorId}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(sensor.status)}`}>
                    {sensor.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Health Score */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Health Score</span>
                      <span className={`text-sm font-medium ${getHealthColor(sensor.health)}`}>
                        {formatPercentage(sensor.health)}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getHealthBarColor(sensor.health)}`}
                        style={{ width: `${sensor.health}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Sensor Details */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Battery className="w-3 h-3" />
                    <span className={`${getBatteryColor(sensor.batteryLevel)}`}>{sensor.batteryLevel}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span className={`${getSignalColor(sensor.signalStrength)}`}>{sensor.signalStrength}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-gray-600">{sensor.uptime}%</span>
                  </div>
                </div>

                {/* Alerts */}
                {(sensor.status !== 'Healthy' || isMaintenanceDue) && (
                  <div className="mt-3 flex items-center gap-2 p-2 bg-yellow-50 rounded-md">
                    <StatusIcon className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-700">
                      {sensor.status === 'Faulty' ? 'Requires immediate attention' : 
                       isMaintenanceDue ? 'Maintenance due soon' : 'Schedule maintenance'}
                    </span>
                  </div>
                )}

                {/* Maintenance Info */}
                <div className="mt-2 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Last: {new Date(sensor.lastMaintenance).toLocaleDateString()}</span>
                    <span>Next: {new Date(sensor.nextMaintenance).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};