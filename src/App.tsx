import Logo from "./assets/aeronu.png";
import { StateDropdowns } from "./components/StateDropdowns";
import Header from "./components/Header";
import SendAndExecute from "./components/SendAndExecute";
import Console from "./components/SensorReadings";
import GraphsZone from "./components/GraphsZone";
import { WebSocketProvider } from "./context/WebSocketContext";
import { SelectionProvider } from "./context/SelectionContext";

export default function App() {
  return (
    <WebSocketProvider>
      <SelectionProvider>
        <div className="bg-gradient-to-br to-black from-red-900 min-h-screen text-black">
          <div className="relative flex items-center text-white font-extrabold text-3xl z-50 p-5">
            <img src={Logo} alt="Logo" className="w-32 h-32 brightness-0 invert" />
            <h1 className="ml-4 underline underline-offset-4">
              ENGINE DIAGNOSTICS PORTAL
            </h1>
          </div>
          <div className="flex flex-col min-h-screen w-[94%] mx-auto">
            <Header />
            <div className="flex flex-row items-center my-4 ">
              <SendAndExecute/>
              <Console className="ml-4"/>
            </div>
            <StateDropdowns/>
            <GraphsZone/>
          </div>
        </div>
      </SelectionProvider>
    </WebSocketProvider>
  );
}