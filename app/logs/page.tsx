import { CardDescription, CardTitle } from "@/components/ui/card";
import LogsList from "./logsList";
import { Log } from "@/types/logs.types";

export default async function LogsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logs/`);
  const logs: Log[] = await res.json();

  return (
    <>
      <div className="flex flex-col pt-6 pb-6 space-y-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <CardTitle>Logs</CardTitle>
            <CardDescription>Log details.</CardDescription>
          </div>
        </div>
      </div>
      <LogsList logs={logs} />
    </>
  );
}
