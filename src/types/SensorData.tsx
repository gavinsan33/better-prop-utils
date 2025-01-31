interface SensorData {
  command: string;
  currentState: string;
  data: Data;
  engineSequence: string;
  recordedAbort: string;
  timeStamp: number;
  vehicleConfig: string;
}

interface Data {
  loadCellSensors: LoadCellSensors;
  pressureSensors: PressureSensors;
  tempSensors: TempSensors;
  valves: Valves;
}

interface Valves {
  kerDrip: Valve;
  kerFlow: Valve;
  kerPressurant: Valve;
  kerPurge: Valve;
  kerVent: Valve;
  loxDrip: Valve;
  loxFlow: Valve;
  loxPressurant: Valve;
  loxPurge: Valve;
  loxVent: Valve;
}

interface Valve {
  timeStamp: number;
  valveState: string;
}

interface TempSensors {
  manifoldInletThermo: UnitSensor;
  manifoldOutletThermo: UnitSensor;
  tank1Thermo: UnitSensor;
  tank2Thermo: UnitSensor;
  tank3Thermo: UnitSensor;
}

interface PressureSensors {
  kerInletDucer: UnitSensor;
  kerPintleDucer: UnitSensor;
  kerTankDucer: UnitSensor;
  kerVenturi: UnitSensor;
  loxInletDucer: UnitSensor;
  loxTankDucer: UnitSensor;
  loxVenturi: UnitSensor;
  pneumaticDucer: UnitSensor;
  purgeDucer: UnitSensor;
}

interface LoadCellSensors {
  loadCell: UnitSensor;
}

interface UnitSensor {
  sensorReading: number;
  timeStamp: number;
  unit: string;
}

export type {
    SensorData,
    Data,
    Valves,
    Valve,
    TempSensors,
    PressureSensors,
    LoadCellSensors,
    UnitSensor,
};