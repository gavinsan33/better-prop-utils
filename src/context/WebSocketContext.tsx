import React, { createContext, useContext, useState } from 'react';

interface WebSocketContextType {
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <WebSocketContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketConnection = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocketConnection must be used within a WebSocketProvider');
  }
  return context;
};