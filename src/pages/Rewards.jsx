// // Rewards.jsx

"use client"

import { useContractReads, useAccount } from "wagmi"
import { erc20ABI } from "wagmi"
import { ethers } from "ethers"

function RewardsBalance() {
    const { address } = useAccount()

    const callBalanceOfConfig = {
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [address],
    }
    const { data, error, isLoading } = useContractReads({
        contracts: [
            {
                // The HDT token
                address: "0x301944751abB2F5000C71B050b139e31AEaE4720",
                ...callBalanceOfConfig,
            },
            {
                // The wETH token
                address: "0x67e197D575e7A350Ff3dE1A7eAd2aA06b19145B6",
                ...callBalanceOfConfig,
            },
        ],
    })

    if (error) return <p>Error while fetching balances</p>

    if (isLoading) return <p>Loading balances...</p>

    const tokensFetched = ["HDT", "wETH"]

    return (
        <div>
            {data &&
                data.map((balanceObj, i) => (
                    <p key={i}>
                        {balanceObj.result ? ethers.formatEther(balanceObj.result) : "0"}{" "}
                        {tokensFetched[i]}
                    </p>
                ))}
        </div>
    )
}
export default RewardsBalance
