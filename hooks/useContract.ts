import { useRequest } from "./useRequest";
import { Contract as ContractType } from "@/types/contracts.types";

const useContract = () => {
  const { state: requestState, apiRequest } = useRequest();

  const importContractFile = async (fileType: string, fileData: any) => {
    if (!fileType || !fileData) {
      throw new Error("No file data provided");
    }
    return await apiRequest<ContractType>(async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_type: fileType,
            source_file: fileData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add account");
      }

      const account = (await response.json()) as ContractType;

      return account;
    });
  };

  return { importContractFile };
};

export default useContract;
