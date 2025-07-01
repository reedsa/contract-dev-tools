"use client";

import { Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImportContractModalContext } from "../context/importContractModalContext";

export default function ImportContractButton() {
  const { toggleImportContractModalVisibility } =
    useImportContractModalContext();

  return (
    <Button
      onClick={() => toggleImportContractModalVisibility()}
      theme="green"
      size="icon"
      title="Import contract"
    >
      <Import className="h-5 w-5" />
    </Button>
  );
}
