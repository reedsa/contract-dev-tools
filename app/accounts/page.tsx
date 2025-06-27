import { CardContent } from "@/components/ui/card";
import AccountsManager from "./accountsManager";

export default async function AccountsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/`);
  const accounts = await res.json();

  return (
    <CardContent>
      <div className="grid gap-4">
        <AccountsManager accounts={accounts} />
      </div>
    </CardContent>
  );
}
