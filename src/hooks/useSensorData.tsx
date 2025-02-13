import { useEffect, useState } from "react";
import {
  saveSensorData,
} from "../services/indexedDB";
import { SensorData } from "../types/SensorData";
import { useWebSocketConnection } from "../context/WebSocketContext";



export const useSensorData = (): SensorData[] => {
  const [sensorData, setSensorData] = useState<any[]>([]);
  const { setIsConnected } = useWebSocketConnection();

  useEffect(() => {

    let socket: WebSocket;
    const connectWebSocket = () => {
      socket = new WebSocket("ws://localhost:9002");

      socket.onopen = () => {
        console.log("WebSocket connection established");
        setIsConnected(true);
      };

      socket.onmessage = async (event) => {
        const sensorValue = JSON.parse(event.data);
        await saveSensorData(sensorValue);

        setSensorData((prevData) => [...prevData, sensorValue])
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
        setIsConnected(false);
      };

      socket.onclose = () => {
        console.log("WebSocket closed, attempting to reconnect...");
        setIsConnected(false);
        setTimeout(connectWebSocket, 500); // Reconnect after .5 second
      };
    };

    connectWebSocket();

    return () => socket.close(); // Cleanup on unmount
  }, []);

  return sensorData;
};