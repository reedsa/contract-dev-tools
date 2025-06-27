"use client";

import { createContext, useContext, useState } from "react";

interface TransferModalContextType {
  transferModalOpen: boolean;
  toggleTransferModalVisibility: () => void;
}

const TransferModalContext = createContext<TransferModalContextType>({
  transferModalOpen: false,
  toggleTransferModalVisibility: () => {},
});

export const TransferModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transferModalOpen, toggleTransferModalVisibility] = useState(false);

  return (
    <TransferModalContext.Provider
      value={{
        toggleTransferModalVisibility: () =>
          toggleTransferModalVisibility(!transferModalOpen),
        transferModalOpen,
      }}
    >
      {children}
    </TransferModalContext.Provider>
  );
};

export const useTransferModalContext = () => {
  return useContext(TransferModalContext);
};
