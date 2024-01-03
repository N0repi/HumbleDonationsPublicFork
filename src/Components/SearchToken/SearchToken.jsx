// SearchToken.jsx

import React, { useState } from "react"
import Image from "next/image"
import Style from "./SearchToken.module.css"
import images from "../../assets"
import { myTokenList } from "./tokenList-full.json"

const SearchToken = ({ openToken, tokens, tokenData }) => {
    const [active, setActive] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const coin = myTokenList

    // Filter the token list based on the search query
    const filteredCoin = coin.filter(
        (el) =>
            el.chainId === 421614 &&
            (el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                el.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div className={Style.SearchToken}>
            <div className={Style.SearchToken_box_tokens_container}>
                <div className={Style.SearchToken_box}>
                    <div className={Style.SearchToken_box_heading}>
                        <h4>Select a token</h4>
                        <Image
                            src={images.close}
                            alt="close"
                            width={50}
                            height={50}
                            onClick={() => openToken(false)}
                        />
                    </div>
                    <div className={Style.SearchToken_box_search}>
                        <div className={Style.SearchToken_box_search_img}>
                            <Image src={images.search} alt="img" width={20} height={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search token or paste address"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus={true}
                        />
                    </div>

                    <div className={Style.SearchToken_box_tokens}>
                        {filteredCoin.map((el, i) => (
                            <span
                                key={i + 1}
                                className={active === i + 1 ? `${Style.active}` : ""}
                                onClick={() => {
                                    setActive(i + 1),
                                        tokens({
                                            name: el.name,
                                            image: el.img,
                                            symbol: el.symbol,
                                            address: el.address,
                                        })
                                    openToken(false) // Closes SearchToken component
                                }}
                            >
                                {/* Shown in the tokenList menu */}
                                <Image
                                    src={el.img || images.ether}
                                    alt="close"
                                    width={50}
                                    height={50}
                                />
                                <div className={Style.tokenInfo}>
                                    <div>{el.name}</div>
                                    <div>{el.symbol}</div>
                                </div>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchToken
