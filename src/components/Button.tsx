import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    color: 'green' | 'red' | 'yellow';
    onClick?: () => void;
}

const Button = ({children, color, onClick} : ButtonProps) => {

    const getColor = () => {
        switch(color) {
            case 'green':
                return "bg-green-400 hover:bg-green-500"
            case 'red':
                return "bg-red-500 hover:bg-red-600"
            case 'yellow':
                return "bg-yellow-200 hover:bg-yellow-300"
        }
    }

  return (
    <button onClick={onClick} className={`border-2 border-red text-2xl py-2 px-[100px] rounded-none ${getColor()}`}>
        {children}
    </button>
  )
}

export default Button