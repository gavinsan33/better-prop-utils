
import unchecked from '../assets/checkbox/unchecked.svg';
import checked from '../assets/checkbox/checked.svg';
import { useState } from 'react';

interface StyledCheckbox {
  className?: string,
  children?: React.ReactNode,
  isChecked?: boolean,
  onClick?: VoidFunction,
}

const StyledCheckbox = ({children, className, isChecked = false, onClick=()=>{}}: StyledCheckbox) => {

  const [dispBounce, setDispBounce] = useState(false);

  const handleClick = () => {
    setDispBounce(true);
    onClick();
    setTimeout(() => {
      setDispBounce(false);
    }, 300); // Change color for 300ms
  };

  return (
    <button onClick={handleClick} className={`rounded-2xl bg-gradient-to-bl from-red-400 to-red-800 px-4 py-3 flex flex-row text-white items-center ${className} hover:brightness-75`}>
      <h1 className="mr-3">{children}</h1>
      <img className={`${dispBounce ? "motion-preset-expand motion-duration-150" : ""} border-[2px] border-black rounded-md`} src={isChecked ? checked : unchecked} width={25} height={25} />
    </button>
  )
}

export default StyledCheckbox