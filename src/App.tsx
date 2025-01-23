import Logo from "./assets/aeronu.png";
import { StateDropdowns } from "./components/StateDropdowns";
import Header from "./components/Header";
import SendAndExecute from "./components/SendAndExecute";
import Console from "./components/Console";
import BlackContainer from "./components/BlackContainer";

function App() {
  return (
    <div className="bg-gradient-to-br to-black from-red-900 min-h-screen text-black">
      <div className="absolute top-0 left-5 flex items-center text-white font-extrabold text-3xl z-10">
        <img src={Logo} alt="Logo" className="w-32 h-32 brightness-0 invert" />
        <h1 className="ml-4 underline underline-offset-4">
          ENGINE DIAGNOSTICS PORTAL
        </h1>
      </div>

      <div className="flex flex-col justify-center min-h-screen w-[94%] mx-auto">
        <Header className="" />
        <div className="flex flex-row items-center my-4 ">
          <SendAndExecute className="w-[33%]" />
          <Console className="ml-4 w-full"/>
        </div>
        <StateDropdowns/>
        <BlackContainer className="h-20 mt-4"> </BlackContainer>
      </div>
    </div>
  );
}

export default App;
