"use client";

import { createContext, useContext, useState } from "react";

interface ImportContractModalContextType {
  importContractModalOpen: boolean;
  toggleImportContractModalVisibility: () => void;
}

const ImportContractModalContext = createContext<ImportContractModalContextType>({
  importContractModalOpen: false,
  toggleImportContractModalVisibility: () => {},
});

export const ImportContractModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [importContractModalOpen, toggleImportContractModalVisibility] = useState(false);

  return (
    <ImportContractModalContext.Provider
      value={{
        toggleImportContractModalVisibility: () =>
          toggleImportContractModalVisibility(!importContractModalOpen),
        importContractModalOpen,
      }}
    >
      {children}
    </ImportContractModalContext.Provider>
  );
};

export const useImportContractModalContext = () => {
  return useContext(ImportContractModalContext);
};
