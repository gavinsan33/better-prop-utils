import { useState } from "react";
import BlackContainer from "./BlackContainer"
import Button from "./Button"
import { useWebSocket } from "../context/WebSocketContext";

interface SendAndExecuteProps{
    className?: string,
}

const SendAndExecute = ({className} : SendAndExecuteProps) => {
  const [currentState, setCurrentState] = useState<string>("UNKNOWN");
  const [lastMessage, setLastMessage] = useState<string>("UNKNOWN");
  const [pneumaticPressure, setPneumaticPressure] = useState<string>("N/A");
  
  const { sendMessage, isConnected } = useWebSocket();

  const handleSendCommand = () => {
    if (!isConnected) {
      console.warn("WebSocket not connected. Cannot send command.");
      return;
    }
    
    // This is a placeholder command - modify as needed for your application
    const command = { 
      command: "SEND_COMMAND"
    };
    
    sendMessage(JSON.stringify(command));
    setLastMessage("SEND_COMMAND sent at " + new Date().toLocaleTimeString());
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
    setLastMessage("ONLINE_SAFE command sent at " + new Date().toLocaleTimeString());
  };

  const handleExecuteSequence = () => {
    if (!isConnected) {
      console.warn("WebSocket not connected. Cannot send command.");
      return;
    }
    
    const command = { 
      command: "START_SEQUENCE", 
      sequence: "defaultSequence" // Update with your actual sequence name or make this configurable
    };
    
    sendMessage(JSON.stringify(command));
    setLastMessage("EXECUTE_SEQUENCE sent at " + new Date().toLocaleTimeString());
  };

  return (
    <BlackContainer className={`w-1/3 h-80 flex flex-col items-center justify-around text-white ${className}`}>
        <Button onClick={handleSendCommand} color="green" className="font-semibold mx-10 text-black">SEND COMMAND</Button>

        <div className="self-start ml-8 space-y-2">
            <h1>Current State: {currentState}</h1>
            <h1>Last Message: {lastMessage}</h1>
            <h1>Available Pneumatic Pressure: {pneumaticPressure}</h1>
        </div>

        <Button onClick={handleOnlineSafe} color="red" className="font-semibold mx-10 text-black">ONLINE SAFE</Button>
        <Button onClick={handleExecuteSequence} color="yellow" className="font-semibold mx-10 text-black">EXECUTE SEQUENCE</Button>
    </BlackContainer>
  )
}

export default SendAndExecute