import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined")
            if (window.localStorage.getItem("connected")) {
                enableWeb3() // problem: if clicking cancel whils trying to connect, it adds
                // "connected" in the cache!
            }
        // enableWeb3()
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3() //sets isweb3enabled to false
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 4)}...
                    {account.slice(account.length - 4, account.length)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()

                        if (typeof window !== "undefined")
                            window.localStorage.setItem("connected", "injected")
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    CONNECT
                </button>
            )}
        </div>
    )
}
