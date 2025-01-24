import React from "react";
import { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  color: "green" | "red" | "yellow";
  className?: string;
  onClick?: VoidFunction;
}

const Button = ({
  children,
  color,
  className,
  onClick = () => {},
}: ButtonProps) => {
  const getColor = () => {
    switch (color) {
      case "green":
        return "bg-green-500 hover:bg-green-400";
      case "red":
        return "bg-red-600 hover:bg-red-500";
      case "yellow":
        return "bg-yellow-300 hover:bg-yellow-200";
    }
  };

  const [isPressed, setIsPressed] = useState(false);

  const handleButtonPress = () => {
    setIsPressed(true);
    onClick();
    setTimeout(() => {
      setIsPressed(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleButtonPress}
      className={`${isPressed ? "motion-bg-in-transparent motion-duration-700" : ""} text-2xl py-2 w-[350px] rounded-sm ${getColor()} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
