"use client";

import { useState } from "react";
import useDefaultAccount from "@/hooks/useDefaultAccount";
import { Account as AccountType } from "@/types/accounts.types";
import { AccountsContext } from "../context/accountsContext";
import AccountsList from "./accountsList";
import useAccounts from "@/hooks/useAccounts";
import AccountsHeader from "./accountsHeader";
import { useToast } from "../context/toastContext";
import { shortenAddress } from "@/lib/utils";

export default function AccountsManager({
  accounts: initialAccounts,
}: {
  accounts: AccountType[];
}) {
  const [accounts, setAccounts] = useState<AccountType[]>(initialAccounts);
  const initialDefaultAccount = accounts.find(
    (account) => account.default
  )?.address;
  const [defaultAccount, setDefaultAccount] = useState<string>(
    initialDefaultAccount || ""
  );

  const { updateDefaultAccount, requestState: defaultAccountRequestState } =
    useDefaultAccount();
  const { createAccount, requestState: addAccountRequestState } = useAccounts();
  const { showToast } = useToast();

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
      value={{ defaultAccount, changeDefaultAccount, addAccount }}
    >
      <AccountsHeader />
      <AccountsList accounts={accounts} />
    </AccountsContext.Provider>
  );
}
