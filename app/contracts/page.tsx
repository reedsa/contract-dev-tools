import ContractsList from "./contractsList";
import { Contract } from "@/types/contracts.types";
import ContractsHeader from "./contractsHeader";

export default async function ContractsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/`);
  const initialContracts: Contract[] = await res.json();

  return (
    <>
      <ContractsHeader />
      <ContractsList contracts={initialContracts} />
    </>
  );
}
