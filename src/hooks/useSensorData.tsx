import { useEffect, useState } from "react";
import { saveSensorData, getSessionId } from "../services/indexedDB";
import { SensorData } from "../types/SensorData";
import { useWebSocket } from "../context/WebSocketContext";

export const useSensorData = (): SensorData[] => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const { socket } = useWebSocket();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Check for session ID changes
  useEffect(() => {
    const checkSession = async () => {
      const sessionId = await getSessionId();
      const storedSessionId = sessionStorage.getItem("sessionId");
      
      // If session has changed, clear data
      if (storedSessionId && currentSessionId && storedSessionId !== currentSessionId) {
        setSensorData([]);
      }
      
      setCurrentSessionId(storedSessionId);
    };
    
    checkSession();
    
    // Poll for session changes every 5 seconds
    const interval = setInterval(checkSession, 5000);
    return () => clearInterval(interval);
  }, [currentSessionId]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = async (event: MessageEvent) => {
      const sensorValue = JSON.parse(event.data);
      await saveSensorData(sensorValue);
      
      // Only update state if still on the same session
      if (currentSessionId === sessionStorage.getItem("sessionId")) {
        setSensorData((prevData) => [...prevData, sensorValue]);
      }
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, currentSessionId]);

  return sensorData;
};