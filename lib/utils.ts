import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Shortens an Ethereum address by showing the first 6 and last 4 characters
 * @param address - The full Ethereum address
 * @param startChars - Number of characters to show at the start (default: 6)
 * @param endChars - Number of characters to show at the end (default: 4)
 * @returns Shortened address with ellipsis in the middle
 */
export function shortenAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string {
  if (!address || address.length < startChars + endChars) {
    return address;
  }

  const start = address.slice(0, startChars);
  const end = address.slice(-endChars);

  return `${start}...${end}`;
}

/**
 * Converts Ethereum (ETH) to wei
 * 1 ETH = 10^18 wei
 * @param eth - The amount in ETH to convert
 * @returns The equivalent amount in wei as a BigInt
 */
export function ethToWei(eth: number | string): bigint {
  // Parse the input to a number if it's a string
  const ethAmount = typeof eth === "string" ? parseFloat(eth) : eth;

  // Convert to wei (1 ETH = 10^18 wei)
  return BigInt(Math.round(ethAmount * 10 ** 18));
}

/**
 * Converts wei to Ethereum (ETH)
 * 1 wei = 10^-18 ETH
 * @param wei - The amount in wei to convert (as a BigInt or string)
 * @returns The equivalent amount in ETH as a number
 */
export function weiToEth(wei: number | bigint | string): number {
  // Convert string to BigInt if needed
  const weiAmount = typeof wei === "string" ? BigInt(wei) : wei;

  // Convert to ETH
  return Number(weiAmount) / 10 ** 18;
}

// Utility function to convert a string to snake_case
export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
};
