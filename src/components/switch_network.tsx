import { useErrorSwitch } from "@/store/usErrorSwitch"
import { useAccount, useSwitchChain } from "wagmi"

const SwitchNetwork = () => {
  const { setErrorSwitch } = useErrorSwitch()
  const { chain } = useAccount()
  const { chains, switchChain } = useSwitchChain({
    mutation: {
      onError(error: any) {
        setErrorSwitch(error.message)
      },
      onSuccess(data: any) {
        setErrorSwitch(undefined)
      },
    },
  })

  return (
    <div style={{ margin: "10px 0px" }}>
      <div className="text-xl font-bold">Chain / network</div>
      <div>Selected Chain: {chain?.name ?? "Unknown"}</div>
      <div>Select Network :</div>
      {chains.map((c: any, i: number) => (
        <div
          key={`${c.id} ${i}`}
          className={`hover:bg-white-500 bg-transparent ${
            chain?.id === c.id ? "text-green-700" : "text-white-700"
          }  border-white-500 my-1 w-[250px] rounded border px-2 py-1 font-semibold hover:border-transparent hover:text-white`}
        >
          <button onClick={() => switchChain({ chainId: c.id })}>
            <div style={{ fontWeight: chain?.id === c.id ? "bold" : "normal" }}>
              {c.name}
            </div>
          </button>
        </div>
      ))}
    </div>
  )
}

export default SwitchNetwork
