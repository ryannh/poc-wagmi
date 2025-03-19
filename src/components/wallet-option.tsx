import * as React from "react"
import { useErrorConnect } from "@/store/usErrorConnect"
import { Connector, useConnect } from "wagmi"

export function WalletOptions() {
  const { setErrorConnect } = useErrorConnect()
  const { connectors, connect } = useConnect({
    mutation: {
      onSuccess(data, variables, context) {
        setErrorConnect(undefined)
      },
      onError(error, variables, context) {
        setErrorConnect(error.message)
      },
    },
  })

  return (
    <div className="flex flex-col gap-2">
      <div>Select connector: </div>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  )
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <button
      className="w-[200px] rounded-md border border-white p-2"
      disabled={!ready}
      onClick={onClick}
    >
      {`${connector.name} (${connector.type})`}
    </button>
  )
}
