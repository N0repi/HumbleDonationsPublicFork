// payProcessTokenId.mjs

import { ethers } from "ethers"
import { S3 } from "aws-sdk"

// INTERNAL
import { BASE_API_URL } from "../../utils/constants"
import NftOnChainPayable12 from "../../../artifacts/contracts/NftOnChainPayable12.sol/NftOnChainPayable12.json" assert { type: "json" }

const { abi } = NftOnChainPayable12

// Initialize the S3 client
const s3 = new S3()

export const processTokenId = async (title) => {
    try {
        const connectedSigner = await getConnectedSigner()

        if (!connectedSigner) {
            console.error("Connected wallet not available")
            return
        }

        const contractAddress = "0x4CDfFAAc9A23e0e102512fd8CC860d2419f4D8a5"
        const nftOnChainPayable12 = new ethers.Contract(contractAddress, abi, connectedSigner)
        const ownerAddress = await getProjectTokenOwner(title)
        const tokenId = await getTokenIdByOwner(nftOnChainPayable12, ownerAddress)

        console.log(`processTokenId: ${tokenId}`)
        return tokenId // Return tokenId
    } catch (error) {
        console.error("Error:", error)
    }
}

// match token owner (web3) to project.title in SSG
const getProjectTokenOwner = async (title) => {
    const res = await fetch(`${BASE_API_URL}/projects?title=${title}`)
    const data = await res.json()
    return data[0]?.tokenOwner || null
}

const getTokenIdByOwner = async (contractInstance, ownerAddress) => {
    const tokenId = await contractInstance.ownerToTokenId(ownerAddress)
    return tokenId
}

async function getConnectedSigner() {
    if (typeof window !== "undefined" && window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.BrowserProvider(window.ethereum)

        return provider.getSigner()
    } else {
        console.error("Web3 provider not available")
        return null
    }
}

async function Payable(title, tokenQuantity, tokenAddress) {
    const contractAddress = "0x4CDfFAAc9A23e0e102512fd8CC860d2419f4D8a5"

    // GET WALLET
    try {
        const connectedSigner = await getConnectedSigner()

        if (!connectedSigner) {
            console.error("Connected wallet not available")
            return
        }

        // CONTRACT INSTANCE
        const nftOnChainPayable12 = new ethers.Contract(contractAddress, abi, connectedSigner)

        const ownerAddress = await getProjectTokenOwner(title)
        const tokenId = await getTokenIdByOwner(nftOnChainPayable12, ownerAddress)

        // LOGS & FORMAT  || OUTPUT
        // --------------
        console.log(`payTokenOwner ${tokenId}`) // payTokenOwner 2
        console.log(tokenId) // BigNumber {_hex: '0x02', _isBigNumber: true}

        const tokenIdString = String(tokenId)
        console.log(tokenIdString) // 2

        console.log(`Token Address log: ${tokenAddress}`) // Token Address log: 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889
        console.log(tokenAddress) // 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889

        console.log(`Token Quantity Log: ${tokenQuantity}`) // Token Quantity Log: 1
        console.log(tokenQuantity) // 1

        const tokenQuantityInEthFormat = ethers.parseUnits(tokenQuantity, 18)
        console.log(`Token Quantity Log InEthFormat: ${tokenQuantityInEthFormat}`) // Token Quantity Log InEthFormat: 1000000000000000000

        // const payNftOnChainPayable12 = new ethers.Contract(contractAddress, abi, connectedSigner)
        console.log("tokenQuantityInEthFormat before approval:", tokenQuantityInEthFormat) // 1000000000000000000n

        // ERC-20 CONTRACT
        const erc20abi = [
            // Functions
            "function transfer(address to, uint256 amount) returns (bool)",
            "function approve(address spender, uint256 amount) returns (bool)",

            // Events
            "event Transfer(address indexed from, address indexed to, uint256 amount)",
        ]

        const erc20Contract = new ethers.Contract(tokenAddress, erc20abi, connectedSigner)

        // APPROVAL
        const approvalTx = await erc20Contract.approve(contractAddress, tokenQuantityInEthFormat, {
            // gasLimit: 50000,
        })

        await approvalTx.wait()
        const transactionHashApproval = approvalTx.hash
        console.log(`Approval Hash: https://sepolia.arbiscan.io/tx/${transactionHashApproval}`)

        // setTransactionHashApproval
        // setTransactionHashApproval(transactionHashApproval)

        // PAYMENT
        const payTokenOwnerTx = await nftOnChainPayable12.payTokenOwner(
            tokenId,
            tokenAddress,
            tokenQuantityInEthFormat
            // { gasLimit: 50000 }
        )
        const paymentReceipt = await payTokenOwnerTx.wait()
        console.log("Transaction Receipt:", paymentReceipt)

        const transactionHashConfirmation = payTokenOwnerTx.hash
        console.log(`Payment Hash: https://sepolia.arbiscan.io/tx/${transactionHashConfirmation}`)
        console.log("Payment successful")

        // setTransactionHashConfirmation(transactionHashConfirmation)

        // Return transaction hashes
        // return { setTransactionHashApproval, setTransactionHashConfirmation}

        // Return transaction hashes
        // return (
        //     <main>
        //         <div>
        //             {transactionHashApproval && (
        //                 <div>
        //                     <p>Transaction Hash:</p>
        //                     <a
        //                         href={`https://sepolia.arbiscan.io/tx/${transactionHashApproval}`}
        //                         target="_blank"
        //                         rel="noopener noreferrer"
        //                     >
        //                         testApproval
        //                         {transactionHashApproval}
        //                     </a>
        //                     {transactionHashConfirmation && (
        //                         <a
        //                             href={`https://sepolia.arbiscan.io/tx/${transactionHashConfirmation}`}
        //                             target="_blank"
        //                             rel="noopener noreferrer"
        //                         >
        //                             testConfirmation
        //                             {transactionHashConfirmation}
        //                         </a>
        //                     )}
        //                 </div>
        //             )}
        //         </div>
        //     </main>
        // )
    } catch (error) {
        console.error("Error:", error.message || error.reason || error)
        if (error.data) {
            console.error("Error Data:", error.data)
        }
        process.exitCode = 1
    }
}

export default Payable
