import { Address } from "@/types/accounts.types";
import { useRequest } from "./useRequest";
import { Account as AccountType } from "@/types/accounts.types";

const useAccounts = () => {
  const { state: requestState, apiRequest } = useRequest();

  const createAccount = async () => {
    return await apiRequest<AccountType>(async () => {
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

      const account = (await response.json()) as AccountType;

      return account;
    });
  };

  const resetAccountBalance = async (address: Address) => {
    return await apiRequest<AccountType>(async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/${address}/reset`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reset account balance");
      }

      const account = (await response.json()) as AccountType;

      return account;
    });
  };

  return {
    requestState,
    createAccount,
    resetAccountBalance,
  };
};

export default useAccounts;
