// Model.jsx

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi"
// import { ConnectButton } from "@rainbow-me/rainbowkit"

// INTERNAL

import Style from "src/Components/Model/Model.module.css"
import images from "../../assets"

const Model = ({ setOpenModel }) => {
    // const walletMenu = ["MetaMask", "CoinBase", "WalletConnect", "Other"]
    const { address, connector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()

    const handleConnectorClick = (connector) => {
        // Connect the selected connector
        connect({ connector })

        // Close the modal
        setOpenModel(false)
    }
    return (
        <div className={Style.Model} onClick={() => setOpenModel(false)}>
            <div className={Style.Model_box}>
                <div className={Style.Model_box_heading}>
                    <p>Connect a wallet</p>
                </div>
                <div className={Style.Model_box_wallet}>
                    {connectors.map((connector) => (
                        <div
                            disabled={!connector.ready}
                            key={connector.id}
                            onClick={() => handleConnectorClick(connector)}
                        >
                            {!connector.ready && " (unsupported)"}
                            {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
                            {/* need to fix images being mapped so that I can display next to model modal */}
                            <div className={Style.Model_box_item}>
                                <Image
                                    src={require(`../../assets/wallets/${connector.id}.svg`)}
                                    alt={connector.id}
                                    width={50}
                                    height={50}
                                />
                                {connector.name}
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className={Style.rainbowKit}>
                    <p>More options available through RainbowKit</p>
                    <ConnectButton />
                </div> */}
                <p className={Style.Model_box_para}>
                    By connecting a wallet, you agree to
                    <br /> Humble Donations's Terms and
                    <br /> Private Policy. <br />
                    <br /> Although, we promise to not store
                    <br /> data beyond the scope of what
                    <br /> is publically available on the blockchain.
                </p>
            </div>
        </div>
    )
}

export default Model
