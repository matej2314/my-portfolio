import { motion } from "framer-motion";
import { projectsClasses } from "./projectsClasses";
import { imgUrl } from "../../url";

export default function Project({ projects, loading }) {
    return (
        <div className={projectsClasses.project.wrapper}>
            <ul className={projectsClasses.project.ul}>
                {!loading && projects && Array.isArray(projects) ? (
                    projects.map((project) => (
                        <motion.li
                            key={project.id}
                            className={projectsClasses.project.li}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img
                                className={projectsClasses.project.projectImage}
                                src={`${imgUrl}/${project.project_screenName}`}
                                alt={project.title}
                            />
                            <motion.div
                                className={projectsClasses.project.hoverContent}
                                initial={{ opacity: 0, y: 20 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                            </motion.div>
                        </motion.li>
                    ))
                ) : (
                    <p>Brak projektów</p>
                )}
            </ul>
        </div>
    );
}
