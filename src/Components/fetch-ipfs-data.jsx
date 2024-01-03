// fetch-ipfs-data.jsx

const fetchData = async () => {
    try {
        const response = await fetch(
            "https://maroon-blank-stoat-172.mypinata.cloud/ipfs/QmUUjnjQSoqECLcyXhY1egcDbs5T6jAuAaLmEoQAbA43qX",
        )
        const data = await response.json()

        const myTokenList = data.MY_TOKEN_LISTjs

        console.log(myTokenList) // This is your array

        return myTokenList // Return the array
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error // Propagate the error
    }
}

export default fetchData
