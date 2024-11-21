import { useContext } from "react";
import { DataContext } from '../../store/data-context';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { imgUrl } from "../../url";
import { projectsClasses } from "./projectsClasses";

export default function Projects({ selectedCategory }) {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const projects = dataCtx.fetchedData.data.projects || [];

    const filteredProjects = selectedCategory === "all"
        ? projects
        : projects.filter(project => project.category === selectedCategory);

    const divVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const liVariants = {
        initial: { opacity: 0.7, scale: 1 },
        hover: { opacity: 1, scale: 1.05 }
    };

    return (
        <div className={projectsClasses.projects.wrapper}>
            <div className={projectsClasses.project.wrapper}>
                <ul className={projectsClasses.project.ul}>
                    {loading ? (
                        <p>Ładowanie projektów...</p>
                    ) : (
                        filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <motion.li
                                    key={project.id}
                                    className={projectsClasses.project.li}
                                    variants={liVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    transition={{ type: "stiffness", stiffness: 300 }}
                                >
                                    <motion.img
                                        className={projectsClasses.project.projectImage}
                                        src={`${imgUrl}/${project.project_screenName}`}
                                        alt={project.title}
                                    />
                                    <motion.div
                                        className={projectsClasses.project.hoverContent}
                                        variants={divVariants}
                                        initial="hidden"
                                        whileHover="visible"
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={projectsClasses.project.contentWrapper}>
                                            <h3 className={projectsClasses.project.h3}>{project.title}</h3>
                                            <p className={projectsClasses.project.description}>{project.description}</p>
                                            <Link className={projectsClasses.project.link}>View details</Link>
                                        </div>
                                    </motion.div>
                                </motion.li>
                            ))
                        ) : (
                            <p>Brak projektów</p>
                        )
                    )}
                </ul>
            </div>
        </div>
    )

}