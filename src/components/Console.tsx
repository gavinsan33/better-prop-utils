import BlackContainer from "./BlackContainer"

interface ConsoleProps {
    className?: string,
}

const Console = ({className}: ConsoleProps) => {
  return (
    <BlackContainer className={`h-80 w-full ${className}`}>
        <h1>empty</h1>
    </BlackContainer>
  )
}

export default Console