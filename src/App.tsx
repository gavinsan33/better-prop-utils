

import Logo from "./assets/aeronu.png";
import { StateDropdowns } from "./components/StateDropdowns";

function App() {

  return (
    <div className="bg-gradient-to-br to-black from-red-900 min-h-screen text-black">
      
      <div className="absolute top-0 left-5 flex items-center text-white font-extrabold text-3xl z-10">
        <img src={Logo} alt="Logo" className="w-32 h-32 brightness-0 invert" />
        <h1 className="ml-4 underline underline-offset-4">ENGINE DIAGNOSTICS PORTAL</h1>
      </div>

      <div className="flex justify-center items-center min-h-screen">
        <StateDropdowns />
      </div>

      
    </div>
  );
}

export default App;
