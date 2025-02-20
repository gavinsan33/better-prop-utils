import Spinner from "../assets/spinner.svg";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { SensorData } from "../types/SensorData";
import { useWebSocket } from "../context/WebSocketContext";
import { useRef } from "react";

type GraphProps = {
  data?: SensorData[];
  graphType: 'pressure' | 'temperature';
}

export default function Graph({ data, graphType}: GraphProps) {
  const isLoading = !useWebSocket().isConnected;
  const initialTimestampRef = useRef<number | null>(null);
  console.log(isLoading);

  const Loading = () => {
    return (
      <div className="w-12 h-12 motion-rotate-loop-[1turn]/reset z-10">
        <img src={Spinner} />
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

  const getLines = () => {
    if (graphType === 'pressure') {
      return (
        <>
        <Line type="monotone" dataKey="kerInletDucer" isAnimationActive={false} stroke="#ff0000" />
        <Line type="monotone" dataKey="kerPintleDucer" isAnimationActive={false} stroke="#00ff00" />
        <Line type="monotone" dataKey="kerTankDucer" isAnimationActive={false} stroke="#0000ff" />
        <Line type="monotone" dataKey="kerVenturi" isAnimationActive={false} stroke="#ff00ff" />
        <Line type="monotone" dataKey="loxInletDucer" isAnimationActive={false} stroke="#ffff00" />
        <Line type="monotone" dataKey="loxTankDucer" isAnimationActive={false} stroke="#00ffff" />
        <Line type="monotone" dataKey="loxVenturi" isAnimationActive={false} stroke="#ff8000" />
        <Line type="monotone" dataKey="pneumaticDucer" isAnimationActive={false} stroke="#ff0080" />
        <Line type="monotone" dataKey="purgeDucer" isAnimationActive={false} stroke="#80ff00" />
        </>
      ) 
    } else {
      return (
        <>
        <Line type="monotone" dataKey="manifoldInletThermo" isAnimationActive={false} stroke="#ff0000" />
        <Line type="monotone" dataKey="manifoldOutletThermo" isAnimationActive={false} stroke="#00ff00" />
        <Line type="monotone" dataKey="tank1Thermo" isAnimationActive={false} stroke="#0000ff" />
        <Line type="monotone" dataKey="tank2Thermo" isAnimationActive={false} stroke="#ff00ff" />
        <Line type="monotone" dataKey="tank3Thermo" isAnimationActive={false} stroke="#ffff00" />
        </>
      )
    }

  }

  return (
    <div className="relative">
      {(!data || isLoading) && (
        <div className="absolute inset-0 left-10 bottom-10 flex items-center justify-center flex-col text-white/80">
          <Loading />
          <h1 className="motion-preset-oscillate-sm">Loading Data...</h1>
        </div>
      )}
      <LineChart width={500} height={300} data={graphType === 'pressure' ? formatPressureData() : formatTemperatureData()} margin={{ right: 10, bottom: 7 }}>
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
          formatter={(value, name) => [`${value}`, name]} // Custom formatter for tooltip values
          labelFormatter={(label) => `Time: ${label} ms`} // Custom label formatter for tooltip
        />

        {getLines()}

      </LineChart>
    </div>
  );
}
