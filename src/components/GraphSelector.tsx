import React from 'react';

type SensorVisibility = {
  [key: string]: boolean;
}

interface GraphSelectorProps {
  sensors: string[];
  visibility: SensorVisibility;
  onToggle: (sensor: string) => void;
  colors: Record<string, string>;
  title: string;
  className?: string;
}

const GraphSelector: React.FC<GraphSelectorProps> = ({ 
  sensors, 
  visibility, 
  onToggle, 
  colors, 
  title,
  className 
}) => {
  return (
    <div className={`bg-black/40 rounded p-3 h-full flex flex-col ${className}`}>
      <h3 className="text-white text-lg font-bold mb-3 text-center">{title}</h3>
      <div className="overflow-y-auto flex-grow">
        {sensors.map((sensor) => (
          <div key={sensor} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`selector-${sensor}`}
              checked={visibility[sensor] || false}
              onChange={() => onToggle(sensor)}
              className="mr-2 h-4 w-4 cursor-pointer"
            />
            <label 
              htmlFor={`selector-${sensor}`} 
              className="text-white flex items-center cursor-pointer text-sm"
            >
              <span 
                className="inline-block w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: colors[sensor] }}
              ></span>
              {sensor}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphSelector;
