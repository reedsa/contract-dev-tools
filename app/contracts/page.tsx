import { Contract } from "@/types/contracts.types";
import ContractsManager from "./contractsManager";

export default async function ContractsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/`);
  const contracts: Contract[] = await res.json();

  return <ContractsManager contracts={contracts} />;
}
