import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FunctionSelectOption {
  name: string;
  signature: string;
}

const FunctionSelect = ({
  name,
  functions,
  functionSignature,
  handleFunctionSelected,
}: {
  name: string;
  functions: FunctionSelectOption[];
  functionSignature: string;
  handleFunctionSelected: (value: string) => void;
}) => {
  return (
    <Select
      name={name}
      onValueChange={(value) => handleFunctionSelected(value)}
    >
      <SelectTrigger id="function-select">
        <SelectValue placeholder="Select function" />
      </SelectTrigger>
      <SelectContent>
        {functions.map((fn, i) => (
          <SelectItem key={i} value={fn.signature}>
            {fn.signature}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FunctionSelect;
