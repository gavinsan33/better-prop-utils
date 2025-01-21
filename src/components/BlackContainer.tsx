
interface BlackContainerProps {

    children: React.ReactNode,
    className?: string,
}

const BlackContainer = ({children, className} : BlackContainerProps) => {
  return (
    <div className={`rounded-md bg-black/50 border-red-500/70 border-2 w-[94%] ${className}`}>{children}</div>
  )
}

export default BlackContainer