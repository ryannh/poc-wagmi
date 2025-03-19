import { create } from "zustand"
import { persist } from "zustand/middleware"

interface valuesInterface {
  errorSign: string | undefined
  setErrorSign: (values: any) => void
}

export const useErrorSign = create<valuesInterface>()(
  persist(
    (set) => ({
      errorSign: undefined,
      setErrorSign: (errorSign: any) => set({ errorSign }),
    }),
    {
      name: "error_sign",
    }
  )
)
