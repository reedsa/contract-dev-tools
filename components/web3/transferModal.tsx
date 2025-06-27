import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransferFormContext } from "@/app/context/transferFormContext";
import { useSubmitForm } from "@/hooks/useSubmitForm";
import { FormEvent } from "react";
import { useTransferModalContext } from "@/app/context/transferModalContext";
import { useToast } from "@/app/context/toastContext";
import { shortenAddress } from "@/lib/utils";

export const TransferModal = () => {
  const {
    formData: { from, to, amount },
    setFormField,
  } = useTransferFormContext();
  const { transferModalOpen, toggleTransferModalVisibility } =
    useTransferModalContext();
  const { submit, isLoading, error } = useSubmitForm(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/transfer`
  );
  const { showToast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = await submit(data);

    if (result.success) {
      showToast({
        title: "Transfer Successful",
        description: `Successfully transferred ${amount} ETH from ${shortenAddress(
          from
        )} to ${shortenAddress(to)}`,
        variant: "default",
      });
      toggleTransferModalVisibility();
    }
  };

  return (
    <Dialog
      open={transferModalOpen}
      onOpenChange={toggleTransferModalVisibility}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer funds</DialogTitle>
        </DialogHeader>
        <DialogDescription>Transfer funds between accounts.</DialogDescription>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col gap-4">
            <label htmlFor="from">From</label>
            <Input
              id="from"
              name="from"
              value={from}
              onChange={(e) => setFormField("from", e.target.value)}
              placeholder="0x..."
              title="From address"
            />
            <label htmlFor="to">To</label>
            <Input
              id="to"
              name="to"
              value={to}
              onChange={(e) => setFormField("to", e.target.value)}
              placeholder="0x..."
              title="To address"
            />
            <label htmlFor="amount">Amount</label>
            <div className="flex flex-row items-center gap-2">
              <Input
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setFormField("amount", e.target.value)}
                placeholder="0.000 ETH"
                type="number"
                step="0.001"
                title="Amount (ETH)"
              />
              <span>ETH</span>
            </div>
          </div>
          <div className="flex flex-row justify-end mt-4 gap-2">
            <Button
              variant="outline"
              onClick={() => toggleTransferModalVisibility()}
              title="Cancel"
            >
              Cancel
            </Button>
            <Button
              theme="blue"
              type="submit"
              title="Submit transfer"
              disabled={isLoading}
            >
              {isLoading ? "Transferring..." : "Transfer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
