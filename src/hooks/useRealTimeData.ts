import { useState, useEffect } from 'react';
import { SensorReading, DeviceHealth, SensorHealth } from '../types';

export const useRealTimeData = () => {
  const [sensorReadings, setSensorReadings] = useState<SensorReading[]>([]);
  const [deviceHealth, setDeviceHealth] = useState<DeviceHealth[]>([]);
  const [sensorHealthData, setSensorHealthData] = useState<SensorHealth[]>([
    { sensorId: 'TEMP-001', health: 98, status: 'Healthy' },
    { sensorId: 'SMOKE-007', health: 85, status: 'Healthy' },
    { sensorId: 'TEMP-004', health: 23, status: 'Faulty' },
    { sensorId: 'HUM-012', health: 67, status: 'Needs Attention' }
  ]);

  useEffect(() => {
    // Load initial data
    import('../data/live_sensor_readings.json').then(data => {
      setSensorReadings(data.default);
    });
    
    import('../data/device_health_monitor.json').then(data => {
      setDeviceHealth(data.default);
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update sensor readings
      setSensorReadings(prev => prev.map(reading => ({
        ...reading,
        Temperature: `${(Math.random() * 10 + 30).toFixed(1)}°C`,
        Humidity: `${Math.floor(Math.random() * 20 + 35)}%`,
        'Last Updated': new Date().toLocaleString('en-CA', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }).replace(',', '')
      })));

      // Occasionally update sensor health
      if (Math.random() > 0.8) {
        setSensorHealthData(prev => prev.map(sensor => ({
          ...sensor,
          health: Math.max(20, Math.min(100, sensor.health + (Math.random() - 0.5) * 5))
        })));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    sensorReadings,
    deviceHealth,
    sensorHealthData
  };
};