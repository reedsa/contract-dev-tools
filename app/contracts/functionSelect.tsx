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
  functions,
  selectedFunctionSignature,
  handleFunctionSelected,
}: {
  functions: FunctionSelectOption[];
  selectedFunctionSignature: string;
  handleFunctionSelected: (value: string) => void;
}) => {
  return (
    <Select onValueChange={(value) => handleFunctionSelected(value)}>
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
