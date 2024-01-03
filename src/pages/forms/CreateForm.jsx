// CreateForm.jsx

// "use client"
import React, { useState, useEffect } from "react"
//import { getSession } from "next-auth/react"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import dotenv from "dotenv"
dotenv.config()
//
import { BASE_API_URL } from "../../utils/constants"
import Style from "./CreateForm.module.css"

// import { useTransaction } from "../TransactionContext.jsx"

export default function CreateForm() {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [body, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [transactionHash, setTransactionHash] = useState() // New state
    //const [pStatus, setPStatus] = useState("") // State for project status
    const [pStatus, setPStatus] = useState(false) // State for project status
    // Add FundMe clicked -> default action is to refresh the page
    const [scHeight, setScHeight] = useState("auto") // Initial height
    const [tag, setTag] = useState([])
    const maxTags = 3

    // auto resize state
    const handleTextareaChange = (e) => {
        setDescription(e.target.value)
        let newScHeight = e.target.scrollHeight + "px"
        setScHeight(newScHeight)
    }

    // tags state
    const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.options)
            .filter((option) => option.selected)
            .map((option) => option.value)

        setTag((prevTags) => [...prevTags, ...selectedOptions])
    }

    useEffect(() => {
        console.log("Current Tags:", tag)
    }, [tag])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setPStatus(false)
        // seems perfect. I think the problem is that ethers is not getting the connected wallet 'cause tx window to sign the contract is not even appearing
        // I am actually routed to /forms/page, not CreateForm. Might be an issue, idk.
        const provider = new ethers.BrowserProvider(window.ethereum)
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const signer = provider.getSigner()
        const connectedWallet = await provider.getSigner() // might need to have address: as a getSigner parameter

        // Get the address as a string
        const walletAddress = await connectedWallet.getAddress()

        const newProjectAddress = "0xaea84056b5430f336592e31b40b1eae80ef65988"

        const contractAddress = "0x4CDfFAAc9A23e0e102512fd8CC860d2419f4D8a5"

        const NftOnChainPayable12 = require("../../../artifacts/contracts/NftOnChainPayable12.sol/NftOnChainPayable12.json")
        const abi = NftOnChainPayable12.abi

        //
        const newProjectMumbaiPayable12 = new ethers.Contract(
            // contractAddress, //* ** this line is NEW to NOC9 **
            "0x4CDfFAAc9A23e0e102512fd8CC860d2419f4D8a5",
            [
                "function safeMint(address to, string memory uri, string memory projectTitle) external payable",
            ],
            connectedWallet
        )

        const contractNFTOnChainPayable = new ethers.Contract(contractAddress, abi, provider)
        // -----
        // **
        // SHOULD WORK NOW!
        // -----
        // getTokenId

        // --- Determine if wallet can create new project page ---
        //
        //
        const fetchDataAndCreateProject = async () => {
            // ********BACK END OWNER ADDRESS MINT CHECK********
            // Commented out the file `PA-ad-checksum.mjs`, as it makes developement easier.
            // The response below checks if the connected wallet address has already minted
            // a tokenId through a back-end component. This can likely be handled via
            // a smart contract instead.
            // Checks are sent to JSON DB which verifies the owners of the NFT collection
            // DB not updated w/o `PA-ad-checksum.mjs`, but check is still performed
            // locally against DB.
            // ********BACK END OWNER ADDRESS MINT CHECK********
            // const res = await fetch(`${BASE_API_URL}projectOwners/1/ownerAddresses`)
            // const data = await res.json()
            // const owneraddresses = data.owneraddresses

            // // console.log("Current Tags:", tag) // debug

            // if (data.includes(walletAddress)) {
            //     console.log("Connected wallet is in the list of project owners"), setPStatus(true)
            // } else {
            console.log("Creating project.")

            // blank uri
            const uri = "" // causing error when search for project owner
            const mintTokens = await newProjectMumbaiPayable12.safeMint(
                connectedWallet.address,
                uri,
                title,
                {
                    value: ethers.parseEther("0.0525"),
                }
            )

            setTransactionHash(mintTokens.hash)

            // Wait for the transaction to be mined
            await mintTokens.wait()

            async function getOwnerAddressByProjectTitle(title) {
                try {
                    const tokenOwner = await contractNFTOnChainPayable.getOwnerByProjectTitle(
                        title
                    )

                    // Log the owner's address
                    console.log(`The owner of ${title} is: ${tokenOwner}`) // debugging: last statement logging
                    createProject({ title, body, tokenOwner, tag })
                    // const file = new File(JSON.stringify([JSON Object]),"[name].json";
                } catch (error) {
                    console.error("Error:", error)
                }
            }
            getOwnerAddressByProjectTitle(title)
            // }
        }

        const createProject = async (project) => {
            try {
                const createProjectRes = await fetch(`${BASE_API_URL}/projects`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(project),
                })

                console.log("CreateForm response: ", createProjectRes) // debugging: -> not logging
                // Handling the response here
                if (createProjectRes.status === 200 || 201) {
                    router.push("/funding")
                } // debugging: status is 200 or 201, as I do get redirected to /funding

                // Do something with the response
                // }
                // console.log(createProjectRes.status)
                // if (createProjectRes.status === 201) {
                //     router.push("/funding")
                // }
            } catch (error) {
                console.error("Error creating project:", error)
            }
        }

        fetchDataAndCreateProject(connectedWallet)

        // --- Determine if wallet can create new project page ---
        // ********************************************************************************************
        //
    }

    //debug
    console.log("Rendering with Tags:", tag)
    return (
        <form
            onSubmit={handleSubmit}
            // removed from form className="w-1/2"
        >
            <label>
                <div className={Style.wrapper}>
                    <span>Title</span>
                    <input
                        style={{ backgroundColor: "#302f2f" }}
                        required
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
            </label>

            <label>
                <div className={Style.wrapper}>
                    <span>Description</span>
                    <textarea
                        required
                        onChange={handleTextareaChange}
                        value={body}
                        style={{ height: scHeight }}
                    />
                </div>
                {/* <script>
                    const textarea = document.querySelector("textarea");
                    textarea.addEventListener("keyup", e => {
                        let scHeight = e.target.scrollHeight;
                    })
                </script> */}
            </label>
            {/* should be showing multiple tags */}

            <label>
                <span>Select a maximum of 3 tags </span>
                <div className={Style.dropdownWrapper}>
                    <div className={Style.selectedTags}>
                        {tag.map((selectedTag, index) => {
                            console.log("Rendered Tag:", selectedTag) // Debug
                            return (
                                <div key={index} className={Style.selectedTag}>
                                    {selectedTag}
                                    <span
                                        onClick={() => {
                                            setTag((prevTags) =>
                                                prevTags.filter((tag) => tag !== selectedTag)
                                            )
                                        }}
                                        className={Style.removeTag}
                                    >
                                        ✕
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    <select
                        className={Style.select}
                        onChange={handleSelectChange}
                        value={tag}
                        disabled={tag.length >= maxTags}
                        multiple
                    >
                        <option disabled value="">
                            {tag.length >= maxTags ? "Maximum tags selected" : "Select a tag"}
                        </option>
                        <option value="Artistic">Artistic</option>
                        <option value="Content Creator">Content Creator</option>
                        <option value="DeFi">DeFi</option>
                        <option value="Educational">Educational</option>
                        <option value="Non-Profit">Non-Profit</option>
                    </select>
                </div>
            </label>

            <button className={Style.AddProject} disabled={isLoading}>
                {isLoading && <span>Adding...</span>}
                {!isLoading && <span>Add Project</span>}
            </button>
            <div id="address" className="text-muted my-3"></div>
            {transactionHash && (
                <div>
                    <p>Transaction Hash:</p>
                    <a
                        href={`https://sepolia.arbiscan.io/tx/${transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {transactionHash}
                    </a>
                </div>
            )}
            {/* Conditionally render the div based on pStatus */}
            {pStatus && (
                <div>
                    <p className="mb-2">
                        Error: Fundable page already found. Only one page is permitted per wallet
                        address.
                    </p>
                    {/* Additional content related to true status */}
                </div>
            )}
        </form>
    )
}
