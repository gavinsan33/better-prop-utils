import Button from "./Button";
import SelectBox from "./Dropdown";
import BlackContainer from "./BlackContainer";
import StyledCheckbox from "./StyledCheckbox";

export const StateDropdowns = () => {

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
          <SelectBox size="small" title="loxVent" options={["1", "2"]}/>
          <SelectBox size="small" title="kerOrifice" options={["1", "2"]}/>
        </ContainerStack>
        
        <ContainerStack>
          <SelectBox size="small" title="kerVent" options={["1", "2"]}/>
          <SelectBox size="small" title="loxPurge" options={["1", "2"]}/>
        </ContainerStack>

        <ContainerStack>
          <SelectBox size="small" title="loxDrip" options={["1", "2"]}/>
          <SelectBox size="small" title="kerPurge" options={["1", "2"]}/> 
        </ContainerStack>

        <SelectBox size="small" title="kerDrip" options={["1", "2"]}/>
        <SelectBox size="small" title="loxPressurant" options={["1", "2"]}/>
        <SelectBox size="small" title="kerPrsesurant" options={["1", "2"]}/>
        <SelectBox size="small" title="loxFlow" options={["1", "2"]}/>
        <SelectBox size="small" title="kerFlow" options={["1", "2"]}/>
      </div>

      <div className="flex flex-row space-x-5 items-center mb-2">
        <Button color="green" className="ml-5 my-3 font-semibold">SET STATES</Button>
        <h1 className="text-white align-middle">Last sent at: N/A</h1>

        <StyledCheckbox>Enable Override:</StyledCheckbox>
      </div>

    </BlackContainer>
  );
};
