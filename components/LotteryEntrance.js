// We will grab this header in index.js file, same as Header.js

// we have to have a function to enter the lottery:
// Here we will use a moralis hook to call this function (or any function)
// https://github.com/MoralisWeb3/react-moralis#useweb3contract

import { useEnsName, useWeb3Contract } from "react-moralis"
import { contractAddresses, abi } from "../constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "@web3uikit/core"

// we can get chainId from moralis

import { useMoralis } from "react-moralis" // importing the useMoralis hook

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis() // here the value of chainId will be in hex form
    //console.log(parseInt(chainIdHex))            // by adding parseInt we are getting int form.
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId] : null

    //let entranceFee = "" // making it global variable
    const [entranceFee, setEntranceFee] = useState("0") // https://reactjs.org/docs/hooks-state.html#whats-a-hook, it will work same as previous line.
    // when the isWeb3Enabled becomes true the browser rerenders but entranceFee not because we declaired the entranceFee as a normal variable. so we changed it

    const dispatch = useNotification()

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: {},
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            // try to read the raffle entrance fee
            // here we will call getEntranceFee() from Raffle.sol, and the conract is live because we are running hh node in background for that contract

            async function updateUI() {
                const entranceFeeFromCall = (await getEntranceFee()).toString()
                setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall, "ehter"))
                // this => ethers.utils.formatUnits(entranceFeeFromCall, "ehter") will transform the entransFee from wei to eth.
            }
            updateUI()
        }
    }, [isWeb3Enabled]) // in starting of useEffect() the isWeb3Enabled is false, to make it true we have to pass it to dependency array.

    return (
        <div>
            <button
                onClick={async function () {
                    await enterRaffle({
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),
                    })
                }}
            >
                Enter Raffle
            </button>
            {raffleAddress ? (
                <div>Entrance Fee: {entranceFee} ETH</div>
            ) : (
                <div> No raffle address detected!</div>
            )}
        </div>
    ) // as entranceFee is global variable we can use it in any block, so we are using it here too
}

/**
 * here we have same name - chainId here, but those are actually different, how? actually in the first code we are getting chainId object from useMoralis() but in
 * second line of code we are assigning a new variable named chainId
 * const {chainId: chainIdHex} = useMoralis()
 * const chainId = parseInt(chainIdHex)
 */
