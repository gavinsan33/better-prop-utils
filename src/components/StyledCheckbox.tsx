
interface StyledCheckbox {
  className?: string,
  children?: React.ReactNode,

}

const StyledCheckbox = ({children, className}: StyledCheckbox) => {
  return (
    <div className={`rounded-2xl bg-gradient-to-bl from-red-400 to-red-800 px-4 py-3 flex flex-row text-white items-center ${className}`}>
      <h1 className="mr-3">{children}</h1>
      <input type="checkbox" className="w-4 h-4"></input>
    </div>
  )
}

export default StyledCheckbox