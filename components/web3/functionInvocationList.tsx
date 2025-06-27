import {
  FunctionTransactionResponse,
  LogReceipt,
  TransactionHash,
} from "@/types/functionInvocation.types";
import { SearchContractResponse } from "@/types/searchResponse.types";
import { Download, OctagonX } from "lucide-react";
import { FunctionInvocation } from "@/types/functionInvocationHistory.types";
import FunctionCallDetails from "./functionCallDetails";
import FunctionTransactionDetails from "./functionTransactionDetails";
import { Button } from "../ui/button";

interface FunctionInvocationProps {
  contract: SearchContractResponse;
  functionInvocations: FunctionInvocation[];
  activeTransaction: TransactionHash;
  setActiveTransaction: (transaction: TransactionHash) => void;
  isExportable?: boolean;
  exportTransactions?: (
    contract: SearchContractResponse,
    transactions: FunctionTransactionResponse[]
  ) => void;
  isClearable?: boolean;
  clearFunctionInvocations?: () => void;
}

export function InvocationItem({
  functionInvocation,
  activeTransaction,
  setActiveTransaction,
}: {
  functionInvocation: FunctionInvocation;
  activeTransaction: TransactionHash;
  setActiveTransaction: (transaction: TransactionHash) => void;
}) {
  if (functionInvocation.type === "call") {
    return (
      <FunctionCallDetails
        function={functionInvocation.function}
        result={functionInvocation.result}
      />
    );
  }

  if (functionInvocation.type === "transaction") {
    return (
      <FunctionTransactionDetails
        txnHash={functionInvocation.transaction.hash}
        txnReceipt={functionInvocation.transactionReceipt}
        timestamp={functionInvocation.timestamp}
        function={functionInvocation.function}
        logs={functionInvocation.decodedLogs}
        activeTransaction={activeTransaction}
        setActiveTransaction={setActiveTransaction}
      />
    );
  }

  return null;
}

export default function FunctionInvocationList({
  contract,
  functionInvocations,
  activeTransaction,
  setActiveTransaction,
  isClearable = false,
  clearFunctionInvocations,
  isExportable = false,
  exportTransactions,
}: FunctionInvocationProps) {
  const transactions = functionInvocations.filter(
    (fn: FunctionInvocation) => fn.type === "transaction"
  );
  return (
    <>
      {isExportable && exportTransactions && (
        <div className="space-y-2 mb-4">
          <Button
            theme="green"
            onClick={() => exportTransactions(contract, transactions)}
          >
            <Download className="h-4 w-4" />
            Export History
          </Button>
        </div>
      )}

      <div className="flex flex-col">
        {functionInvocations.map((functionInvocation, index) => (
          <InvocationItem
            key={index}
            functionInvocation={functionInvocation}
            activeTransaction={activeTransaction}
            setActiveTransaction={setActiveTransaction}
          />
        ))}
      </div>

      {isClearable && clearFunctionInvocations && (
        <div className="">
          <Button theme="red" onClick={() => clearFunctionInvocations()}>
            <OctagonX className="h-4 w-4" />
            Clear History
          </Button>
        </div>
      )}
    </>
  );
}
