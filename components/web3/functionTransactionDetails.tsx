import {
  ContractFunction,
  ContractFunctionInput,
  FunctionAbiInput,
} from "@/types/contract.types";
import {
  Log,
  LogReceipt,
  TransactionHash,
} from "@/types/functionInvocation.types";
import { ChevronDown, ChevronRight, ChevronUp, Star } from "lucide-react";
import { TransactionLog } from "./transactionLog";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Expandable } from "../ui/expandable";

interface FunctionTransactionDetailsProps {
  txnHash: string;
  txnReceipt: any;
  timestamp: number;
  function: ContractFunction;
  logs: Log[];
  activeTransaction: TransactionHash;
  setActiveTransaction: (transaction: TransactionHash) => void;
}

// function ExpandableSection({
//   title,
//   theme = "gray",
//   children,
// }: {
//   title: string;
//   theme?: "gray" | "blue";
//   children: React.ReactNode;
// }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="text-xs ml-5 text-muted-foreground bg-gray-50 rounded-lg border-1 p-1">
//       <div
//         className="flex items-center cursor-pointer"
//         onClick={() => setOpen(!open)}
//       >
//         <div className="flex h-5 w-5 items-center justify-center">
//           {open ? (
//             <ChevronDown className="h-3 w-3 text-primary" />
//           ) : (
//             <ChevronRight className="h-3 w-3 text-primary" />
//           )}
//         </div>
//         <p className="text-xs font-bold">{title}</p>
//       </div>
//       {open && children}
//     </div>
//   );
// }

export default function functionTransactionDetails({
  txnHash,
  txnReceipt,
  timestamp,
  function: contractFunction,
  logs,
  activeTransaction,
  setActiveTransaction,
}: FunctionTransactionDetailsProps) {
  const isActive = useMemo(() => {
    return activeTransaction === txnHash;
  }, [activeTransaction, txnHash]);

  let inputs: ContractFunctionInput[] = [];
  if (contractFunction.abi.inputs.length > 0) {
    inputs = contractFunction.abi.inputs.map((input) => ({
      name: input.name,
      type: input.type,
      value: contractFunction.args[input.name]?.value,
    }));
  }

  return (
    <div className="flex flex-col space-y-2 mb-4 rounded-lg border p-3 bg-gray-100 text-gray-900 border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex-auto mb-2">
          <div
            className="font-bold flex items-center mb-2 cursor-pointer"
            onClick={() => setActiveTransaction(txnHash)}
          >
            {isActive ? (
              <Star className="h-4 w-4 mr-1 text-primary" fill="currentColor" />
            ) : (
              <Star className="h-4 w-4 mr-1" />
            )}
            <h3>{contractFunction.signature}</h3>
          </div>
          <div className="">
            {"from" in txnReceipt && (
              <p className="text-x">From: {txnReceipt.from}</p>
            )}
            {inputs.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-bold">Function inputs:</p>
                {inputs.map((input, index) => (
                  <p key={index} className="text-xs">
                    {input.name} ({input.type}): {input.value}
                  </p>
                ))}
              </div>
            )}
            <p className="text-xs font-bold">Transaction hash:</p>
            <p className="text-xs">{txnHash}</p>
          </div>
        </div>
      </div>
      <Expandable title="Transaction receipt" variant="yellow">
        <pre className="h-50 max-w-full break-all whitespace-pre-wrap overflow-auto bg-white rounded-lg border-1 p-2 mt-1">
          {JSON.stringify(txnReceipt, null, 2)}
        </pre>
      </Expandable>
      {logs.length > 0 && (
        <Expandable title="Events" variant="yellow">
          {logs.map((log, index) => (
            <TransactionLog
              key={index}
              log={log}
              timestamp={log.blockTimestamp}
              blockNumber={log.blockNumber}
            />
          ))}
        </Expandable>
      )}
    </div>
  );
}
