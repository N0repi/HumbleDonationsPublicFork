// _app.js

import Head from "next/head"
import { useEffect, useState } from "react"
//viem
// import { createWalletClient, createPublicClient, webSocket, http } from "viem"
// wagmi
import {
    sepolia,
    polygonMumbai,
    mainnet,
    arbitrum,
    arbitrumGoerli,
    arbitrumSepolia,
} from "wagmi/chains"
import { createConfig, configureChains, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
// wallets
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import { InjectedConnector } from "wagmi/connectors/injected"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
// import "@rainbow-me/rainbowkit/styles.css"
// import { RainbowKitProvider } from "@rainbow-me/rainbowkit"

// INTERNAL IMPORT
import { Header } from "../Components/index"
import styles from "../styles/Home.module.css"
import "../styles/globals.css"
// import walletArray from "./rainbowkit-wallets"

// import { TransactionProvider, useTransaction } from "./TransactionContext"

const { chains, webSocketPublicClient, publicClient } = configureChains(
    [polygonMumbai, sepolia, mainnet, arbitrum, arbitrumGoerli, arbitrumSepolia],
    [publicProvider()]
)

const config = createConfig({
    autoConnect: false,
    connectors: [
        new MetaMaskConnector({
            chains,
            options: {
                name: "MetaMask",
            },
        }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                name: "CoinBase",
                appName: "wagmi",
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                name: "WalletConnect",
                projectId: "f3e4578c7c5c2859b224991269a97846",
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: "Injected",
                shimDisconnect: true,
            },
        }),
        // new getDefaultWallets({
        //     name: "My RainbowKit App",
        //     projectId: "f3e4578c7c5c2859b224991269a97846",
        //     chains,
        // }),
    ],
    publicClient,
    webSocketPublicClient,
})

// const  connectors  = getDefaultWallets({
//     appName: "My RainbowKit App",
//     projectId: "YOUR_PROJECT_ID",
//     chains,
// })
// const walletArrayResult = walletArray()
// const { wallets } = walletArrayResult[0]

// const { getDefaultWallets } = walletArray()
// const secondComponentConfig = createConfig({
//     autoConnect: false,
//     connectors: wallets,
//     publicClient,
//     webSocketPublicClient,
// })

// useEffect is a gross solution. Should use something like sign-in / sing-out with next-auth to reconnect wallet
export default function App({ Component, pageProps }) {
    useEffect(() => {
        config.autoConnect()
    }, [])

    return (
        <div>
            <Head>
                <title>Humble Donations</title>
            </Head>

            <WagmiConfig config={config}>
                {/* <TransactionProvider> */}
                <div className={styles.App}>
                    <Header />
                    <Component {...pageProps} />
                </div>
                {/* </TransactionProvider> */}
            </WagmiConfig>
        </div>
    )
}
