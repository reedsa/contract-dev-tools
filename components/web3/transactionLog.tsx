import { Log } from "@/types/functionInvocation.types";

export function TransactionLog({
  log,
  timestamp,
  blockNumber,
}: {
  log: Log;
  timestamp: number;
  blockNumber: number;
}) {
  return (
    <div className="text-xs bg-white rounded-lg border-1 p-1 mt-1">
      <div className="m-2">
        <p className="text-sm font-medium">{log.signature}</p>
        <p className="text-xs font-bold">{log.summary}</p>
      </div>
      <div className="m-2 text-xs">
        <div className="flex flex-row">
          <div className="font-bold mr-1">Timestamp:</div>
          <div>{timestamp}</div>
        </div>
        <div className="flex flex-row">
          <div className="font-bold mr-1">Block number:</div>
          <div>{blockNumber}</div>
        </div>
      </div>
    </div>
  );
}
