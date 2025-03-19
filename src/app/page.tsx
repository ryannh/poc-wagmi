"use client"

import { useSignatureConnect } from "@/store/useSignatureConnect"

import useWagmiAccount from "@/hooks/useWagmiAccount"
import { Account } from "@/components/account"
import ConnectSignature from "@/components/connect-signature"
import { LoggerView } from "@/components/logger-view"
import { WalletOptions } from "@/components/wallet-option"

export default function Home() {
  const { isConnected } = useWagmiAccount()
  const { signature } = useSignatureConnect()
  return (
    <div className="flex flex-row gap-2 p-4">
      <div className="w-[50%]">
        {isConnected ? (
          signature ? (
            <Account />
          ) : (
            <ConnectSignature />
          )
        ) : (
          <WalletOptions />
        )}
      </div>
      <div className="w-[50%]">
        <LoggerView />
      </div>
    </div>
  )
}
