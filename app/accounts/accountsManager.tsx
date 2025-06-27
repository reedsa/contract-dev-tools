"use client";

import { useState } from "react";
import { ZERO_ADDRESS } from "@/constants/constants";
import useDefaultAccount from "@/hooks/useDefaultAccount";
import { Account as AccountType } from "@/types/accounts.types";
import { AccountsContext } from "../context/accountsContext";
import AccountsList from "./accountsList";

export default function AccountsManager({
  accounts,
}: {
  accounts: AccountType[];
}) {
  const initialDefaultAccount = accounts.find(
    (account) => account.default
  )?.address;
  const [defaultAccount, setDefaultAccount] = useState<string>(
    initialDefaultAccount || ZERO_ADDRESS
  );

  const { saveDefaultAccount, requestState } = useDefaultAccount();

  const updateDefaultAccount = (address: string) => {
    const previousDefaultAccount = defaultAccount;
    setDefaultAccount(address);

    try {
      if (requestState.loading) {
        return;
      }

      saveDefaultAccount(address);
    } catch (error) {
      setDefaultAccount(previousDefaultAccount);
      console.error(error);
    }
  };

  return (
    <AccountsContext.Provider value={{ defaultAccount, updateDefaultAccount }}>
      <AccountsList accounts={accounts} />
    </AccountsContext.Provider>
  );
}
