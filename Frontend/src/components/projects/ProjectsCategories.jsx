import { motion } from "framer-motion";

import { useContext } from "react"
import { DataContext } from '../../store/data-context';

import { projectsClasses } from "./projectsClasses"

export default function ProjectsCategories({ setProjectCat }) {
    const dataCtx = useContext(DataContext);
    const projects = dataCtx.fetchedData.data.projects || [];

    const uniqueCategories = [
        ...new Set(projects.map((project) => project.category)),
        "All",
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "stiffness", stiffness: 200, delay: 0.6 }}
            className={projectsClasses.projectsCategories.wrapper}
        >
            <ul className={projectsClasses.projectsCategories.ul}>
                {uniqueCategories.map((category, index) => (
                    <li key={index}>
                        <button onClick={() => setProjectCat(category)} className={projectsClasses.projectsCategories.button}>
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}