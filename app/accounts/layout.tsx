import { Card } from "@/components/ui/card";
import { TransferModalProvider } from "@/app/context/transferModalContext";
import { TransferFormProvider } from "@/app/context/transferFormContext";
import AccountsHeader from "./accountsHeader";

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransferModalProvider>
      <TransferFormProvider>
        <Card>
          <AccountsHeader />
          {children}
        </Card>
      </TransferFormProvider>
    </TransferModalProvider>
  );
}
