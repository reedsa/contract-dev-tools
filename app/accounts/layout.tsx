import { Card, CardContent } from "@/components/ui/card";
import { TransferModalProvider } from "@/app/context/transferModalContext";
import { TransferFormProvider } from "@/app/context/transferFormContext";

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransferModalProvider>
      <TransferFormProvider>
        <Card className="min-w-2xl">
          <CardContent>{children}</CardContent>
        </Card>
      </TransferFormProvider>
    </TransferModalProvider>
  );
}
