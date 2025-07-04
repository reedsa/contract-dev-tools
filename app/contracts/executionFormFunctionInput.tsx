import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FunctionInputProps {
  input: {
    name: string;
    type: string;
  };
  handleInputChange: (e: any) => void;
}

const ExecutionFormInput = ({
  input,
  handleInputChange,
}: FunctionInputProps) => {
  let placeholder: string;
  let units: string;

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
        className="font-bold text-right items-center w-1/4"
      >
        {input.name.charAt(0).toUpperCase() + input.name.slice(1)}
      </Label>
      <div className="flex flex-row gap-2 items-center w-3/4">
        <Input
          type="text"
          id={input.name}
          placeholder={placeholder}
          onChange={handleInputChange}
          className="input w-full"
        />
        {units && <p className="text-sm text-gray-500">{units}</p>}
      </div>
    </div>
  );
};

export default ExecutionFormInput;
