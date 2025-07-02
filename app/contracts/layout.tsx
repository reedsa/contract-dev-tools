import { Card, CardContent } from "@/components/ui/card";
import { ImportContractFormProvider } from "../context/importContractFormContext";
import { ImportContractModalProvider } from "../context/importContractModalContext";

export default function ContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ImportContractModalProvider>
      <ImportContractFormProvider>{children}</ImportContractFormProvider>
    </ImportContractModalProvider>
  );
}
