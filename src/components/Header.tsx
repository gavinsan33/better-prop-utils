import { useEffect, useState } from 'react';
import BlackContainer from './BlackContainer';
import SelectBox from './Dropdown';
import StyledCheckbox from './StyledCheckbox';

interface HeaderProps {
    className?: string,
}

const Header = ({className}: HeaderProps) => {

  const options = [["WATER_FLOW"],["ALL_STATES"],
  ["ONLINE_SAFE_D", "KERO_FILL", "KERO_FILLED", "LOX_FILL",
    "LOX_FILLED", "ALL_READY_TO_PRESSURIZE", "ALL_PRESSURIZING", "ALL_FLOW_closed", "ALL_FLOW_open",
    "KERO_FLOW_closed", "KERO_FLOW_open"
  ],["NONE", "ALL_FLOW", "KERO_FLOW"]];

  const defaultVals = [0,0,0];

  const [drop1Value, setDrop1Value] = useState(defaultVals[0]);
  const [drop2Value, setDrop2Value] = useState(defaultVals[1]);
  const [drop3Value, setDrop3Value] = useState(defaultVals[2]);
  const [drop4Value, setDrop4Value] = useState(defaultVals[4]);


  return (
    <BlackContainer className={`flex flex-row items-center justify-between ${className}`}>
        <div className='flex justify-start spacing-x-5 my-4 ml-3 space-x-2 font-semibold'>
            <SelectBox size='large' onClick={(value) => setDrop1Value(value)} options={options[0]} value={drop1Value}/>
            <SelectBox size='large' onClick={(value) => setDrop2Value(value)} options={options[1]} value={drop2Value}/>
            <SelectBox size='large' onClick={(value) => setDrop3Value(value)} options={options[2]} value={drop3Value} className='text-green-700'/>
        </div>

        <h1 className='text-white'>Last sent: UNKNOWN</h1>
        <SelectBox size='large' onClick={(value) => setDrop4Value(value)} options={options[3]} value={drop4Value} className='mr-6 font-semibold'/>
        <StyledCheckbox className='mr-10'>Sequences Enabled:</StyledCheckbox>
    </BlackContainer>
  )
}

export default Header