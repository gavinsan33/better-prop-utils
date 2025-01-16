import Button from "./components/Button"
import SelectBox from "./components/Dropdown"

function App() {

  const printToConsole = () => {
    console.log("Button pressed")
  }

  return (
    <div className='bg-white min-h-screen text-black'>

    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <Button color="red" onClick={printToConsole}>HELLO</Button>
      <Button color="yellow" onClick={printToConsole}>HELLO</Button>
      <Button color="green" onClick={printToConsole}>HELLO</Button>
      <SelectBox size="large" options={["1", "2"]}/>
    </div>
    </div>
  )
}

export default App
