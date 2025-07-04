"use client";

import { useState } from "react";
import { ImportContractModal } from "@/components/web3/importContractModal";
import Contract from "./contract";
import { Contract as ContractType } from "@/types/contracts.types";

export default function ContractsList({
  contracts: initialContracts,
}: {
  contracts: ContractType[];
}) {
  const [contracts, setContracts] = useState<ContractType[]>(initialContracts);

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-4">
        <ImportContractModal
          contracts={contracts}
          setContracts={setContracts}
        />
        {contracts.length === 0 && (
          <div className="text-gray-500">
            No contracts found. Please import a contract to get started.
          </div>
        )}
        {contracts.length > 0 &&
          contracts.map((contract) => (
            <Contract key={contract.address} contract={contract} />
          ))}
      </div>
    </div>
  );
}
