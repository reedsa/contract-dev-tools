import { Card, CardContent } from "@/components/ui/card";

export default function LogsLayout({
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
