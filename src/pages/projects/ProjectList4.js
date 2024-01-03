// ProjectList4.js
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { BASE_API_URL } from "../../utils/constants.js"
import Style from "./ProjectList4.module.css"

function ProjectsList({ searchQuery, selectedTag }) {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${BASE_API_URL}/projects`)
            const data = await res.json()
            // console.log(data) // Add this line to log the data
            setProjects(data)
        }

        fetchData()
    }, [])

    const filteredProjects = projects
        .filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(
            (project) =>
                !selectedTag || (Array.isArray(project.tag) && project.tag.includes(selectedTag)),
        )

    let totalTagWidth = 0

    return (
        <div className={Style.gridLayout}>
            {filteredProjects.map((project) => (
                <Link href={"/projects/" + project.title} key={project.title}>
                    <div className={Style.projectBox}>
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p>{project.body.slice(0, 200)}...</p>
                        {/* <p>Token Owner: {project.tokenOwner}</p> */}
                        <div className={Style.tagContainer}>
                            {Array.isArray(project.tag) &&
                                project.tag.map((tag, index) => {
                                    const formattedTag = tag.replace(/\s+/g, "-") // Replace spaces with hyphens
                                    const marginLeft = index > 0 ? totalTagWidth + index * 1 : 0 // Adjust the spacing as needed

                                    return (
                                        <div
                                            key={index}
                                            className={`${Style.tag} ${Style[formattedTag]}`}
                                            style={{ marginLeft }}
                                        >
                                            {tag}
                                        </div>
                                    )
                                })}

                            {Array.isArray(project.tag) && (
                                <div
                                    className={Style.tagPlaceholder}
                                    style={{ width: totalTagWidth }}
                                />
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProjectsList
