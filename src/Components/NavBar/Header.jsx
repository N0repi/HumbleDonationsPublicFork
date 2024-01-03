// Header.jsx

"use client"

import React, { useState, useEffect, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import images from "../../assets"
import { Model, TokenList } from "../index"
import { useRouter } from "next/router"

// IMPORT INTERNAL
import Style from "./Header.module.css"
import Profile from "../../pages/wagmi-profile"
import { useAccount, connect, useConnect } from "wagmi"

export default function Head() {
    // USESTATE
    const { address, connector, isConnected } = useAccount()
    const [openModel, setOpenModel] = useState(false)
    const [openTokenBox, setOpenTokenBox] = useState(true)
    const [account, setAccount] = useState(false) // if true == connect wallet provider menu --- if false == "Your Token List" dropdown
    const [activeTab, setActiveTab] = useState("/")

    const router = useRouter()

    const handleTabClick = (href) => {
        setActiveTab(href)
        // Additional logic if needed
    }

    useEffect(() => {
        setActiveTab(router.pathname)
    }, [router.pathname])

    useEffect(() => {
        setAccount(!isConnected)
    }, [isConnected])

    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <Link legacyBehavior href="/">
                {/* HDT logo */}
                <Image src={images.HDTlogo} alt="Network" width={68} height={68} />
            </Link>

            <Link legacyBehavior href="/">
                <a className={`py-4 px-4 font-bold text-3xl`}>Humble Donations</a>
            </Link>

            <div className="flex flex-row items-center">
                <Link legacyBehavior href="/funding">
                    <a
                        className={`mr-4 p-6 font-bold ${
                            activeTab === "/funding" ? Style.activeTab : ""
                        }`}
                        onClick={() => handleTabClick("/funding")}
                    >
                        Fund Projects & Creators
                    </a>
                </Link>
                <Link legacyBehavior href="/Rewards">
                    <a
                        className={`mr-4 p-6 font-bold ${
                            activeTab === "/Rewards" ? Style.activeTab : ""
                        }`}
                    >
                        Rewards
                    </a>
                </Link>
                <Link legacyBehavior href="/Governance">
                    <a
                        className={`mr-4 p-6 font-bold ${
                            activeTab === "/Governance" ? Style.activeTab : ""
                        }`}
                    >
                        Governance
                    </a>
                </Link>
                <Link legacyBehavior href="/swap">
                    <a
                        className={`mr-4 p-6 font-bold ${
                            activeTab === "/swap" ? Style.activeTab : ""
                        }`}
                    >
                        Swap
                    </a>
                </Link>
                {/* RIGHT SECTION */}
                <div className={Style.NavBar_box_right}>
                    <div className={Style.NavBar_box_right_box}>
                        {/**/}
                        <div className={Style.NavBar_box_right_box_img}>
                            {/* NETWORK IMAGE */}
                            <Image
                                src={images.arbitrumNetwork}
                                alt="Network"
                                width={38}
                                height={38}
                            />
                        </div>
                        {/* Need to make dynamic */}
                        <div>
                            <p>Powered by</p>
                            <p>Arbitrum</p>
                        </div>
                    </div>
                    {account ? (
                        <div
                            className="ml-2"
                            // className="badge badge-red badge-md ml-2"

                            onClick={() => setOpenModel(true) && setOpenTokenBox(true)}
                        >
                            <Profile />
                        </div>
                    ) : (
                        <div>
                            <Profile />
                        </div>
                    )}
                    {/* The button to open modal */}

                    {/* Need to change connect="Connec" to equivalent connect/useConnect parameter */}

                    {openModel && <Model setOpenModel={setOpenModel} connect="Connect" />}
                </div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* Need to edit below tag to <Profile /> instead! */}
                <div>
                    {/* <div
                        className="ml-2"
                        onClick={() => document.getElementById("my_modal_2").showModal()}
                    >
                        <Profile />

                    </div> */}
                </div>
                <button
                    className="badge badge-red badge-md ml-2"
                    onClick={() => document.getElementById("my_modal_2").showModal()}
                ></button>
                <dialog id="my_modal_2" className={Style.modal}>
                    <div>
                        <h3>
                            <TokenList tokenDate="hey" setOpenTokenBox={setOpenTokenBox} />
                        </h3>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setOpenModel(false)}>close</button>
                    </form>
                </dialog>
                {/* TOKENLIST COMPONENT */}
                {/* if !openTokenBox --> openTokenBox then Your Token List drop-down appears */}
                {/**/}
                {/* Placement of connectButton below */}
                {/* <div className="ml-2">
                    <Profile />
                </div> */}
                {/* {status === "authenticated" ? (
                    <div
                        className={styles.connectButton}
                        onClick={() => {
                            signOut()
                        }}
                    >
                        Disconnect
                    </div>
                ) : (
                    <div className={styles.connectButton}>
                        <SignIn />
                    </div>
                )} */}
            </div>
        </nav>
    )
}
