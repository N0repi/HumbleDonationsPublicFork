// //PA-ad-checksum.mjs
// //  formally PA-ad-c2.mjs

// // ********** COMMENTED OUT ON LINE 162 of CreateForm.jsx **********
// // Running this file writes to the database with the checksum wallet address that own project NFTs, indicating ownership over their project,
// //
// // next thing to add is a way to revalidate this data each a new project NFT is minted
// //
// import { ethers, parseEther } from "ethers"
// import dotenv from "dotenv"
// dotenv.config()
// import axios from "axios"

// import { useAccount } from "wagmi"

// const { walletAddress } = useAccount()

// // Contract address
// const address = "0x4CDfFAAc9A23e0e102512fd8CC860d2419f4D8a5"

// // Alchemy URL
// const process.env.NEXT_PUBLIC_BASE_URL = process.env.API_URL_ARBITRUMSEPOLIA
// const url = `${process.env.NEXT_PUBLIC_BASE_URL}/getOwnersForCollection/?contractAddress=${address}`

// const config = {
//     method: "get",
//     url: url,
// }

// // Make the request and send the data to http://localhost:4000/OwnerAddresses
// axios(config)
//     .then((response) => {
//         const ownerAddresses = response.data.ownerAddresses
//         // Convert each address to checksum address
//         const checksumOwnerAddresses = ownerAddresses.map((addr) => ethers.getAddress(addr))
//         // Send the ownerAddresses array to http://localhost:4000/OwnerAddresses
//         axios
//             .post("http://localhost:4000/projectOwners", {
//                 ownerAddresses: checksumOwnerAddresses,
//             })
//             .then((response) => {
//                 console.log("Data sent successfully:", response.data)
//             })
//             .catch((error) => {
//                 console.error("Error sending data:", error)
//             })
//     })
//     .catch((error) => console.error("Error:", error))
