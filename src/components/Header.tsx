import { useSelection } from "../context/SelectionContext";
import BlackContainer from "./BlackContainer";
import SelectBox from "./Dropdown";
import StyledCheckbox from "./StyledCheckbox";
import statesJson from "../data/STATE_SETS.json";
import sequenceJson from "../data/SEQUENCE_NAMES.json";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const data = [...statesJson];
  const {sequences} = sequenceJson[0];
  
  const { 
    testTypeIndex, 
    setTestTypeIndex, 
    batchIndex, 
    setBatchIndex, 
    commandIndex, 
    setCommandIndex, 
    sequenceIndex, 
    setSequenceIndex,
    sequencesEnabled,
    setSequencesEnabled
  } = useSelection();

  return (
    <BlackContainer
      className={`flex flex-row items-center justify-between ${className}`}
    >
      <div className="flex justify-start spacing-x-5 my-4 ml-3 space-x-2 font-semibold">
        <SelectBox
          size="large"
          onClick={(value) => setTestTypeIndex(value)}
          options={data.map((state) => state.name)}
          value={testTypeIndex}
        />
        <SelectBox
          size="large"
          onClick={(value) => setBatchIndex(value)}
          options={statesJson[testTypeIndex].batches.flatMap(
            (batch) => batch.name
          )}
          value={batchIndex}
        />
        <SelectBox
          size="large"
          onClick={(value) => setCommandIndex(value)}
          options={statesJson[testTypeIndex].batches[batchIndex].commands.flatMap(
            (command) => command.name
          )}
          value={commandIndex}
          className="text-green-700"
        />
      </div>

      <h1 className="text-white">Last sent: UNKNOWN</h1>
      <SelectBox
        size="large"
        onClick={(value) => setSequenceIndex(value)}
        options={sequences}
        value={sequenceIndex}
        className="mr-6 font-semibold"
      />
      <StyledCheckbox 
        className="mr-10" 
        onClick={() => setSequencesEnabled(!sequencesEnabled)} 
        isChecked={sequencesEnabled}
      >
        Sequences Enabled:
      </StyledCheckbox>
    </BlackContainer>
  );
};

export default Header;
