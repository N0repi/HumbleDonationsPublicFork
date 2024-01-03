import Head from "next/head"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "../styles/Home.module.css"
import Link from "next/link"
//import {createEditor} from 'lexical';

const inter = Inter({ subsets: ["latin"] })

export default function Page() {
    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const response = await fetch("/api/submit", {
            method: "POST",
            body: formData,
        })

        // Handle response if necessary
        const data = await response.json()
        // ...
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="name" />
            <button type="submit">Submit</button>
        </form>
    )
}
