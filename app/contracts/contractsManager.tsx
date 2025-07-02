"use client";

import { useState } from "react";
import ContractsList from "./contractsList";
import { Contract } from "@/types/contracts.types";
import ContractsHeader from "./contractsHeader";
import { Card, CardContent } from "@/components/ui/card";
import ExecutionPanel from "./executionPanel";
import { SelectedContractProvider } from "../context/selectedContractContext";
import { useAccountsContext } from "../context/accountsContext";
import Link from "next/link";

const ContractsManager = ({
  contracts: initialContracts,
}: {
  contracts: Contract[];
}) => {
  const [selectedContract, setSelectedContract] = useState<
    Contract | undefined
  >(undefined);
  const { accounts, defaultAccount } = useAccountsContext();

  return (
    <>
      {(!accounts.length || !defaultAccount) && (
        <div>
          There is no default account set. In order to deploy and interact with
          contracts, please select a default account from the{" "}
          <Link href="/accounts" className="text-blue-500 underline">
            accounts
          </Link>{" "}
          page.
        </div>
      )}
      {accounts.length > 0 && defaultAccount && (
        <SelectedContractProvider
          value={{ selectedContract, setSelectedContract }}
        >
          <div className="flex flex-row gap-4">
            <Card className="flex-initial">
              <CardContent>
                <ContractsHeader />
                <ContractsList contracts={initialContracts} />
              </CardContent>
            </Card>
            <Card className="flex flex-auto">
              <CardContent>
                <ExecutionPanel />
              </CardContent>
            </Card>
          </div>
        </SelectedContractProvider>
      )}
    </>
  );
};

export default ContractsManager;
