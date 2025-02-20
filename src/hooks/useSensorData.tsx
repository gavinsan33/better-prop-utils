import { useEffect, useState } from "react";
import { saveSensorData } from "../services/indexedDB";
import { SensorData } from "../types/SensorData";
import { useWebSocket } from "../context/WebSocketContext";

export const useSensorData = (): SensorData[] => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const { socket } = useWebSocket();

  useEffect(() => {
    if (!socket) return;

    const handleMessage = async (event: MessageEvent) => {
      const sensorValue = JSON.parse(event.data);
      await saveSensorData(sensorValue);
      setSensorData((prevData) => [...prevData, sensorValue]);
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  return sensorData;
};