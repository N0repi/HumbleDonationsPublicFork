// funding.js

import { Inter } from "next/font/google"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import ProjectsList from "./projects/ProjectList4"
import TagFilter from "./projects/TagFilter"
import Style from "./funding.module.css"

import images from "../assets"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTag, setSelectedTag] = useState("") // State to track the selected tag
    const [showTagFilter, setShowTagFilter] = useState(false) // State to track the visibility of TagFilter
    const [tags, setTags] = useState([
        "Artistic",
        "Content Creator",
        "DeFi",
        "Educational",
        "Non-Profit",
    ])

    // Use useEffect to dynamically extract tags from projects
    // useEffect(() => {
    //     // Assuming projects is an array of objects with a 'tag' property
    //     const uniqueTags = Array.from(new Set(projects.flatMap((project) => project.tag)))
    //     setTags(uniqueTags)
    // }, [projects])

    let timeoutId

    const handleMouseEnter = () => {
        clearTimeout(timeoutId)
        setShowTagFilter(true)
    }

    const handleMouseLeave = () => {
        // Delay hiding the menu by 900 milliseconds || controls the collapse time
        timeoutId = setTimeout(() => {
            setShowTagFilter(false)
        }, 900)
    }

    return (
        <>
            <main className={Style.main}>
                <div className={Style.header}>
                    <div className={Style.buttonContainer}>
                        {/* Create project button */}
                        <Link legacyBehavior href="../forms/page">
                            <a className={`${Style.createButton}`}>Create Fundable Project</a>
                        </Link>
                        {/* SearchBar button */}
                        <div className={Style.searchBar}>
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filter button */}
                        <div
                            className={Style.filter}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Image
                                src={images.filter}
                                alt="filter"
                                width={30}
                                height={30}
                                tags={tags}
                                onClick={() => setShowTagFilter(!showTagFilter)}
                                className={showTagFilter ? Style.filteredImage : ""}
                            />
                            {showTagFilter && (
                                <TagFilter tags={tags} onSelectTag={setSelectedTag} />
                            )}
                        </div>
                    </div>
                </div>

                <h1 className="text-primary text-center py-4 px-4 font-bold text-3xl mb-6">
                    Fundable Projects
                </h1>
            </main>

            <div>
                <ProjectsList searchQuery={searchQuery} selectedTag={selectedTag} />
            </div>
        </>
    )
}

// was in div tag above ProjectList comp
// className={`mt-4 ${Style.projectContainer}`}
