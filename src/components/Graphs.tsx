import { LineChart } from "@mui/x-charts/LineChart";
import BlackContainer from "./BlackContainer";

const Graphs = () => {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];

  const customStyling = {
    //change left yAxis label styles
    "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
      strokeWidth: "1",
      fill: "#ffffff",
    },
    // change bottom label styles
    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
      strokeWidth: "1",
      fill: "#ffffff",
    },
    // bottomAxis Line Styles
    "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
      stroke: "#ffffff",
      strokeWidth: 1,
    },
    // leftAxis Line Styles
    "& .MuiChartsAxis-left .MuiChartsAxis-line": {
      stroke: "#ffffff",
      strokeWidth: 1,
    },
    // Tick marks styles
    "& .MuiChartsAxis-tick": {
      stroke: "#ffffff",
    },
  };

  return (
    <BlackContainer className="h-auto mt-4 mb-20">
      <div className="flex flex-row">
        <LineChart
          width={500}
          height={300}
          series={[
            { data: pData, label: "pv" },
            { data: uData, label: "uv" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          sx={customStyling}
        />
        <LineChart
          width={500}
          height={300}
          series={[
            { data: pData, label: "pv" },
            { data: uData, label: "uv" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          sx={customStyling}
        />
      </div>
      <div className="flex flex-row items-center">
        <LineChart
          width={500}
          height={300}
          series={[
            { data: pData, label: "pv" },
            { data: uData, label: "uv" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          sx={customStyling}
        />
        <LineChart
          width={500}
          height={300}
          series={[
            { data: pData, label: "pv" },
            { data: uData, label: "uv" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          sx={customStyling}
        />
      </div>
    </BlackContainer>
  );
};

export default Graphs;
