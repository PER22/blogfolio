import { useState, useEffect } from "react";
import { getAllProjects } from "../../utilities/projects-api";
export default function ViewAllProjectsPage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            try {
                const projectsData = await getAllProjects();
                setProjects(projectsData);
            } catch (error) {
                console.log(error);
            }
        }
        getProjects();
    }, []);

    return (
        <>
            {projects.map((eachProject) => (
                <h3 key={eachProject._id}>{eachProject.title}</h3>
            ))}
        </>
    );
}