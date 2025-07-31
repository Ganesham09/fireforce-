export interface SensorReading {
  Zone: string;
  Temperature: string;
  'Smoke Level': string;
  Humidity: string;
  Status: string;
  'Last Updated': string;
}

export interface DeviceHealth {
  DeviceID: string;
  Battery: string;
  Status: string;
  SignalStrength: string;
}

export interface EventHistory {
  Timestamp: string;
  Zone: string;
  Event: string;
  Severity: string;
  Resolved: boolean;
}

export interface FireOrigin {
  Current_Alert: boolean;
  Origin: string;
  Time: string;
  Temperature: string;
  SmokeLevel: string;
  Status: string;
}

export interface FirmwareStatus {
  Device: string;
  Firmware: string;
  LastUpdate: string;
  Status: string;
}

export interface MaintenanceLog {
  date: string;
  type: string;
  technician: string;
  remarks: string;
}

export interface SensorHealth {
  sensorId: string;
  health: number;
  status: string;
}

export interface Zone {
  id: string;
  name: string;
  floor: string;
  active: boolean;
}