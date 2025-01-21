import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    color: 'green' | 'red' | 'yellow';
    className?: string;
    onClick?: () => void;
}

const Button = ({children, color, className, onClick} : ButtonProps) => {

    const getColor = () => {
        switch(color) {
            case 'green':
                return "bg-green-500 hover:bg-green-400"
            case 'red':
                return "bg-red-600 hover:bg-red-500"
            case 'yellow':
                return "bg-yellow-300 hover:bg-yellow-200"
        }
    }

  return (

        <button onClick={onClick} className={`text-2xl py-2 w-[350px] rounded-sm ${getColor()} ${className}`}>
            {children}
        </button>

  )
}

export default Button