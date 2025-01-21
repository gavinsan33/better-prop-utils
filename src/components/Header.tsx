import BlackContainer from './BlackContainer';
import SelectBox from './Dropdown';
import StyledCheckbox from './StyledCheckbox';

interface HeaderProps {
    className?: string,
}

const Header = ({className}: HeaderProps) => {
  return (
    <BlackContainer className={`flex flex-row items-center justify-between ${className}`}>
        <div className='flex justify-start spacing-x-5 my-4 ml-3 space-x-2 font-semibold'>
            <SelectBox size='large' options={["1", "2"]}/>
            <SelectBox size='large' options={["1", "2"]}/>
            <SelectBox size='large' options={["1", "2"]} className='text-green-700'/>
        </div>

        <h1 className='text-white'>Last sent: UNKNOWN</h1>
        <SelectBox size='large' options={["1", "2"]} className='mr-6 font-semibold'/>
        <StyledCheckbox className='mr-10'>Sequences Enabled:</StyledCheckbox>
    </BlackContainer>
  )
}

export default Header