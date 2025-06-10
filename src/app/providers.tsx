"use client"

import { useEffect, useState, type ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import TelegramAnalytics from "@telegram-apps/analytics"
import { WagmiProvider, type State } from "wagmi"

import { useIsTelegramMiniApp } from "@/hooks/useIsTelegramMiniApp"

import { config } from "./config"

type Props = {
  children: ReactNode
  initialState: State | undefined
}

export function Providers({ children, initialState }: Props) {
  const [queryClient] = useState(() => new QueryClient())

  const isTMA = useIsTelegramMiniApp()
  useEffect(() => {
    const token =
      "eyJhcHBfbmFtZSI6InNlcl9yeWFuX2JvdCIsImFwcF91cmwiOiJodHRwczovL3QubWUvc2VyX3J5YW5fYm90IiwiYXBwX2RvbWFpbiI6Imh0dHBzOi8vcG9jLXdhZ21pLnZlcmNlbC5hcHAvIn0=!hW+aZNDm5AFwTgIVZPEDO/ZKlVx3QqtLqF8sw2v/Q00="
    const appName = "ser_ryan_bot"

    console.log("isTMA", isTMA)
    console.log("telegramAnalytics", TelegramAnalytics)
    console.log("TelegramAnalytics", {
      token: token,
      appName: appName,
    })
    // if (isTMA) {
    TelegramAnalytics.init({
      token: token,
      appName: appName,
    })
    // }
  }, [isTMA])

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
