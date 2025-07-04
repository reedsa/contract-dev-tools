import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Account, Address } from "@/types/accounts.types";

function AccountSelect({
  name,
  accounts,
  defaultAccount,
  selectedAccount,
  setSelectedAccount,
}: {
  name: string;
  accounts: Account[];
  defaultAccount: Address;
  selectedAccount: string;
  setSelectedAccount: (account: string) => void;
}) {
  return (
    <Select
      name={name}
      defaultValue={defaultAccount}
      onValueChange={(value) => setSelectedAccount(value)}
    >
      <SelectTrigger id="account-select">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account, i) => (
          <SelectItem key={i} value={account.address}>
            {account.address}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default AccountSelect;
