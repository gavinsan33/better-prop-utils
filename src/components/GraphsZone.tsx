import BlackContainer from "./BlackContainer";
import Graph from "./Graph";
import { useSensorData } from "../hooks/useSensorData";

export default function GraphsZone() {

  const data = useSensorData().slice(-20);

  return (
    <BlackContainer className="h-auto mt-4 mb-20 flex flex-col">
      <div className="flex flex-row my-5 justify-around">
        <Graph graphType='pressure' data={data}/>
        <Graph graphType='pressure' data={data}/>
      </div>
      <div className="flex flex-row my-5 justify-around">
        <Graph graphType='temperature' data={data}/>
        <Graph graphType='temperature' data={data}/>
      </div>
    </BlackContainer>
  );
};

