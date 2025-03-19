import { create } from "zustand"
import { persist } from "zustand/middleware"

interface valuesInterface {
  signature: string | undefined
  setSignature: (values: any) => void
}

export const useSignatureConnect = create<valuesInterface>()(
  persist(
    (set) => ({
      signature: undefined,
      setSignature: (signature: any) => set({ signature }),
    }),
    {
      name: "signature_connect",
    }
  )
)
