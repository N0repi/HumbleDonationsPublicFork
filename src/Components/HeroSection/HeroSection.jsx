// HeroSection.jsx

import React, { useState, useEffect } from "react"
import Image from "next/image"

// IMPORT INTERNAL
import Style from "./HeroSection.module.css"
import images from "../../assets"
import { Token, SearchToken } from "../index"
// web3 tools
import { ethers } from "ethers"
import Payable from "../../pages/w3-calls/payProcessTokenId.mjs"
import GetMultipleBalances from "../../pages/w3-calls/callBalanceOf"

const HeroSection = ({ accounts, tokenData, project, projectTitle }) => {
    //USESTATE

    const [openSetting, setOpenSetting] = useState(false)
    const [openToken, setOpenToken] = useState(false)
    const [openTokensTwo, setOpenTokensTwo] = useState(false)
    const [tokenQuantity, setTokenQuantity] = useState("")
    // need to return txHash as a modal or pop-up
    const [transactionHash, setTransactionHash] = useState(null)

    // TOKEN 1
    const [TokenOne, setTokenOne] = useState({
        name: "",
        image: "",
        symbol: "",
        address: "",
    })

    // TOKEN 2
    const [TokenTwo, setTokenTwo] = useState({
        name: "",
        image: "",
        symbol: "",
    })

    const handleQuantityChange = (e) => {
        setTokenQuantity(e.target.value)
    }

    return (
        <div className={Style.HeroSection}>
            <div className={Style.HeroSection_box}>
                <div className={Style.HeroSection_box_heading}>
                    <p></p>
                    <div className={Style.HeroSection_box_heading_img}>
                        <Image
                            src={images.close}
                            alt="image"
                            width={50}
                            height={50}
                            onClick={() => setOpenSetting(true)}
                        />
                    </div>
                </div>

                <div className={Style.HeroSection_box_input}>
                    <input
                        type="text"
                        placeholder="0"
                        value={tokenQuantity}
                        onChange={handleQuantityChange}
                    />
                    <button
                        onClick={() => {
                            setOpenToken(true)
                        }}
                    >
                        <Image
                            src={TokenOne.image || images.etherlogo}
                            width={25}
                            height={25}
                            alt="ether"
                        />
                        {TokenOne.symbol || "ETH"}
                        {console.log(TokenOne.address)}
                        {/* {console.log(TokenOne.symbol)}
                        {console.log(TokenOne.name)} */}

                        {/* hardcoded token value */}
                    </button>
                </div>
                <div className={Style.HeroSection_box_balance}>
                    Balance: {parseFloat(GetMultipleBalances(TokenOne)).toFixed(3)}
                </div>

                {/* If account connected to swap then display the following */}
                {accounts ? (
                    <button className={Style.HeroSection_box_btn}>Connect Wallet</button>
                ) : (
                    <button
                        className={Style.HeroSection_box_btn}
                        onClick={async () => {
                            // Step 2: Pay the token owner
                            await Payable(projectTitle, tokenQuantity, TokenOne.address)
                            console.log(TokenOne.address)
                        }}
                    >
                        Donate
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {openSetting && <Token setOpenSetting={setOpenSetting} />}

            {openToken && (
                <SearchToken openToken={setOpenToken} tokens={setTokenOne} tokenData={tokenData} />
            )}
            {openTokensTwo && (
                <SearchToken
                    openToken={setOpenTokensTwo}
                    tokens={setTokenTwo}
                    tokenData={tokenData}
                />
            )}
        </div>
    )
}

export default HeroSection
