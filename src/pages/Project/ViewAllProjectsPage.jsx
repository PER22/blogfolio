import { useState, useEffect } from "react";
import { getAllProjects } from "../../utilities/projects-api";
import ProjectPreviewCard from "../../components/ProjectPreviewCard/ProjectPreviewCard";
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
                <ProjectPreviewCard project={eachProject}/>
            ))}
        </>
    );
}