import { Alert } from "@/components/ui/alert";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import FunctionSelect from "./functionSelect";
import { useSelectedContract } from "../context/selectedContractContext";

const ExecutionPanel = () => {
  const { selectedContract } = useSelectedContract();
  const functionOptions =
    selectedContract?.abi?.filter((item) => item.type === "function") || [];

  return (
    <div className="flex flex-col pt-6 pb-6 space-y-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle>Execute Functions</CardTitle>
          <CardDescription>
            This is the execution panel for the selected contract. Here you can
            execute transactions and interact with the contract.
          </CardDescription>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="space-y-2 w-full border p-4 rounded-lg bg-blue-50">
          <Label htmlFor="function-select" className="font-bold">
            Function
          </Label>
          <FunctionSelect
            functions={functionOptions}
            selectedFunctionSignature={""}
            handleFunctionSelected={() => {}}
          />

          {/* {selectedFunction && selectedFunction.abi.stateMutability && (
            <Alert variant="default">
              <InfoIcon className="h-4 w-4" />
              <p className="text-sm font-medium">
                This function is a {selectedFunction.abi.stateMutability}{" "}
                function.
              </p>
            </Alert>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ExecutionPanel;
