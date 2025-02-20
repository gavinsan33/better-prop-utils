import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface WebSocketContextType {
  isConnected: boolean;
  sendMessage: (message: any) => void;
  socket: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket("ws://localhost:9002");

      ws.onopen = () => {
        console.log("WebSocket connection established");
        setIsConnected(true);
      };

      ws.onclose = () => {
        console.log("WebSocket closed, attempting to reconnect...");
        setIsConnected(false);
        setTimeout(connectWebSocket, 500);
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
        setIsConnected(false);
      };

      socketRef.current = ws;
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = (message: any) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(JSON.stringify(message));
      console.log('Message sent:', message);
    } else {
      console.error('WebSocket is not connected');
    }
  };

  return (
    <WebSocketContext.Provider value={{ isConnected, sendMessage, socket: socketRef.current }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};