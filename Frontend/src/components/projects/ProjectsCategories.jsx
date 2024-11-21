import { useContext } from "react"
import { DataContext } from '../../store/data-context';

import { projectsClasses } from "./projectsClasses"

export default function ProjectsCategories({ setProjectCat }) {
    const dataCtx = useContext(DataContext);
    const projects = dataCtx.fetchedData.data.projects || [];

    const uniqueCategories = [
        ...new Set(projects.map((project) => project.category)),
        "all",
    ];

    return (
        <div className={projectsClasses.projectsCategories.wrapper}>
            <ul className={projectsClasses.projectsCategories.ul}>
                {uniqueCategories.map((category) => (
                    <li>
                        <button onClick={() => setProjectCat(category)} className={projectsClasses.projectsCategories.button}>
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}