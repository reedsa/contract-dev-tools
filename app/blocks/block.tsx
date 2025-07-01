import { Block as BlockType } from "@/types/blocks.types";
import { Container } from "lucide-react";

export default function Block({ block }: { block: BlockType }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-3 bg-green-100/30">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Container className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{block.number}</p>
        <p className="text-xs text-muted-foreground">{block.timestamp}</p>
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{block.hash}</p>
        <p className="text-xs text-muted-foreground">
          {block.transactions.length} transactions
        </p>
      </div>
    </div>
  );
}
