"use client";

import { createContext, useContext, useState } from "react";

interface ImportContractFormData {
  abi: string;
  bytecode: string;
}

const defaultFormData: ImportContractFormData = {
  abi: "",
  bytecode: "",
};

interface ImportContractFormContextType {
  formData: ImportContractFormData;
  initializeForm: (formData: ImportContractFormData) => void;
  setFormField: (field: keyof ImportContractFormData, value: string) => void;
  resetForm: () => void;
}

const ImportContractFormContext = createContext<
  ImportContractFormContextType | undefined
>(undefined);

export const ImportContractFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] =
    useState<ImportContractFormData>(defaultFormData);

  const initializeForm = (formData: ImportContractFormData) => {
    setFormData(formData);
  };

  const setFormField = (field: keyof ImportContractFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
  };

  return (
    <ImportContractFormContext.Provider
      value={{
        formData,
        initializeForm,
        setFormField,
        resetForm,
      }}
    >
      {children}
    </ImportContractFormContext.Provider>
  );
};

export const useImportContractFormContext = () => {
  const context = useContext(ImportContractFormContext);
  if (context === undefined) {
    throw new Error(
      "useImportContractFormContext must be used within an ImportContractFormProvider"
    );
  }
  return context;
};
