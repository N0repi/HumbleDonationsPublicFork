// wagmi-profile.jsx

// "use client"

import React, { useState, useEffect } from "react"
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi"

import Style from "./wagmi-profile.module.css"

function Profile() {
    const { address, connector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()

    return (
        <div className={Style.connectButton}>
            {isConnected ? (
                <div>
                    {/* Connected to {address} */}
                    <button onClick={() => disconnect()}>Disconnect</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => connect()}>Connect</button>
                </div>
            )}
        </div>
    )
}

export default Profile
