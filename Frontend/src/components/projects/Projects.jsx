
import Project from "./Project";
import { projectsClasses } from "./projectsClasses";

export default function Projects({ selectedCategory }) {

    return (
        <div className={projectsClasses.projects.wrapper}>
            <Project selectedCategory={selectedCategory} />
        </div>
    )

}