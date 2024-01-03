import { useState, useEffect } from "react"
import { useBalance, useAccount } from "wagmi"
import { utils } from "ethers"

export const useBalanceWagmi = () => {
    // get the address of the connected wallet
    // const { address } = useAccount("F0f472619cCE62B7d54dF3Bf17c4335EF311F1A5")
    // const { data, isError, isLoading } = useBalance({
    //     addressOrName: address,
    //     token: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
    //     onSuccess(data) {
    //         console.log("Success", data)
    //     },
    // })

    // useEffect to handle the asynchronous nature of useBalance
    // get the address of the connected wallet
    const { address } = useAccount()

    const { data: ethBalanceData, isError: ethBalanceError } = useBalance({
        addressOrName: address,
    })

    // get the wETH balance of the connected address
    const { data: wETHBalanceData, isError: wETHBalanceError } = useBalance({
        addressOrName: address,
        token: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
    })

    // if there is no wallet connected, ask to connect a wallet
    if (!address) return <p>Please connect a wallet</p>

    // if there is an error, display it
    if (ethBalanceError || wETHBalanceError) return <p>Error while fetching balance</p>

    // if (!ethBalanceData || !wETHBalanceData) return <p>Loading balance...</p>

    return (
        <>
            <p>
                You have {ethBalanceData?.formatted} {ethBalanceData?.symbol}
            </p>
            <p>
                You have {wETHBalanceData?.formatted} {wETHBalanceData?.symbol}
            </p>
        </>
    )
}

export default useBalanceWagmi
