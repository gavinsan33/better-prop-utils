import { useSensorData } from "../hooks/useSensorData";
import BlackContainer from "./BlackContainer";

interface SensorReadingsProps {
  className?: string;
}

const SensorReadings = ({ className }: SensorReadingsProps) => {
  const sensorData = useSensorData();
  const latestData = sensorData.length > 0 ? sensorData[sensorData.length - 1] : null;
  
  const formatValue = (value: number) => value.toFixed(4);

  const renderSensorReading = (key: string, sensor: any, index: number) => {
    const isHighValue = sensor.sensorReading > 300;
    const isLowValue = sensor.sensorReading < 0;
    
    return (
      <div 
        key={key} 
        className={`mb-3 p-1.5 rounded transition-all duration-200 ${
          isHighValue ? 'bg-red-900/30' : 
          isLowValue ? 'bg-blue-900/30' : ''
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="font-medium">{key}:</span>
          <span className={`font-mono ${
            isHighValue ? 'text-red-400' : 
            isLowValue ? 'text-blue-400' : 'text-green-300'
          }`}>
            {formatValue(sensor.sensorReading)}
            <span className="text-xs ml-1 opacity-70">{sensor.unit}</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <BlackContainer className={`h-80 w-full text-white ${className}`}>
      {!latestData ? (
        <div className="flex items-center justify-center w-full h-full">
          <h1 className="motion-preset-oscillate-sm text-xl">
            Waiting for sensor data<span className="animate-pulse">...</span>
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 h-full w-full p-4">
          {/* Pressure sensors - column 1 */}
          <div className="flex flex-col">
            <h2 className="text-center mb-3 pb-1 font-bold text-yellow-400 border-b border-yellow-900/50">
              Pressure Sensors I
            </h2>
            <div className="overflow-auto pr-2 space-y-1">
              {Object.entries(latestData.data.pressureSensors)
                .slice(0, 4)
                .map(([key, sensor], index) => renderSensorReading(key, sensor, index))}
            </div>
          </div>
          
          {/* Pressure sensors - column 2 */}
          <div className="flex flex-col">
            <h2 className="text-center mb-3 pb-1 font-bold text-yellow-400 border-b border-yellow-900/50">
              Pressure Sensors II
            </h2>
            <div className="overflow-auto pr-2 space-y-1">
              {Object.entries(latestData.data.pressureSensors)
                .slice(4)
                .map(([key, sensor], index) => renderSensorReading(key, sensor, index))}
            </div>
          </div>
          
          {/* Temperature sensors */}
          <div className="flex flex-col">
            <h2 className="text-center mb-3 pb-1 font-bold text-blue-400 border-b border-blue-900/50">
              Temperature Sensors
            </h2>
            <div className="overflow-auto pr-2 space-y-1">
              {Object.entries(latestData.data.tempSensors)
                .map(([key, sensor], index) => renderSensorReading(key, sensor, index))}
            </div>
          </div>
        </div>
      )}
    </BlackContainer>
  );
};

export default SensorReadings;