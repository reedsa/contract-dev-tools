"use client"

import { useState, useEffect } from "react"
import { Wallet, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Window {
  ethereum?: any
}

export function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true)

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== "undefined") {
      const { ethereum } = window as Window
      setIsMetaMaskInstalled(!!ethereum && !!ethereum.isMetaMask)

      // Check if already connected
      if (ethereum) {
        ethereum
          .request({ method: "eth_accounts" })
          .then((accounts: string[]) => {
            if (accounts.length > 0) {
              setAccount(accounts[0])
              ethereum.request({ method: "eth_chainId" }).then((chainId: string) => setChainId(chainId))
            }
          })
          .catch((err: Error) => console.error(err))

        // Listen for account changes
        ethereum.on("accountsChanged", (accounts: string[]) => {
          setAccount(accounts.length > 0 ? accounts[0] : null)
        })

        // Listen for chain changes
        ethereum.on("chainChanged", (chainId: string) => {
          setChainId(chainId)
          window.location.reload()
        })
      }
    }

    return () => {
      // Clean up listeners
      if (typeof window !== "undefined") {
        const { ethereum } = window as Window
        if (ethereum) {
          ethereum.removeAllListeners("accountsChanged")
          ethereum.removeAllListeners("chainChanged")
        }
      }
    }
  }, [])

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      const { ethereum } = window as Window
      if (!ethereum) {
        throw new Error("MetaMask is not installed")
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])

      const chainId = await ethereum.request({ method: "eth_chainId" })
      setChainId(chainId)

      // Check if on a testnet (Goerli, Sepolia, etc.)
      if (chainId !== "0x5" && chainId !== "0xaa36a7") {
        await switchToTestnet()
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const switchToTestnet = async () => {
    try {
      const { ethereum } = window as Window

      // Try to switch to Sepolia testnet
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }], // Sepolia
        })
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xaa36a7",
                chainName: "Sepolia Testnet",
                nativeCurrency: {
                  name: "Sepolia ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://sepolia.infura.io/v3/"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          })
        } else {
          throw switchError
        }
      }
    } catch (err: any) {
      console.error(err)
      setError("Failed to switch to testnet")
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const getNetworkName = () => {
    switch (chainId) {
      case "0x1":
        return "Ethereum Mainnet"
      case "0x5":
        return "Goerli Testnet"
      case "0xaa36a7":
        return "Sepolia Testnet"
      default:
        return "Unknown Network"
    }
  }

  return (
    <>
      {!isMetaMaskInstalled ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Wallet className="mr-2 h-4 w-4" />
              Install Wallet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>MetaMask Required</DialogTitle>
              <DialogDescription>You need to install MetaMask to use this application.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                MetaMask is a browser extension that allows you to interact with the Ethereum blockchain.
              </p>
              <Button asChild>
                <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Install MetaMask
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : account ? (
        <div className="flex items-center gap-2">
          <div className="hidden md:block text-sm text-muted-foreground">{getNetworkName()}</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                {formatAddress(account)}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Wallet Connected</DialogTitle>
                <DialogDescription>Your wallet is connected to popupstream.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-xs text-muted-foreground break-all">{account}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Network</p>
                  <p className="text-xs text-muted-foreground">{getNetworkName()}</p>
                </div>
                <Button variant="outline" onClick={disconnectWallet}>
                  Disconnect Wallet
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Button onClick={connectWallet} disabled={isConnecting}>
          <Wallet className="mr-2 h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  )
}
