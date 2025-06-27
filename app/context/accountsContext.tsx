import { createContext, useContext } from "react";

interface AccountsContextType {
  defaultAccount: string;
  updateDefaultAccount: (address: string) => void;
}

export const AccountsContext = createContext<AccountsContextType | undefined>(
  undefined
);

export const useAccountsContext = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error(
      "useAccountsContext must be used within an AccountsProvider"
    );
  }
  return context;
};
