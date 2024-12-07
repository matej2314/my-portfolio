import { useContext, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion'
import { DataContext } from '../../store/data-context';
import { Link } from "react-router-dom";
import { imgUrl } from "../../url";
import { projectsClasses } from "./projectsClasses";

export default function Projects({ selectedCategory }) {
    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const projects = dataCtx.fetchedData.data.projects || [];
    const [flippedCards, setFlippedCards] = useState({});

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const filteredProjects = selectedCategory === "all"
        ? projects
        : projects.filter(project => project.category === selectedCategory);

    const handleFlipCard = (id) => {
        setFlippedCards((prev) => ({ ...prev, [id]: true }));
    };

    const handleBackCardFront = (id) => {
        setFlippedCards((prev) => ({ ...prev, [id]: false }));
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
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2, ease: "easeIn", type: "spring", damping: 70, stiffness: 70 }}
                                    className={projectsClasses.project.li}
                                    key={project.id}
                                    onMouseEnter={() => { !isMobile && handleFlipCard(project.id) }}
                                    onMouseLeave={() => { !isMobile && handleBackCardFront(project.id) }}
                                    onFocus={() => { isMobile && handleFlipCard(project.id) }}
                                    onBlur={() => { isMobile && handleBackCardFront(project.id) }}
                                >
                                    <div
                                        className={`${projectsClasses.project.cardWrapper} ${flippedCards[project.id] ? 'rotate-y-180' : 'rotate-y-0'}`}
                                    >
                                        {/* Front of project card */}
                                        <div
                                            className={projectsClasses.project.frontCard}
                                        >
                                            <motion.img
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeIn", type: "spring", damping: 70, stiffness: 70 }}
                                                src={`${imgUrl}/${project.project_screenName}-640.png`}
                                                srcSet={`
                                                      ${imgUrl}/${project.project_screenName}-320.png 320w,
                                                      ${imgUrl}/${project.project_screenName}-640.png 640w,
                                                      ${imgUrl}/${project.project_screenName}.png 1100w
                                                   `}
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                alt={project.title}
                                                className={projectsClasses.project.projectImage}
                                            />
                                        </div>
                                        {/* Back of project card */}
                                        <div
                                            className={projectsClasses.project.contentWrapper}
                                        >
                                            <h3 className={projectsClasses.project.h3}>{project.title}</h3>
                                            <p className={projectsClasses.project.description}>{project.description}</p>
                                            <Link className={projectsClasses.project.link} to={`/project/details/${project.id}`}>
                                                View details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.li>
                            ))
                        ) : (
                            <p>Brak projektów</p>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}
