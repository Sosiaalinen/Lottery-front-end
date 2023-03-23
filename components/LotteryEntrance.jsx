import { abi, coads } from "../constants"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)

    const lotteryAddress = chainId in coads ? coads[chainId][0] : null

    // first one is variable/state and the second one is the function to update it, starts as zero
    const [entranceFee, setEntranceFee] = useState("0")

    const { runContractFunction: enterLottery } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                const entranceFeeFromCall = (await getEntranceFee()).toString()
                setEntranceFee(entranceFeeFromCall, "ether")
                console.log(entranceFee)
            }
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            HI from Lottery entrance{" "}
            {lotteryAddress ? (
                <div>
                    <button
                        onClick={async function () {
                            await enterLottery()
                        }}
                    >
                        Enter lottery
                    </button>
                    Entrance fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                </div>
            ) : (
                <div>No lottery address detected</div>
            )}
        </div>
    )
}
