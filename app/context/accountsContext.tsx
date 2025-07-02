"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "./toastContext";
import { Account as AccountType } from "@/types/accounts.types";
import useAccounts from "@/hooks/useAccounts";
import { shortenAddress } from "@/lib/utils";
import useDefaultAccount from "@/hooks/useDefaultAccount";

interface AccountsContextType {
  accounts: AccountType[];
  defaultAccount: string;
  changeDefaultAccount: (address: string) => void;
  addAccount: () => void;
}

export const AccountsContext = createContext<AccountsContextType | undefined>(
  undefined
);

export const AccountsContextProvider = ({
  accounts: initialAccounts,
  children,
}: {
  accounts: AccountType[];
  children: React.ReactNode;
}) => {
  const [accounts, setAccounts] = useState<AccountType[]>(initialAccounts);

  const initialDefaultAccount = accounts.find(
    (account) => account.default
  )?.address;

  const [defaultAccount, setDefaultAccount] = useState<string>(
    initialDefaultAccount || ""
  );

  const { showToast } = useToast();
  const { updateDefaultAccount, requestState: defaultAccountRequestState } =
    useDefaultAccount();
  const { createAccount, requestState: addAccountRequestState } = useAccounts();
  const changeDefaultAccount = async (address: string) => {
    if (address === defaultAccount || address === "") {
      return;
    }

    const previousDefaultAccount = defaultAccount;
    setDefaultAccount(address);

    try {
      if (defaultAccountRequestState.loading) {
        return;
      }

      try {
        const updatedAccount = await updateDefaultAccount(address);

        if (updatedAccount) {
          const updatedAccounts = accounts.map((account) =>
            account.address === updatedAccount.address
              ? updatedAccount
              : account
          );
          setAccounts(updatedAccounts);
          showToast({
            title: "Default account updated",
            description: `Default account updated to ${shortenAddress(
              updatedAccount.address
            )}`,
            variant: "default",
          });
        }
      } catch (error) {
        setDefaultAccount(previousDefaultAccount);
      }
    } catch (error) {
      setDefaultAccount(previousDefaultAccount);
    }
  };

  const addAccount = async () => {
    try {
      const newAccount = await createAccount();
      if (newAccount) {
        setAccounts([...accounts, newAccount]);
        showToast({
          title: "Account added",
          description: `Account ${shortenAddress(newAccount.address)} added`,
          variant: "default",
        });
      }
    } catch (error: any) {
      showToast({
        title: "Failed to add account",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AccountsContext.Provider
      value={{ accounts, defaultAccount, changeDefaultAccount, addAccount }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccountsContext = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error(
      "useAccountsContext must be used within an AccountsProvider"
    );
  }
  return context;
};
