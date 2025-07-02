import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useImportContractFormContext } from "@/app/context/importContractFormContext";
import { useSubmitForm } from "@/hooks/useSubmitForm";
import { FormEvent, useState } from "react";
import { useImportContractModalContext } from "@/app/context/importContractModalContext";
import { useToast } from "@/app/context/toastContext";
import { shortenAddress } from "@/lib/utils";
import { Contract } from "@/types/contracts.types";

export const ImportContractModal = ({
  contracts,
  setContracts,
}: {
  contracts: Contract[];
  setContracts: (contracts: Contract[]) => void;
}) => {
  const {
    formData: { abi, bytecode },
    setFormField,
  } = useImportContractFormContext();
  const { importContractModalOpen, toggleImportContractModalVisibility } =
    useImportContractModalContext();
  const { submit, isLoading, error } = useSubmitForm(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/deploy`
  );
  const { showToast } = useToast();

  const getFileData = async () => {
    const file = document.getElementById("sourceFile") as HTMLInputElement;
    if (file.files) {
      const fileData = file.files[0];
      const fileContent = await fileData.text();
      const json = JSON.parse(fileContent);
      setFormField("abi", json.abi);
      setFormField("bytecode", json.bytecode);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = await submit(data);

    if (result.success) {
      setContracts([...contracts, result.response]);
      showToast({
        title: "Contract Import Successful",
        description: `Successfully imported contract at address ${shortenAddress(
          result.response.address
        )}`,
        variant: "default",
      });
      toggleImportContractModalVisibility();
    }
  };

  return (
    <Dialog
      open={importContractModalOpen}
      onOpenChange={toggleImportContractModalVisibility}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Contract</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Import a contract into the system.
        </DialogDescription>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="hidden"
            name="abi"
            value={abi ? JSON.stringify(abi) : ""}
          />
          <input type="hidden" name="bytecode" value={bytecode || ""} />
          <div className="flex flex-col gap-4">
            <label htmlFor="to">Contract File</label>
            <span className="text-sm text-gray-500">
              Upload a compiled contract file in JSON or YAML format.
            </span>
            <Input
              type="file"
              id="sourceFile"
              name="sourceFile"
              onChange={() => getFileData()}
            />
          </div>
          <div className="flex flex-row justify-end mt-4 gap-2">
            <Button
              variant="outline"
              onClick={() => toggleImportContractModalVisibility()}
              title="Cancel"
            >
              Cancel
            </Button>
            <Button
              theme="blue"
              type="submit"
              title="Submit import"
              disabled={isLoading}
            >
              {isLoading ? "Importing..." : "Import Contract"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
