import Button from "./Button";
import SelectBox from "./Dropdown";
import BlackContainer from "./BlackContainer";
import StyledCheckbox from "./StyledCheckbox";
import { useState } from "react";

export const StateDropdowns = () => {

  const options = Array(11).fill(["OPEN", "CLOSED"]);
  const defaultStartStatus = 0;

  
  const [selectedValue, setSelectedValue] = useState<number[]>(options.map(() => defaultStartStatus));


  // updates an index with the given value
  const updateValuesArr = (index: number, value: number) => {

    console.log("index: " + index + " value: " + value);

    const newArr = [...selectedValue];
    newArr[index] = value;
    setSelectedValue(newArr);
  }


  interface ContainerStackProps {
    children : React.ReactNode,
  }

  const ContainerStack = ({children} : ContainerStackProps) => {

    return (
      <div className="flex flex-col items-center">
        {children}
      </div>
    )
  }

  return (
    
    <BlackContainer className="flex flex-col">
      <div className="flex w-full justify-around items-start py-2">
        <ContainerStack>
          <SelectBox size="small" onClick={(value: number)=>updateValuesArr(0, value)} value={selectedValue[0]} title="loxVent" options={options[0]}/>
          <SelectBox size="small" onClick={(value: number)=>updateValuesArr(8, value)} value={selectedValue[8]} title="kerOrifice" options={options[8]}/>
        </ContainerStack>
        
        <ContainerStack>
          <SelectBox size="small" onClick={(value: number)=>updateValuesArr(1, value)} value={selectedValue[1]} title="kerVent" options={options[1]}/>
          <SelectBox size="small" onClick={(value: number)=>updateValuesArr(9, value)} value={selectedValue[9]} title="loxPurge" options={options[9]}/>
        </ContainerStack>

        <ContainerStack>
          <SelectBox size="small" onClick={(value: number)=>updateValuesArr(2, value)} value={selectedValue[2]} title="loxDrip" options={options[2]}/>
          <SelectBox size="small" onClick={(value: number)=>updateValuesArr(10, value)} value={selectedValue[10]} title="kerPurge" options={options[10]}/> 
        </ContainerStack>

        <SelectBox size="small" onClick={(value: number)=>updateValuesArr(3, value)} value={selectedValue[3]} title="kerDrip" options={options[3]}/>
        <SelectBox size="small" onClick={(value: number)=>updateValuesArr(4, value)} value={selectedValue[4]} title="loxPressurant" options={options[4]}/>
        <SelectBox size="small" onClick={(value: number)=>updateValuesArr(5, value)} value={selectedValue[5]} title="kerPrsesurant" options={options[5]}/>
        <SelectBox size="small" onClick={(value: number)=>updateValuesArr(6, value)} value={selectedValue[6]} title="loxFlow" options={options[6]}/>
        <SelectBox size="small" onClick={(value: number)=>updateValuesArr(7, value)} value={selectedValue[7]} title="kerFlow" options={options[7]}/>
      </div>

      <div className="flex flex-row space-x-5 items-center mb-2">
        <Button color="green" className="ml-5 my-3 font-semibold">SET STATES</Button>
        <h1 className="text-white align-middle">Last sent at: N/A</h1>

        <StyledCheckbox>Enable Override:</StyledCheckbox>
      </div>

    </BlackContainer>
  );
};
