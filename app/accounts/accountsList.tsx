"use client";

import useAccounts from "@/hooks/useAccounts";
import Account from "./account";
import { TransferModal } from "@/components/web3/transferModal";
import { Account as AccountType } from "@/types/accounts.types";
import { useAccountsContext } from "../context/accountsContext";

export default function AccountsList({
  accounts,
}: {
  accounts: AccountType[];
}) {
  const { defaultAccount, changeDefaultAccount } = useAccountsContext();

  const { resetAccountBalance } = useAccounts();

  return (
    <div className="flex flex-col space-y-4">
      <TransferModal />
      {accounts.map((account) => (
        <Account
          key={account.address}
          account={account}
          defaultAccount={defaultAccount}
          changeDefaultAccount={changeDefaultAccount}
          resetAccountBalance={resetAccountBalance}
        />
      ))}
    </div>
  );
}
