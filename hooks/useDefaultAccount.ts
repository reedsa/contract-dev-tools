import { useRequest } from "./useRequest";
import { ZERO_ADDRESS } from "@/constants/constants";

const useAccount = () => {
  const { state: requestState, apiRequest } = useRequest();

  const saveDefaultAccount = async (defaultAccount: string) => {
    if (defaultAccount === ZERO_ADDRESS) {
      return;
    }
    await apiRequest(async () => {
      try {
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
        const response_json = await response.json();
      } catch (error: any) {
        throw new Error(`Error: ${error}`);
      }
    });
  };

  return {
    requestState,
    saveDefaultAccount,
  };
};

export default useAccount;
