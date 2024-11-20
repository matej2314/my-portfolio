import { useContext } from "react"
import { DataContext } from '../../store/data-context';

import { projectsClasses } from "./projectsClasses"

export default function ProjectsCategories({ selectedProjectCat }) {
    const dataCtx = useContext(DataContext);
    const projects = dataCtx.fetchedData.data.projects || [];

    const uniqueCategories = [
        ...new Set(projects.map((project) => project.category)),
        "all",
    ];

    return (
        <div className={projectsClasses.projectsCategories.wrapper}>
            <ul className="w-full flex flex-row justify-center items-center text-lg py-2 gap-16">
                {uniqueCategories.map((category) => (
                    <li>
                        <button onClick={() => selectedProjectCat(category)} className="hover:text-[#b8c785]">
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}