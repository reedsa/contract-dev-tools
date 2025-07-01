"use client";

import { Log as LogType } from "@/types/logs.types";
import Log from "./log";

export default function LogsList({ logs }: { logs: LogType[] }) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-4">
        {logs.map((log) => (
          <Log key={log.hash} log={log} />
        ))}
      </div>
    </div>
  );
}
