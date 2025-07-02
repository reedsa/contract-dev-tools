"use client";

import { Contract } from "@/types/contracts.types";
import { createContext, useContext } from "react";

interface SelectedContractContextType {
  selectedContract: Contract | undefined;
  setSelectedContract: (contract: Contract) => void;
}

const SelectedContractContext = createContext<
  SelectedContractContextType | undefined
>(undefined);

export const SelectedContractProvider = SelectedContractContext.Provider;

export const useSelectedContract = () => {
  const context = useContext(SelectedContractContext);
  if (!context) {
    throw new Error(
      "useSelectedContract must be used within a SelectedContractProvider"
    );
  }
  return context;
};
