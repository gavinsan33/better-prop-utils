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

type GraphProps = {
  data?: SensorData[];
  isPressureGraph?: boolean;
}

export default function Graph({ data }: GraphProps) {
  const Loading = () => {
    return (
      <div className="w-12 h-12 motion-rotate-loop-[1turn]/reset z-10">
        <img src={Spinner} />
      </div>
    );
  };
  
  const formatPressureData = () => {
    return (
      data?.map(
        (sensordata: SensorData) => {
          const currTime = sensordata.timeStamp;
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

  return (
    <div className="relative">
      {!data && (
        <div className="absolute inset-0 left-10 bottom-10 flex items-center justify-center flex-col text-white/80">
          <Loading />
          <h1 className="motion-preset-oscillate-sm">Loading Data...</h1>
        </div>
      )}
      <LineChart width={500} height={300} data={formatPressureData()} margin={{ right: 10 }}>
        <CartesianGrid stroke="#bab6b6" />
        <XAxis
          dataKey="timestamp"
          stroke="#ffffff"
          type="number"
          domain={["dataMin", "dataMax"]}
          label={{
            value: "Time (ms)",
            position: "insideBottomRight",
            offset: -10,
            fill: "#ffffff",
          }}
        />
        <YAxis stroke="#ffffff"/>
        <Tooltip
          formatter={(value, name) => [`${value}`, name]} // Custom formatter for tooltip values
          labelFormatter={(label) => `Time: ${label} ms`} // Custom label formatter for tooltip
        />

        {/* {Object.keys(data?.[0] || {}).filter(key => key.startsWith('sensorReading')).map((key, index) => (
          <Line key={index} type="monotone" dataKey={key} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
        ))} */}
        <Line type="monotone" dataKey="kerInletDucer" isAnimationActive={false} stroke="#ff0000" />
        <Line type="monotone" dataKey="kerPintleDucer" isAnimationActive={false} stroke="#00ff00" />
        <Line type="monotone" dataKey="kerTankDucer" isAnimationActive={false} stroke="#0000ff" />
        <Line type="monotone" dataKey="kerVenturi" isAnimationActive={false} stroke="#ff00ff" />
        <Line type="monotone" dataKey="loxInletDucer" isAnimationActive={false} stroke="#ffff00" />
        <Line type="monotone" dataKey="loxTankDucer" isAnimationActive={false} stroke="#00ffff" />
        <Line type="monotone" dataKey="loxVenturi" isAnimationActive={false} stroke="#ff8000" />
        <Line type="monotone" dataKey="pneumaticDucer" isAnimationActive={false} stroke="#ff0080" />
        <Line type="monotone" dataKey="purgeDucer" isAnimationActive={false} stroke="#80ff00" />
  
        

      </LineChart>
    </div>
  );
}
