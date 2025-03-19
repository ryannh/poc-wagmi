import { useErrorSign } from "@/store/usErrorSign"
import { useSignatureConnect } from "@/store/useSignatureConnect"
import { useSignMessage } from "wagmi"
import errorMap from "zod/locales/en.js"

import useWagmiAccount from "@/hooks/useWagmiAccount"

const ConnectSignature = () => {
  const { setErrorSign } = useErrorSign()
  const { setSignature } = useSignatureConnect()
  const { address } = useWagmiAccount()
  const { signMessage } = useSignMessage({
    mutation: {
      onSuccess(data, variables, context) {
        setErrorSign(undefined)
        setSignature(data)
      },
      onError(error, variables, context) {
        setErrorSign(error.message)
      },
    },
  })

  return (
    <div>
      <div>Please sign message get full access</div>
      <button
        className="rounded-md border border-white p-2"
        onClick={() => {
          signMessage({ message: `Confirm your account : ${address}` })
        }}
      >
        Sign connect
      </button>
    </div>
  )
}

export default ConnectSignature
