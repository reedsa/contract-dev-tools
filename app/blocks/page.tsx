import { CardDescription, CardTitle } from "@/components/ui/card";
import BlocksList from "./blocksList";
import { Block } from "@/types/blocks.types";

export default async function BlocksPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blocks/`);
  const blocks: Block[] = await res.json();

  return (
    <>
      <div className="flex flex-col pt-6 pb-6 space-y-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <CardTitle>Blocks</CardTitle>
            <CardDescription>Latest blocks.</CardDescription>
          </div>
        </div>
      </div>
      <BlocksList blocks={blocks} />
    </>
  );
}
