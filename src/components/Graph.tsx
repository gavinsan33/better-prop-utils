import Spinner from "../assets/spinner.svg";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { SensorData } from "../types/SensorData";
import { useWebSocket } from "../context/WebSocketContext";
import { useRef } from "react";

type SensorVisibility = {
  [key: string]: boolean;
}

type GraphProps = {
  data?: SensorData[];
  graphType: 'pressure' | 'temperature';
  visibleSensors?: SensorVisibility;
}

export default function Graph({ data, graphType, visibleSensors = {} }: GraphProps) {
  const isLoading = !useWebSocket().isConnected;
  const initialTimestampRef = useRef<number | null>(null);

  const Loading = () => {
    return (
      <div className="w-12 h-12 motion-rotate-loop-[1turn]/reset z-10">
        <img src={Spinner} alt="Loading" />
      </div>
    );
  };

  const getRelativeTime = (timestamp: number, initialTimestamp: number) => {
    return (timestamp - initialTimestamp) / 1000;
  };

  const formatPressureData = () => {
    if (initialTimestampRef.current === null && data?.length) {
      initialTimestampRef.current = data[0].timeStamp;
    }
    const initialTimestamp = initialTimestampRef.current || 0;
    return (
      data?.map(
        (sensordata: SensorData) => {
          const currTime = getRelativeTime(sensordata.timeStamp, initialTimestamp);
          const pressureSensors = sensordata.data.pressureSensors;
          return (
            {
              kerInletDucer: pressureSensors.kerInletDucer.sensorReading,
              kerPintleDucer: pressureSensors.kerPintleDucer.sensorReading,
              kerTankDucer: pressureSensors.kerTankDucer.sensorReading,
              kerVenturi: pressureSensors.kerVenturi.sensorReading,
              loxInletDucer: pressureSensors.loxInletDucer.sensorReading,
              loxTankDucer: pressureSensors.loxTankDucer.sensorReading,
              loxVenturi: pressureSensors.loxVenturi.sensorReading,
              pneumaticDucer: pressureSensors.pneumaticDucer.sensorReading,
              purgeDucer: pressureSensors.purgeDucer.sensorReading,
              timestamp: currTime,
            }
          )
        }  
      )
    )
  }

  const formatTemperatureData = () => {
    if (initialTimestampRef.current === null && data?.length) {
      initialTimestampRef.current = data[0].timeStamp;
    }
    const initialTimestamp = initialTimestampRef.current || 0;
    return (
      data?.map(
        (sensordata: SensorData) => {
          const currTime = getRelativeTime(sensordata.timeStamp, initialTimestamp);
          const temperatureSensors = sensordata.data.tempSensors
          return (
            {
              manifoldInletThermo: temperatureSensors.manifoldInletThermo.sensorReading,
              manifoldOutletThermo: temperatureSensors.manifoldOutletThermo.sensorReading,
              tank1Thermo: temperatureSensors.tank1Thermo.sensorReading,
              tank2Thermo: temperatureSensors.tank2Thermo.sensorReading,
              tank3Thermo: temperatureSensors.tank3Thermo.sensorReading,
              timestamp: currTime,
            }
          )
        }  
      )
    )
  }

  const pressureColors = {
    kerInletDucer: "#ff0000",
    kerPintleDucer: "#00ff00", 
    kerTankDucer: "#0000ff",
    kerVenturi: "#ff00ff",
    loxInletDucer: "#ffff00",
    loxTankDucer: "#00ffff",
    loxVenturi: "#ff8000",
    pneumaticDucer: "#ff0080",
    purgeDucer: "#80ff00"
  };

  const temperatureColors = {
    manifoldInletThermo: "#ff0000",
    manifoldOutletThermo: "#00ff00",
    tank1Thermo: "#0000ff",
    tank2Thermo: "#ff00ff",
    tank3Thermo: "#ffff00",
  };

  const getLines = () => {
    if (graphType === 'pressure') {
      return Object.entries(pressureColors).map(([key, color]) => {
        // Skip if this sensor is explicitly set to not visible
        if (visibleSensors[key] === false) {
          return null;
        }
        return (
          <Line 
            key={key}
            type="monotone" 
            dataKey={key} 
            isAnimationActive={false} 
            stroke={color} 
          />
        );
      });
    } else {
      return Object.entries(temperatureColors).map(([key, color]) => {
        // Skip if this sensor is explicitly set to not visible
        if (visibleSensors[key] === false) {
          return null;
        }
        return (
          <Line 
            key={key}
            type="monotone" 
            dataKey={key} 
            isAnimationActive={false} 
            stroke={color} 
          />
        );
      });
    }
  }

  return (
    <div className="relative w-full">
      {(!data || isLoading) && (
        <div className="absolute inset-0 flex items-center justify-center flex-col text-white/80 z-10">
          <Loading />
          <h1 className="motion-preset-oscillate-sm">Loading Data...</h1>
        </div>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart 
          data={graphType === 'pressure' ? formatPressureData() : formatTemperatureData()} 
          margin={{ right: 10, left: -20, bottom: 5, top: 5 }}
        >
          <CartesianGrid stroke="#bab6b6" />
          <XAxis
            dataKey="timestamp"
            stroke="#ffffff"
            type="number"
            domain={["dataMin", "dataMax"]}
            label={{
              value: "Time (s)",
              position: "insideBottomRight",
              offset: -5,
              fill: "#ffffff",
            }}
          />
          <YAxis stroke="#ffffff"/>
          <Tooltip
            formatter={(value, name) => [`${value}`, name]} 
            labelFormatter={(label) => `Time: ${label} s`}
          />

          {getLines()}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export const getSensorColors = (graphType: 'pressure' | 'temperature') => {
  if (graphType === 'pressure') {
    return {
      kerInletDucer: "#ff0000",
      kerPintleDucer: "#00ff00", 
      kerTankDucer: "#0000ff",
      kerVenturi: "#ff00ff",
      loxInletDucer: "#ffff00",
      loxTankDucer: "#00ffff",
      loxVenturi: "#ff8000",
      pneumaticDucer: "#ff0080",
      purgeDucer: "#80ff00"
    };
  } else {
    return {
      manifoldInletThermo: "#ff0000",
      manifoldOutletThermo: "#00ff00",
      tank1Thermo: "#0000ff",
      tank2Thermo: "#ff00ff",
      tank3Thermo: "#ffff00",
    };
  }
};
