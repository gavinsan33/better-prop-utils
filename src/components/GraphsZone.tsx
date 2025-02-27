import { useState, useCallback } from "react";
import BlackContainer from "./BlackContainer";
import Graph, { getSensorColors } from "./Graph";
import GraphSelector from "./GraphSelector";
import DownloadButton from "./DownloadButton";
import NewSessionButton from "./NewSessionButton";
import { useSensorData } from "../hooks/useSensorData";

export default function GraphsZone() {
  const data = useSensorData().slice(-20);
  const [refreshKey, setRefreshKey] = useState(0); // Used to force refresh after new session
  
  // Filter out any undefined values from the returned colors
  const pressureColors = Object.fromEntries(
    Object.entries(getSensorColors('pressure')).filter(([_, v]) => v !== undefined)
  ) as Record<string, string>;
  
  const temperatureColors = Object.fromEntries(
    Object.entries(getSensorColors('temperature')).filter(([_, v]) => v !== undefined)
  ) as Record<string, string>;
  
  // Initialize 4 sets of visibility states for the 4 graphs
  const [tempVisibility1, setTempVisibility1] = useState<Record<string, boolean>>(
    Object.keys(temperatureColors).reduce((acc, sensor) => ({ ...acc, [sensor]: true }), {})
  );
  
  const [tempVisibility2, setTempVisibility2] = useState<Record<string, boolean>>(
    Object.keys(temperatureColors).reduce((acc, sensor) => ({ ...acc, [sensor]: true }), {})
  );
  
  const [pressureVisibility1, setPressureVisibility1] = useState<Record<string, boolean>>(
    Object.keys(pressureColors).reduce((acc, sensor) => ({ ...acc, [sensor]: true }), {})
  );
  
  const [pressureVisibility2, setPressureVisibility2] = useState<Record<string, boolean>>(
    Object.keys(pressureColors).reduce((acc, sensor) => ({ ...acc, [sensor]: true }), {})
  );
  
  // Toggle handler factories
  const createToggleHandler = (setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) => {
    return (sensor: string) => {
      setter(prev => ({
        ...prev,
        [sensor]: !prev[sensor]
      }));
    };
  };

  // Handle new session creation
  const handleNewSession = useCallback(() => {
    // Reset all states and trigger a refresh
    setTempVisibility1(
      Object.keys(temperatureColors).reduce((acc, sensor) => ({ ...acc, [sensor]: true }), {})
    );
    setTempVisibility2(
      Object.keys(temperatureColors).reduce((acc, sensor) => ({ ...acc, [sensor]: true }), {})
    );
    setPressureVisibility1(
      Object.keys(pressureColors).reduce((acc, sensor) => ({ ...acc, [sensor]: true }), {})
    );
    setPressureVisibility2(
      Object.keys(pressureColors).reduce((acc, sensor) => ({ ...acc, [sensor]: true }), {})
    );
    setRefreshKey(prev => prev + 1);
  }, [pressureColors, temperatureColors]);

  return (
    <BlackContainer className="h-auto mt-4 mb-20 flex flex-col p-4">
      <div className="grid grid-cols-2 gap-8">
        {/* First row: Temperature graphs */}
        <div className="flex flex-col">
          <h3 className="text-white text-center font-semibold mb-2">Temperature Data I</h3>
          <div className="bg-black/30 p-2 rounded mb-2">
            <Graph 
              graphType='temperature' 
              data={data} 
              visibleSensors={tempVisibility1}
            />
          </div>
          <div className="bg-black/40 p-3 rounded h-40">
            <GraphSelector 
              title="Active Sensors"
              sensors={Object.keys(temperatureColors)} 
              visibility={tempVisibility1}
              onToggle={createToggleHandler(setTempVisibility1)}
              colors={temperatureColors}
              className="h-full"
            />
          </div>
        </div>
        
        <div className="flex flex-col">
          <h3 className="text-white text-center font-semibold mb-2">Temperature Data II</h3>
          <div className="bg-black/30 p-2 rounded mb-2">
            <Graph 
              graphType='temperature' 
              data={data} 
              visibleSensors={tempVisibility2}
            />
          </div>
          <div className="bg-black/40 p-3 rounded h-40">
            <GraphSelector 
              title="Active Sensors"
              sensors={Object.keys(temperatureColors)} 
              visibility={tempVisibility2}
              onToggle={createToggleHandler(setTempVisibility2)}
              colors={temperatureColors}
              className="h-full"
            />
          </div>
        </div>
        
        {/* Second row: Pressure graphs */}
        <div className="flex flex-col">
          <h3 className="text-white text-center font-semibold mb-2">Pressure Data I</h3>
          <div className="bg-black/30 p-2 rounded mb-2">
            <Graph 
              graphType='pressure' 
              data={data} 
              visibleSensors={pressureVisibility1}
            />
          </div>
          <div className="bg-black/40 p-3 rounded h-40">
            <GraphSelector 
              title="Active Sensors"
              sensors={Object.keys(pressureColors)} 
              visibility={pressureVisibility1}
              onToggle={createToggleHandler(setPressureVisibility1)}
              colors={pressureColors}
              className="h-full"
            />
          </div>
        </div>
        
        <div className="flex flex-col">
          <h3 className="text-white text-center font-semibold mb-2">Pressure Data II</h3>
          <div className="bg-black/30 p-2 rounded mb-2">
            <Graph 
              graphType='pressure' 
              data={data} 
              visibleSensors={pressureVisibility2}
            />
          </div>
          <div className="bg-black/40 p-3 rounded h-40">
            <GraphSelector 
              title="Active Sensors"
              sensors={Object.keys(pressureColors)} 
              visibility={pressureVisibility2}
              onToggle={createToggleHandler(setPressureVisibility2)}
              colors={pressureColors}
              className="h-full"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mt-8">
        <NewSessionButton onNewSession={handleNewSession} />
        <DownloadButton />  
      </div>
    </BlackContainer>
  );
};

