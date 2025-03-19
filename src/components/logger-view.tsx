import { useEffect, useState } from "react"
import { useErrorConnect } from "@/store/usErrorConnect"
import { useErrorSign } from "@/store/usErrorSign"
import { useErrorSwitch } from "@/store/usErrorSwitch"
import { useSignatureConnect } from "@/store/useSignatureConnect"
import { UAParser } from "ua-parser-js"
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi"

import useWagmiAccount from "@/hooks/useWagmiAccount"

export function LoggerView() {
  const { isConnected, address, connector } = useWagmiAccount()
  const { signature } = useSignatureConnect()
  const { errorSign } = useErrorSign()
  const { errorSwitch } = useErrorSwitch()
  const { errorConnect } = useErrorConnect()
  const [ua, setUa] = useState<any>()

  useEffect(() => {
    if (window) {
      setUa(typeof navigator === "undefined" ? "SSR" : navigator.userAgent)
    }
  }, [])

  const LogItem = ({ title, value }: any) => {
    return (
      <div className="flex flex-row">
        <div className="w-[120px]">{title}</div>
        <div className="mx-5">:</div>
        <div className="break-all">{value ?? "-"}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div>Logger : </div>
      <LogItem title="isConnected" value={isConnected.toString()} />
      <LogItem title="Connector" value={connector} />
      <LogItem title="Address" value={address} />
      <LogItem title="Signature" value={signature} />
      <LogItem title="Error Connect" value={errorConnect} />
      <LogItem title="Error Sign" value={errorSign} />
      <LogItem title="Error Switch" value={errorSwitch} />
      <LogItem title="User agent" value={ua} />
    </div>
  )
}
