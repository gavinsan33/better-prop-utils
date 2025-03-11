import { useState, useEffect } from "react";
import BlackContainer from "./BlackContainer";
import Button from "./Button";
import { useWebSocket } from "../context/WebSocketContext";
import { useSelection } from "../context/SelectionContext";

interface SendAndExecuteProps {
    className?: string,
}

const SendAndExecute = ({className} : SendAndExecuteProps) => {
  const [currentState, setCurrentState] = useState<string>("UNKNOWN");
  const [lastMessage, setLastMessage] = useState<string>("UNKNOWN");
  const [pneumaticPressure, setPneumaticPressure] = useState<string>("N/A");
  const [lastSentAt, setLastSentAt] = useState<string | null>(null);
  
  const { sendMessage, isConnected, socket } = useWebSocket();
  const { getSelectedCommand, getSelectedSequence, sequencesEnabled } = useSelection();

  // Listen for data updates to update pneumatic pressure and state
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        
        // Update pneumatic pressure if available
        if (data.data?.pressureSensors?.pneumaticDucer) {
          const reading = data.data.pressureSensors.pneumaticDucer;
          setPneumaticPressure(`${reading.sensorReading.toFixed(2)} ${reading.unit}`);
        }
        
        // Update state information
        if (data.currentState) {
          setCurrentState(data.currentState);
        }
        
        // Update last message
        if (data.command === 'MESSAGE') {
          setLastMessage(data.statement);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    socket.addEventListener('message', handleMessage);
    return () => socket.removeEventListener('message', handleMessage);
  }, [socket]);

  const updateLastSentTime = () => {
    const now = new Date();
    setLastSentAt(now.toLocaleTimeString());
  };

  const handleSendCommand = () => {
    if (!isConnected) {
      console.warn("WebSocket not connected. Cannot send command.");
      return;
    }
    
    const selectedCommand = getSelectedCommand();
    if (!selectedCommand) {
      console.warn("No command selected");
      return;
    }
    
    const command = { 
      command: "SET_STATE", 
      newState: selectedCommand 
    };
    
    sendMessage(JSON.stringify(command));
    setLastMessage(`Sent command: ${selectedCommand}`);
    updateLastSentTime();
  };

  const handleOnlineSafe = () => {
    if (!isConnected) {
      console.warn("WebSocket not connected. Cannot send command.");
      return;
    }
    
    const command = { 
      command: "SET_STATE", 
      newState: "ONLINE_SAFE_D" 
    };
    
    sendMessage(JSON.stringify(command));
    setCurrentState("ONLINE_SAFE");
    setLastMessage("ONLINE_SAFE command sent");
    updateLastSentTime();
  };

  const handleExecuteSequence = () => {
    if (!isConnected) {
      console.warn("WebSocket not connected. Cannot send command.");
      return;
    }
    
    if (!sequencesEnabled) {
      alert("Sequences are not enabled. Please enable sequences first.");
      return;
    }
    
    const selectedSequence = getSelectedSequence();
    if (!selectedSequence) {
      console.warn("No sequence selected");
      return;
    }
    
    const command = { 
      command: "START_SEQUENCE", 
      sequence: selectedSequence
    };
    
    sendMessage(JSON.stringify(command));
    setLastMessage(`Started sequence: ${selectedSequence}`);
    updateLastSentTime();
  };

  return (
    <BlackContainer className={`w-1/3 h-80 flex flex-col items-center justify-around text-white ${className}`}>
        <Button 
          onClick={handleSendCommand} 
          color="green" 
          className="font-semibold mx-10 text-black"
          disabled={!isConnected}
        >
          SEND COMMAND
        </Button>

        <div className="self-start ml-8 space-y-2">
            <h1>Current State: {currentState}</h1>
            <h1>Last Message: {lastMessage}</h1>
            <h1>Available Pneumatic Pressure: {pneumaticPressure}</h1>
            {lastSentAt && <h1>Last sent at: {lastSentAt}</h1>}
        </div>

        <Button 
          onClick={handleOnlineSafe} 
          color="red" 
          className="font-semibold mx-10 text-black"
          disabled={!isConnected}
        >
          ONLINE SAFE
        </Button>
        
        <Button 
          onClick={handleExecuteSequence} 
          color="yellow" 
          className="font-semibold mx-10 text-black"
          disabled={!isConnected || !sequencesEnabled}
        >
          EXECUTE SEQUENCE
        </Button>
    </BlackContainer>
  );
};

export default SendAndExecute;