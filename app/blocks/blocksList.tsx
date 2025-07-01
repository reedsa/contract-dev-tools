"use client";

import { Block as BlockType } from "@/types/blocks.types";
import Block from "./block";

export default function BlocksList({ blocks }: { blocks: BlockType[] }) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-4">
        {blocks.length > 0 &&
          blocks.map((block) => <Block key={block.hash} block={block} />)}
      </div>
    </div>
  );
}
