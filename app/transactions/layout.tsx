import { Card, CardContent } from "@/components/ui/card";

export default function TransactionsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="min-w-2xl">
      <CardContent>{children}</CardContent>
    </Card>
  );
}
