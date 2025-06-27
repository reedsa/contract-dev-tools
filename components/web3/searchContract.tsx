import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Address } from "@/types/accounts.types";
import { AlertCircle, Save, Search } from "lucide-react";
import { useState } from "react";

interface SearchContractProps {
  activeContractAddress: Address;
  searchContract: (address: Address) => void;
  error: string | null;
  showSuccess: boolean;
  isSearching: boolean;
}
export default function SearchContract({
  activeContractAddress,
  searchContract,
  error,
  showSuccess,
  isSearching,
}: SearchContractProps) {
  const [searchInput, setSearchInput] = useState<Address>(
    activeContractAddress
  );

  const handleSearch = () => {
    searchContract(searchInput);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="contract-address">Contract Address</Label>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {showSuccess && (
        <Alert className="bg-green-50 text-green-900 border-green-200">
          <Save className="h-4 w-4 text-green-900" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Contract found at address {searchInput}
          </AlertDescription>
        </Alert>
      )}
      <div className="flex gap-2">
        <Input
          id="contract-address"
          placeholder="0x..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
          <Search className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
