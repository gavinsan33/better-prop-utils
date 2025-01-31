import BlackContainer from "./BlackContainer"
import Button from "./Button"

interface SendAndExecuteProps{
    className?: string,
    onClickSendCommand?: VoidFunction,
    onClickOnlineSafe?: VoidFunction,
    onClickExecuteSequence?: VoidFunction,
}

const SendAndExecute = ({className, onClickExecuteSequence=()=>{}, onClickOnlineSafe=()=>{}, onClickSendCommand=()=>{}} : SendAndExecuteProps) => {

  return (
    <BlackContainer className={`w-1/3 h-80 flex flex-col items-center justify-around text-white ${className}`}>
        <Button onClick={onClickSendCommand} color="green" className="font-semibold mx-10 text-black">SEND COMMAND</Button>

        <div className="self-start ml-8 space-y-2">
            <h1>Current State: UNKNOWN</h1>
            <h1>Last Message: UNKNOWN</h1>
            <h1>Available Pneumatic Pressure: N/A</h1>
        </div>

        <Button onClick={onClickOnlineSafe} color="red" className="font-semibold mx-10 text-black">ONLINE SAFE</Button>
        <Button onClick={onClickExecuteSequence} color="yellow" className="font-semibold mx-10 text-black">EXECUTE SEQUENCE</Button>
    </BlackContainer>
  )
}

export default SendAndExecute