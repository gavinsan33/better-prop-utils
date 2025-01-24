import BlackContainer from "./BlackContainer"

interface ConsoleProps {
    className?: string,
}

const Console = ({className}: ConsoleProps) => {
  return (
    <BlackContainer className={`flex flex-row justify-around h-80 w-full text-white ${className}`}>
        <div className="flex flex-col justify-around">
          <h1>LC_01: 6750765.0000</h1>
          <h1>Chamber: -1474.0000</h1>
          <h1>FuelTank: -1319.0000</h1>
          <h1>N2Press: -1403.0000</h1>
          <h1>OxTank: -1325.0000</h1>
          <h1>Pneumatic: -1555.0000</h1>
        </div>

        <div className="flex flex-col justify-around">
          <h1>Venturi_1: -1654.0000</h1>
          <h1>Venturi_2: -1946.0000</h1>
          <h1>TC_01: 3.3402</h1>
          <h1>TC_02: 3.3402</h1>
          <h1>TC_03: 3.3402</h1>
          <h1>TC_04: 3.3402</h1>
        </div>

        <div className="self-start mt-3">
          <h1>boardTemp: -0.0625</h1>
        </div>


    </BlackContainer>
  )
}

export default Console