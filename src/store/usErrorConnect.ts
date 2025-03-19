import { create } from "zustand"
import { persist } from "zustand/middleware"

interface valuesInterface {
  errorConnect: string | undefined
  setErrorConnect: (values: any) => void
}

export const useErrorConnect = create<valuesInterface>()(
  persist(
    (set) => ({
      errorConnect: undefined,
      setErrorConnect: (errorConnect: any) => set({ errorConnect }),
    }),
    {
      name: "error_connect",
    }
  )
)
