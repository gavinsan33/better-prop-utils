import React, { createContext, useContext, useState } from "react";
import statesJson from "../data/STATE_SETS.json";
import sequenceJson from "../data/SEQUENCE_NAMES.json";

interface SelectionContextType {
  testTypeIndex: number;
  setTestTypeIndex: (index: number) => void;
  batchIndex: number;
  setBatchIndex: (index: number) => void;
  commandIndex: number;
  setCommandIndex: (index: number) => void;
  sequenceIndex: number;
  setSequenceIndex: (index: number) => void;
  sequencesEnabled: boolean;
  setSequencesEnabled: (enabled: boolean) => void;
  getSelectedCommand: () => string;
  getSelectedSequence: () => string;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testTypeIndex, setTestTypeIndex] = useState(0);
  const [batchIndex, setBatchIndex] = useState(0);
  const [commandIndex, setCommandIndex] = useState(0);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [sequencesEnabled, setSequencesEnabled] = useState(false);

  const getSelectedCommand = (): string => {
    try {
      const data = [...statesJson];
      return data[testTypeIndex].batches[batchIndex].commands[commandIndex].value;
    } catch (error) {
      console.error("Error getting selected command:", error);
      return "";
    }
  };

  const getSelectedSequence = (): string => {
    try {
      const { sequences } = sequenceJson[0];
      return sequences[sequenceIndex];
    } catch (error) {
      console.error("Error getting selected sequence:", error);
      return "";
    }
  };

  return (
    <SelectionContext.Provider
      value={{
        testTypeIndex,
        setTestTypeIndex,
        batchIndex,
        setBatchIndex,
        commandIndex,
        setCommandIndex,
        sequenceIndex,
        setSequenceIndex,
        sequencesEnabled,
        setSequencesEnabled,
        getSelectedCommand,
        getSelectedSequence
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
