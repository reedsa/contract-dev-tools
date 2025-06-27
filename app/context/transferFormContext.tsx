"use client";

import { createContext, useContext, useState } from "react";

interface TransferFormData {
  from: string;
  to: string;
  amount: string;
}

const defaultFormData: TransferFormData = {
  from: "",
  to: "",
  amount: "",
};

interface TransferFormContextType {
  formData: TransferFormData;
  initializeForm: (formData: TransferFormData) => void;
  setFormField: (field: keyof TransferFormData, value: string) => void;
  resetForm: () => void;
}

const TransferFormContext = createContext<TransferFormContextType | undefined>(
  undefined
);

export const TransferFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<TransferFormData>(defaultFormData);

  const initializeForm = (formData: TransferFormData) => {
    setFormData(formData);
  };

  const setFormField = (field: keyof TransferFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
  };

  return (
    <TransferFormContext.Provider
      value={{
        formData,
        initializeForm,
        setFormField,
        resetForm,
      }}
    >
      {children}
    </TransferFormContext.Provider>
  );
};

export const useTransferFormContext = () => {
  const context = useContext(TransferFormContext);
  if (context === undefined) {
    throw new Error(
      "useTransferFormContext must be used within a TransferFormProvider"
    );
  }
  return context;
};
