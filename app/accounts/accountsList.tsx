"use client";

import useAccounts from "@/hooks/useAccounts";
import Account from "./account";
import { TransferModal } from "@/components/web3/transferModal";
import { useAccountsContext } from "../context/accountsContext";

export default function AccountsList() {
  const { accounts } = useAccountsContext();
  const { defaultAccount, changeDefaultAccount } = useAccountsContext();

  const { resetAccountBalance } = useAccounts();

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-4">
        <TransferModal />
        {accounts.length > 0 &&
          accounts.map((account) => (
            <Account
              key={account.address}
              account={account}
              defaultAccount={defaultAccount}
              changeDefaultAccount={changeDefaultAccount}
              resetAccountBalance={resetAccountBalance}
            />
          ))}
      </div>
    </div>
  );
}
