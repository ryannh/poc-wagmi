import { create } from "zustand"
import { persist } from "zustand/middleware"

interface valuesInterface {
  errorSwitch: string | undefined
  setErrorSwitch: (values: any) => void
}

export const useErrorSwitch = create<valuesInterface>()(
  persist(
    (set) => ({
      errorSwitch: undefined,
      setErrorSwitch: (errorSwitch: any) => set({ errorSwitch }),
    }),
    {
      name: "error_switch",
    }
  )
)
