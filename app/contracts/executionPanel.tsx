import { FormEvent, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import FunctionSelect from "./functionSelect";
import AccountSelect from "./accountSelect";
import { useSelectedContract } from "../context/selectedContractContext";
import { Function as FunctionType } from "@/types/contracts.types";
import { useAccountsContext } from "../context/accountsContext";
import { useSubmitForm } from "@/hooks/useSubmitForm";
import { useToast } from "@/app/context/toastContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FunctionParamsInput from "./functionParamsInput";
import { ethToWei } from "@/lib/utils";

interface FunctionInput {
  type: string;
  value: string;
}

type ExecuteFunctionFormData = Record<string, FunctionInput | string>;

const ExecutionPanel = () => {
  const { accounts, defaultAccount } = useAccountsContext();
  const { selectedContract } = useSelectedContract();
  const functions: FunctionType[] =
    selectedContract?.abi?.filter((item) => item.type === "function") || [];

  const defaultFormData = {
    functionSignature: "",
    transactionArgsFrom: defaultAccount,
    transactionArgsValue: "0.001",
  };

  const { showToast } = useToast();

  const [formData, setFormData] =
    useState<ExecuteFunctionFormData>(defaultFormData);

  const selectedFunction = functions.find(
    (func) => func.signature === formData.functionSignature
  );

  const initializeForm = (formData: ExecuteFunctionFormData) => {
    setFormData(formData);
  };

  const setFormField = <K extends keyof ExecuteFunctionFormData>(
    field: K,
    value: ExecuteFunctionFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
  };

  const { submit, isLoading, error } = useSubmitForm(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts`
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let args: any[] = [];
    // Loop over function inputs to guarantee ordered list of arguments
    selectedFunction?.inputs.forEach((input) => {
      Object.entries(data).forEach(([key, value]) => {
        if (`functionArg[${input.name}]` === key) {
          delete data[key]; // Remove the input from data to avoid sending it as a separate field
          // Convert value to the correct type based on the input type
          if (input.type === "uint256") {
            args.push(ethToWei(value as string).toString());
          } else {
            args.push((value as string).trim());
          }
        }
      });
    });

    const _isFunctionTransactable =
      selectedFunction?.stateMutability === "nonpayable" ||
      selectedFunction?.stateMutability === "payable";

    let result;
    if (_isFunctionTransactable) {
      const transactionArgs = {
        from: data["transactionArg[from]"] as string,
      } as { from: string; value: string }; // Type assertion to ignore type error

      if (data["transactionArg[value]"]) {
        transactionArgs.value = ethToWei(
          data["transactionArg[value]"] as string
        ).toString();
      } else {
        transactionArgs.value = "0";
      }
      delete data["transactionArg[from]"];
      delete data["transactionArg[value]"];

      result = await submit({ ...data, transactionArgs, args }, "/transact");
    } else {
      delete data["transactionArg[from]"];
      delete data["transactionArg[value]"];
      result = await submit({ ...data, args }, "/call");
    }

    if (result.success) {
      showToast({
        title: _isFunctionTransactable
          ? "Transaction complete"
          : "Function executed",
        description: _isFunctionTransactable
          ? "View transaction"
          : "Show response",
        variant: "default",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedFunction) return;

    const { id, value } = e.target;

    const type = selectedFunction.inputs.find(
      (input) => input.name === id
    )?.type;

    if (!type) {
      throw Error("Invalid input, function input type was not found.");
    }

    setFormField(`functionInput${id}`, { type: type, value: value });
  };

  const isFunctionTransactable =
    selectedFunction?.stateMutability === "nonpayable" ||
    selectedFunction?.stateMutability === "payable";

  return (
    <div className="flex flex-col pt-6 pb-6 space-y-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle>Execute Functions</CardTitle>
          <CardDescription>
            This is the execution panel for the selected contract. Here you can
            execute transactions and interact with the contract.
          </CardDescription>
        </div>
      </div>
      <>
        {!selectedContract && (
          <Alert variant="default">
            <InfoIcon className="h-4 w-4" />
            <p className="text-sm font-medium">
              Please import or select a contract to execute functions.
            </p>
          </Alert>
        )}
        {selectedContract && (
          <form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="contractAddress"
              value={selectedContract.address}
            />
            <div className="flex flex-col gap-4 justify-between">
              <div className="space-y-2 w-full border p-4 rounded-lg bg-blue-50">
                <Label htmlFor="function-select" className="font-bold">
                  Function
                </Label>
                <FunctionSelect
                  name="functionSignature"
                  functions={functions}
                  functionSignature={
                    formData.functionSignature === "string"
                      ? formData.functionSignature
                      : ""
                  }
                  handleFunctionSelected={(value) => {
                    const selectedFunc = functions.find(
                      (func) => func.signature === value
                    );
                    setFormField("functionSignature", value);
                    setFormField(
                      "functionStateMutability",
                      selectedFunc?.stateMutability || ""
                    );
                  }}
                />

                {selectedFunction && selectedFunction.stateMutability && (
                  <Alert variant="info">
                    <InfoIcon className="h-4 w-4" />
                    <p className="text-sm font-medium">
                      This function is a {selectedFunction.stateMutability}{" "}
                      function.
                    </p>
                  </Alert>
                )}
              </div>

              {selectedFunction && (
                <>
                  {isFunctionTransactable && (
                    <div className="border p-4 rounded-lg bg-gray-100 flex flex-col gap-2">
                      <p className="text-md font-bold">Transaction arguments</p>
                      <div className="flex flex-row items-center gap-2">
                        <Label
                          htmlFor="function-select"
                          className="font-bold text-right w-1/8"
                        >
                          Sender
                        </Label>
                        <div className="w-7/8">
                          <AccountSelect
                            name="transactionArg[from]"
                            accounts={accounts}
                            defaultAccount={defaultAccount}
                            selectedAccount={
                              typeof formData.transactionArgsFrom === "string"
                                ? formData.transactionArgsFrom
                                : defaultAccount
                            }
                            setSelectedAccount={(value) =>
                              setFormField("transactionArg[from]", value)
                            }
                          />
                        </div>
                      </div>
                      {isFunctionTransactable &&
                        selectedFunction.stateMutability === "payable" && (
                          <div className="flex flex-row gap-2 items-center">
                            <Label
                              htmlFor="transaction-value"
                              className="font-bold text-right w-1/8"
                            >
                              Value
                            </Label>
                            <div className="flex flex-row gap-2 items-center w-7/8">
                              <Input
                                name="transactionArg[value]"
                                type="number"
                                id="transaction-args-value"
                                placeholder={
                                  defaultFormData.transactionArgsValue
                                }
                                step="0.0001"
                                onChange={(e) =>
                                  setFormField(
                                    "transactionArg[value]",
                                    e.target.value
                                  )
                                }
                                value={
                                  typeof formData.transactionArgsValue ===
                                  "string"
                                    ? formData.transactionArgsValue
                                    : defaultFormData.transactionArgsValue
                                }
                                className="input w-full"
                              />
                              <p className="text-sm text-gray-500">ETH</p>
                            </div>
                          </div>
                        )}
                    </div>
                  )}

                  {selectedFunction.inputs.length > 0 && (
                    <div className="border p-4 rounded-lg bg-gray-100 flex flex-col gap-2">
                      <Label
                        htmlFor="default-event-subscription"
                        className="text-md font-bold"
                      >
                        Function Arguments
                      </Label>
                      <div className="">
                        {selectedFunction.inputs.map((input, i) => (
                          <FunctionParamsInput
                            key={i}
                            input={input}
                            onChange={handleInputChange}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Button
                      theme="blue"
                      type="submit"
                      title="Submit"
                      disabled={isLoading}
                    >
                      {isFunctionTransactable
                        ? isLoading
                          ? "Sending Transaction..."
                          : "Send Transaction"
                        : isLoading
                        ? "Calling Function..."
                        : "Call Function"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </form>
        )}
      </>
    </div>
  );
};

export default ExecutionPanel;
