// [title].js

import React, { useEffect, useRef } from "react"
import { S3 } from "aws-sdk"

import { BASE_API_URL } from "../../utils/constants.js"
import HeroSection from "../../Components/HeroSection/HeroSection.jsx"
import Style from "./[title].module.css"
import { processTokenId } from "../w3-calls/payProcessTokenId.mjs"

// Initialize the S3 client
const s3 = new S3()

export const getStaticPaths = async () => {
    try {
        const res = await fetch(`${BASE_API_URL}/projects`)

        // const res = await fetch(`${BASE_API_URL}/projects`);
        const data = await res.json()

        // map data to an array of path objects with params (title)
        const paths = data.map((project) => {
            return {
                params: { title: project.title },
            }
        })
        // console.log(paths)
        return {
            paths,
            fallback: "blocking",
        }
        // build succeeds if "blocking" but not if "true"
    } catch (error) {
        console.error("Error fetching data:", error)
        // without dev running, -> error -> `paths: []`
        return {
            paths: [],
            fallback: "blocking",
        }
    }
}

// export const getStaticProps = async (context) => {
//   const title = context.params.title;

//   try {
//     // Fetch data from S3 bucket
//     const s3Params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: "db.json",
//     };
//     const s3Data = await s3.getObject(s3Params).promise();
//     const data = JSON.parse(s3Data.Body.toString("utf-8"));

//     const filteredData = data.projects.filter(
//       (project) => project.title === title
//     );

//     return {
//       props: { project: filteredData[0] },
//     };
//   } catch (error) {
//     console.error("Error fetching data from S3 bucket:", error);

//     return {
//       props: { project: null },
//     };
//   }
// };

export const getStaticProps = async (context) => {
    const title = context.params.title
    // console.log("Received title:", title)

    try {
        const res = await fetch(`${BASE_API_URL}/projects?title=${title}`)
        // console.log("getStaticProps res:", res)

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }

        const data = await res.json()
        // console.log("Fetched data:", data)

        return {
            props: { project: data[0] },
            // revalidate: 60 * 60,
        }
    } catch (error) {
        console.error("Error fetching data:", error)

        return {
            props: { project: null }, // You can handle this case in your component
            revalidate: 60,
        }
    }
}

const Details = ({ project }) => {
    const contentRef = useRef(null)
    console.log(`Details ${project.title}`)

    useEffect(() => {
        processTokenId(project.title)
        console.log(`promise ${processTokenId(project.title)}`)

        if (contentRef.current) {
            const contentHeight = contentRef.current.offsetHeight
            const windowHeight = window.innerHeight
            const minHeight = Math.max(200, contentHeight, windowHeight) + 64

            document.querySelector(`.${Style.mainContainer}`).style.minHeight = `${minHeight}px`
        }
    }, [project.title])

    return (
        <main className={Style.mainContainer}>
            <div className={Style.contentContainer} ref={contentRef}>
                <div className={Style.textContainer}>
                    <h3>{project.title}</h3>
                    {project.body.split("\n").map((paragraph, index) => (
                        <React.Fragment key={index}>
                            <p>{paragraph}</p>
                            <p>{index < project.body.split("\n").length - 1 && "\n \n"}</p>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className={Style.heroSectionContainer}>
                <HeroSection processTokenId={processTokenId} projectTitle={project.title} />

                <div className={Style.tagContainer}>
                    {Array.isArray(project.tag) &&
                        project.tag.map((tag, index) => {
                            const formattedTag = tag.replace(/\s+/g, "-") // Replace spaces with hyphens

                            return (
                                <div key={index} className={`${Style.tag} ${Style[formattedTag]}`}>
                                    {tag}
                                </div>
                            )
                        })}
                </div>
            </div>
        </main>
    )
}
// console.log(`tokenId is: ${processTokenId.tokenId}`)

export default Details
