import { useErrorSign } from "@/store/usErrorSign"
import { useSignMessage } from "wagmi"

import useWagmiAccount from "@/hooks/useWagmiAccount"

import SwitchNetwork from "./switch_network"

export function Account() {
  const { setErrorSign } = useErrorSign()
  const { address, disconnect } = useWagmiAccount()
  const { signMessage } = useSignMessage({
    mutation: {
      onError(error, variables, context) {
        setErrorSign(error.message)
      },
      onSuccess(data, variables, context) {
        setErrorSign(undefined)
      },
    },
  })

  return (
    <div>
      <div className="text-xl font-bold">Account</div>
      {address && <div>{address}</div>}
      <div className="flex flex-row gap-2">
        <button
          className="mb-5 rounded-md border border-white p-2"
          onClick={() => signMessage({ message: "Hello sign" })}
        >
          Sign message
        </button>
        <button
          className="mb-5 rounded-md border border-white p-2"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>

      <SwitchNetwork />
    </div>
  )
}
