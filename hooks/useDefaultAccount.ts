import { useRequest } from "./useRequest";
import { Account as AccountType } from "@/types/accounts.types";

const useDefaultAccount = () => {
  const { state: requestState, apiRequest } = useRequest();

  const updateDefaultAccount = async (
    defaultAccount: string
  ): Promise<AccountType> => {
    if (defaultAccount === "") {
      throw new Error("You must select an account as the default account");
    }
    return await apiRequest<AccountType>(async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: defaultAccount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update default account");
      }
      return (await response.json()) as AccountType;
    });
  };

  return {
    requestState,
    updateDefaultAccount,
  };
};

export default useDefaultAccount;
