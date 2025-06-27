import { SkipBack, SkipForward, StepBack, StepForward } from "lucide-react";
import { Button } from "@/components/ui/button";

// function ControlButton({
//   icon,
//   onClick,
// }: {
//   icon: React.ReactNode;
//   onClick: () => void;
// }) {
//   return (
//     <div
//       className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-100 hover:bg-blue-200 cursor-pointer"
//       onClick={onClick}
//     >
//       {icon}
//     </div>
//   );
// }

export default function FunctionInvocationSliderControl({
  txnCount,
  rangeValue,
  handleSkipBack,
  handleStepBack,
  handleStepForward,
  handleSkipForward,
  handleSliderChange,
}: {
  txnCount: number | undefined;
  rangeValue: number | undefined;
  handleSkipBack: () => void;
  handleStepBack: () => void;
  handleStepForward: () => void;
  handleSkipForward: () => void;
  handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-center space-x-2 mt-4">
        <Button theme="blue" shape="rounded" onClick={handleSkipBack}>
          <SkipBack className="h-5 w-5 text-primary" />
        </Button>
        <Button theme="blue" shape="rounded" onClick={handleStepBack}>
          <StepBack className="h-5 w-5 text-primary" />
        </Button>
        <Button theme="blue" shape="rounded" onClick={handleStepForward}>
          <StepForward className="h-5 w-5 text-primary" />
        </Button>
        <Button theme="blue" shape="rounded" onClick={handleSkipForward}>
          <SkipForward className="h-5 w-5 text-primary" />
        </Button>
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <input
          type="range"
          min="0"
          max={txnCount ? txnCount - 1 : 0}
          value={rangeValue && rangeValue.toString()}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          onChange={handleSliderChange}
        />
      </div>
    </>
  );
}
