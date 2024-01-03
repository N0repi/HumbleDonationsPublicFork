// callBalanceOf.jsx

// get native token balance
"use client"

import { useContractReads, useAccount } from "wagmi"
import { erc20ABI } from "wagmi"
import { ethers } from "ethers"

function GetMultipleBalances(TokenOne) {
    const { address } = useAccount()

    const callBalanceOfConfig = {
        abi: erc20ABI,
        functionName: "balanceOf",
        // We need to pass the address to get the balance of in the parameters
        args: [address],
    }
    const { data, error, isLoading } = useContractReads({
        contracts: [
            {
                // The wETH token
                address: TokenOne.address,
                ...callBalanceOfConfig,
            },
            // {
            //     // The wMATIC token
            //     address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
            //     ...callBalanceOfConfig,
            // },
        ],
    })

    if (error) return <p>Error while fetching balances</p>

    if (isLoading) return <p>Loading balances...</p>

    // const tokensFetched = [TokenOne.name]
    // Extract the balance value

    // Check if data is defined and has the expected structure
    if (data && Array.isArray(data) && data.length > 0 && data[0].result !== undefined) {
        const balanceValue = data[0].result
        return ethers.formatEther(balanceValue)
    }
}
// output: TypeError: invalid BigNumberish value (argument="value", value={ "result": 189134550288974566, "status": "success" }, code=INVALID_ARGUMENT, version=6.8.1)

// That is the correct amount of wETH. Just need to look through ethers v6 docs to figure out how to return BigNumberish correctly

export default GetMultipleBalances

// return (
//     <div>
//         {data &&
//             data.map((balanceObj, i) => (
//                 <p key={i}>
//                     {balanceObj.result ? ethers.formatEther(balanceObj.result) : "0"}{" "}
//                     {/* {tokensFetched[i]} */}
//                 </p>
//             ))}
//     </div>
// )
