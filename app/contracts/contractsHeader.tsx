"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";
import ImportContractButton from "./importContractButton";

const ContractsHeader = () => {
  return (
    <div className="flex flex-col pt-6 pb-6 space-y-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle>Contracts</CardTitle>
          <CardDescription>Manage and interact with contracts.</CardDescription>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <ImportContractButton />
        </div>
      </div>
    </div>
  );
};

export default ContractsHeader;
