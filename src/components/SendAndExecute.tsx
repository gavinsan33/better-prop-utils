import BlackContainer from "./BlackContainer"
import Button from "./Button"

interface SendAndExecuteProps{
    className?: string,
}

const SendAndExecute = ({className} : SendAndExecuteProps) => {
  return (
    <BlackContainer className={`h-80 flex flex-col items-center justify-around text-white ${className}`}>
        <Button color="green" className="font-semibold mx-10 text-black">SEND COMMAND</Button>

        <div className="self-start ml-8 space-y-2">
            <h1>Current State: UNKNOWN</h1>
            <h1>Last Message: UNKNOWN</h1>
            <h1>Available Pneumatic Pressure: N/A</h1>
        </div>

        <Button color="red" className="font-semibold mx-10 text-black">ONLINE SAFE</Button>
        <Button color="yellow" className="font-semibold mx-10 text-black">EXECUTE SEQUENCE</Button>
    </BlackContainer>
  )
}

export default SendAndExecute