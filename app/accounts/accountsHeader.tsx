import { CardDescription, CardTitle } from "@/components/ui/card";
import AddAccountButton from "./addAccountButton";
import TransferButton from "./transferButton";

export default function AccountsHeader() {
  return (
    <div className="flex flex-col p-6 pb-3 space-y-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle>Accounts</CardTitle>
          <CardDescription>
            Active accounts for the current session.
          </CardDescription>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <AddAccountButton />
          <TransferButton />
        </div>
      </div>
    </div>
  );
}
