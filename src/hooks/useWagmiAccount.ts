import { usePathname, useRouter } from "next/navigation"
import { useErrorConnect } from "@/store/usErrorConnect"
import { useErrorSign } from "@/store/usErrorSign"
import { useErrorSwitch } from "@/store/usErrorSwitch"
import { useSignatureConnect } from "@/store/useSignatureConnect"
import { useAccount, useDisconnect } from "wagmi"

import { config } from "@/app/config"

const useWagmiAccount = (isReload?: any) => {
  const router = useRouter()
  const pathname = usePathname()

  const { setSignature } = useSignatureConnect()
  const { setErrorConnect } = useErrorConnect()
  const { setErrorSign } = useErrorSign()
  const { setErrorSwitch } = useErrorSwitch()

  // evm
  const {
    address,
    isConnected: isEvmConnected,
    connector,
  } = useAccount({ config })
  const { disconnect } = useDisconnect({ config })

  const normiesDisconnect = async () => {
    // disconnect evm
    if (isEvmConnected) {
      if (connector?.name === "WalletConnect") {
        await connector?.disconnect()
      } else {
        disconnect()
      }
    }

    setTimeout(() => {
      setSignature(undefined)
      setErrorConnect(undefined)
      setErrorSign(undefined)
      setErrorSwitch(undefined)

      if (isReload || isReload === undefined) {
        router.refresh()
      } else {
        router.push(pathname)
      }
    }, 250)
  }

  if (isEvmConnected) {
    return {
      type: "evm",
      isConnected: isEvmConnected,
      address: address,
      connector: connector?.name,
      disconnect: normiesDisconnect,
    }
  } else {
    return {
      type: undefined,
      isConnected: false,
      address: undefined,
      connector: undefined,
      disconnect: normiesDisconnect,
    }
  }
}

export default useWagmiAccount
