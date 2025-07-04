import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FunctionInputsInputProps {
  input: {
    name: string;
    type: string;
  };
  onChange: (e: any) => void;
}

function FunctionParamsInput({ input, onChange }: FunctionInputsInputProps) {
  let placeholder: string;
  let units: string;

  const [inputValue, setInputValue] = useState(
    input.type === "uint256" ? "0.0001" : ""
  );

  if (input.type === "address") {
    placeholder = "0x...";
    units = "";
  } else if (input.type === "uint256") {
    placeholder = "0.0001";
    units = "ETH";
  } else {
    placeholder = "";
    units = input.type;
  }
  return (
    <div className="flex flex-row gap-2 items-center">
      <Label
        htmlFor={input.name}
        className="font-bold text-right items-center w-1/8"
      >
        {input.name.charAt(0).toUpperCase() + input.name.slice(1)}
      </Label>
      <div className="flex flex-row gap-2 items-center w-7/8">
        <Input
          name={`functionArg[${input.name}]`}
          type={input.type === "uint256" ? "number" : "text"}
          id={input.name}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e);
          }}
          className="input w-full"
        />
        {units && <p className="text-sm text-gray-500">{units}</p>}
      </div>
    </div>
  );
}

export default FunctionParamsInput;
