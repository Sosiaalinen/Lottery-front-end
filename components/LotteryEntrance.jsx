import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    let entranceFee = ""

    // const { runContractFunction: enterLottery } =
    // useWeb3Contract(
    // {
    //     abi: abi,
    //     contractAddress: lotteryAddress,
    //     functionName: "enterLottery",
    //     params: {},
    //     msg.value:

    // })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                entranceFee = (await getEntranceFee()).toString()
                console.log(entranceFee)
            }
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            HI from Lottery entrance <div>{entranceFee}</div>
        </div>
    )
}
