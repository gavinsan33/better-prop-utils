import { useEffect, useState } from "react";
import {
  saveSensorData,
  getCurrentSessionData,
} from "../services/indexedDB";
import dummyData from "../data/test/DUMMY_DATA.json";
import { SensorData } from "../types/SensorData";

const TESTING = true;

export const useSensorData = (): SensorData[] => {
  const [sensorData, setSensorData] = useState<any[]>([]);

  useEffect(() => {
    if (TESTING) {
      const interval = setInterval(async () => {
        await saveSensorData(dummyData);
        const copyData = JSON.parse(JSON.stringify(dummyData));
        copyData.timeStamp = Date.now(); 
        // add random value to the sensor data
        copyData.data.pressureSensors.kerInletDucer.sensorReading = Math.random() * 10;
        copyData.data.pressureSensors.kerPintleDucer.sensorReading = Math.random() * 10;
        copyData.data.pressureSensors.kerTankDucer.sensorReading = Math.random() * 10;
        copyData.data.pressureSensors.kerVenturi.sensorReading = Math.random() * 10;
        copyData.data.pressureSensors.loxInletDucer.sensorReading = Math.random() * 10;
        copyData.data.pressureSensors.loxTankDucer.sensorReading = Math.random() * 10;
        copyData.data.pressureSensors.loxVenturi.sensorReading = Math.random() * 10;
        copyData.data.pressureSensors.pneumaticDucer.sensorReading = Math.random() * 10;
        copyData.data.pressureSensors.purgeDucer.sensorReading = Math.random() * 10;

        setSensorData((prevData) => [...prevData, copyData]);
      }, 1000);

      return () => clearInterval(interval);
    }

    const socket = new WebSocket("ws://localhost:9002");

    socket.onmessage = async (event) => {
      const sensorValue = JSON.parse(event.data).value;
      await saveSensorData(sensorValue);

      const allData = await getCurrentSessionData();
      setSensorData(allData.map((entry) => entry.data));
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => socket.close(); // Cleanup on unmount
  }, []);

  return sensorData;
};
