"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@radix-ui/themes";
import { ArrowLeftRight, RotateCcw, CopyIcon, User } from "lucide-react";
import { Account as AccountType } from "@/types/accounts.types";
import { useTransferModalContext } from "../context/transferModalContext";
import { useTransferFormContext } from "../context/transferFormContext";

export default function Account({
  account,
  resetAccountBalance,
  defaultAccount,
  changeDefaultAccount,
}: {
  account: AccountType;
  resetAccountBalance: (address: string) => void;
  defaultAccount: string;
  changeDefaultAccount: (address: string) => void;
}) {
  const { toggleTransferModalVisibility } = useTransferModalContext();
  const { initializeForm } = useTransferFormContext();

  return (
    <div className="flex items-center gap-4 rounded-lg border p-3 bg-blue-500/5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <User className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex flex-row items-center gap-2">
          <p className="text-sm font-medium">{account.address}</p>
          <CopyIcon
            className="h-3 w-3 text-muted-foreground cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(account.address);
            }}
          />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-xs text-muted-foreground">
            {account["balance_eth"]} ETH
          </p>
          <div className="flex flex-row items-center space-x-2">
            <Button
              theme="yellow"
              size="xs"
              onClick={() => {
                initializeForm({
                  from: account.address,
                  to: "",
                  amount: "",
                });
                toggleTransferModalVisibility();
              }}
            >
              <ArrowLeftRight aria-label="Transfer" />
            </Button>
            {account["unlocked"] && (
              <Button
                theme="green"
                size="xs"
                onClick={() => resetAccountBalance(account.address)}
              >
                <RotateCcw aria-label="Reset" />
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {account["transaction_count"]} transactions
        </p>
      </div>
      <div className="flex">
        <div className="flex flex-col text-xs text-muted-foreground">
          <label
            className="label"
            htmlFor="default-account"
            style={{ paddingRight: 15 }}
          >
            Default
          </label>
          <Switch
            id="default-account"
            // size="1"
            checked={defaultAccount === account.address}
            onCheckedChange={() => {
              changeDefaultAccount(account.address);
            }}
          />
        </div>
      </div>
    </div>
  );
}
