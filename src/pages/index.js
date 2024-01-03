import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "../styles/Home.module.css"
import Style from "./index.module.css"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home({ Component, pageProps }) {
    return (
        <>
            <main className={`${styles.main} ${inter.className}`}>
                <div className={styles.description}>
                    This website is in developement using the Arbitrum Sepolia testnet.
                </div>
                <div className={styles.description}>
                    Please be cautious of interacting with any smart contracts.
                </div>
                <div className={styles.description}>---Test Text---</div>
            </main>
            <div className={Style.imageGrid}>
                <Image
                    src="https://maroon-blank-stoat-172.mypinata.cloud/ipfs/QmYanzLRhTKfjx9cpusdjFBqvBKGo1XT2QDzuRzAAx1Eje/00164-3311268651.png"
                    alt="Description of the image"
                    width={700} // Adjust the width according to your design
                    height={500} // Adjust the height according to your design
                />
                <p> Decentralized donations </p>
            </div>
            <div className={Style.imageGrid}>
                <p> Get started [add button] </p>
                <Image
                    src="https://maroon-blank-stoat-172.mypinata.cloud/ipfs/QmYanzLRhTKfjx9cpusdjFBqvBKGo1XT2QDzuRzAAx1Eje/00077-3716149947.png"
                    alt="Description of the image"
                    width={500} // Adjust the width according to your design
                    height={500} // Adjust the height according to your design
                />
            </div>
        </>
    )
}
