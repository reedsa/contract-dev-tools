import { Address } from "@/types/accounts.types";
import { useState } from "react";
import { useRequest } from "./useRequest";

const useAccounts = () => {
  const { state: requestState, apiRequest } = useRequest();

  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [addAccountError, setAddAccountError] = useState<string>("");
  const [showAccountAddedSuccess, setShowAccountAddedSuccess] =
    useState<boolean>(false);
  const [newAccountAddress, setNewAccountAddress] = useState<Address>("");

  const [showTransferSuccess, setShowTransferSuccess] =
    useState<boolean>(false);
  const [showTransferError, setShowTransferError] = useState<boolean>(false);

  const addAccount = async () => {
    await apiRequest(async () => {
      setIsAddingAccount(true);
      setAddAccountError("");
      setNewAccountAddress("");
      setShowAccountAddedSuccess(false);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              is_default: false,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add account");
        }

        const account = await response.json();

        setAccounts([...accounts, account]);

        setNewAccountAddress(account.address);
        setShowAccountAddedSuccess(true);
        setTimeout(() => {
          setShowAccountAddedSuccess(false);
        }, 3000);
      } catch (error: any) {
        setAddAccountError(`${error} Please check the address and try again.`);
      } finally {
        setIsAddingAccount(false);
      }
    });
  };

  const resetAccountBalance = async (address: Address) => {
    await apiRequest(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/${address}/reset`,
          {
            method: "PUT",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to reset account balance");
        }

        const account = await response.json();

        return fetchAccounts();
      } catch (error: any) {
        throw new Error(`Error: ${error}`);
      }
    });
  };

  const transfer = async (from: Address, to: Address, amount: number) => {
    setShowTransferSuccess(false);
    setShowTransferError(false);
    await apiRequest(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/transfer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from,
              to,
              amount,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to transfer");
        }

        const transaction = await response.json();
        setShowTransferSuccess(true);
        setTimeout(() => {
          setShowTransferSuccess(false);
        }, 3000);

        return fetchAccounts();
      } catch (error: any) {
        setShowTransferError(true);
      }
    });
  };

  return {
    requestState,
    addAccount,
    showAccountAddedSuccess,
    isAddingAccount,
    addAccountError,
    newAccountAddress,
    resetAccountBalance,
    transfer,
    showTransferSuccess,
    showTransferError,
  };
};

export default useAccounts;
