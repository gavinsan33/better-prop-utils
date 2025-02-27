import React from "react";
import { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  color: "green" | "red" | "yellow" | "blue";
  className?: string;
  onClick?: VoidFunction;
  disabled?: boolean;
}

const Button = ({
  children,
  color,
  className,
  onClick = () => {},
  disabled = false,
}: ButtonProps) => {
  const getColor = () => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500"
      case "red":
        return "bg-red-600";
      case "yellow":
        return "bg-yellow-300";
    }
  };

  const [isPressed, setIsPressed] = useState(false);

  const handleButtonPress = () => {
    if (disabled) return;
    
    setIsPressed(true);
    onClick();
    setTimeout(() => {
      setIsPressed(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleButtonPress}
      disabled={disabled}
      className={`${isPressed ? "motion-bg-in-transparent motion-duration-700" : ""} 
                text-2xl py-2 w-[350px] rounded-lg hover:brightness-75 
                ${getColor()} ${className}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
