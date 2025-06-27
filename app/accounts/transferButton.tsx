"use client";

import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransferModalContext } from "@/app/context/transferModalContext";
import { useTransferFormContext } from "../context/transferFormContext";

export default function TransferButton() {
  const { toggleTransferModalVisibility } = useTransferModalContext();
  const { resetForm } = useTransferFormContext();

  return (
    <Button
      theme="yellow"
      size="icon"
      title="Transfer funds"
      onClick={() => {
        toggleTransferModalVisibility();
        resetForm();
      }}
    >
      <ArrowLeftRight className="h-5 w-5" />
    </Button>
  );
}
