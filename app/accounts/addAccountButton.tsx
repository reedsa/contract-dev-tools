"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccountsContext } from "../context/accountsContext";

export default function AddAccountButton() {
  const { addAccount } = useAccountsContext();

  return (
    <Button
      onClick={() => addAccount()}
      theme="green"
      size="icon"
      title="Add account"
    >
      <Plus className="h-5 w-5" />
    </Button>
  );
}
