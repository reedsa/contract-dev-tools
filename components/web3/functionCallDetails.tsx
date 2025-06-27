import { ContractFunction, FunctionAbi } from "@/types/contract.types";
import { Star } from "lucide-react";

interface FunctionCallDetailsProps {
  function: ContractFunction;
  result: string;
}

const stringOutput = (result: string) => <div className="mb-2">{result}</div>;

const arrayOutput = (result: any[], abi: FunctionAbi) => {
  const outputs_map = abi.outputs.map((output, index) => {
    let output_item = {
      name: output.name,
      type: output.type,
      value: result[index],
    };

    return output_item;
  });

  return (
    <div className="mb-2">
      {outputs_map.map((output, index) => (
        <p key={index} className="text-xs">
          {output.name} ({output.type}): {output.value}
        </p>
      ))}
    </div>
  );
};

function getOutputs(result: any, abi: FunctionAbi) {
  if (typeof result === "string") {
    return stringOutput(result);
  }

  if (Array.isArray(result)) {
    return arrayOutput(result, abi);
  }

  return result;
}

export default function FunctionCallDetails({
  function: contractFunction,
  result,
}: FunctionCallDetailsProps) {
  const inputs = contractFunction.abi.inputs.map((input) => ({
    name: input.name,
    type: input.type,
    value: contractFunction.args.find((arg: any) => arg.name === input.name)
      ?.value,
  }));

  return (
    <div className="flex flex-col space-y-2 mb-4 rounded-lg border p-3 bg-orange-50 text-orange-900 border-orange-200">
      <div className="flex items-center gap-4">
        <div className="flex-auto mb-2">
          <div className="font-bold flex items-center mb-2">
            <Star className="h-4 w-4 mr-1" />
            <h3>{contractFunction.signature}</h3>
          </div>
          <div className="ml-5">
            {inputs.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-bold">Function inputs:</p>
                {inputs.map((input, index) => (
                  <p key={index} className="text-xs">
                    {input.name} ({input.type}): {input.value}
                  </p>
                ))}
              </div>
            )}
            <p className="text-xs font-bold">Result:</p>
            {getOutputs(result, contractFunction.abi)}
          </div>
        </div>
      </div>
    </div>
  );
}
