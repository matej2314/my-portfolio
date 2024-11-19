
import { projectsClasses } from "./projectsClasses"
import { imgUrl } from "../../url"
export default function Project({ projects, loading }) {

    return (
        <div className={projectsClasses.project.wrapper}>
            <ul className={projectsClasses.project.ul}>
                {!loading && projects && Array.isArray(projects) ? (
                    projects.map((project) => (
                        <li key={project.id} className={projectsClasses.project.li}>
                            <img className={projectsClasses.project.projectImage} src={`${imgUrl}/${project.project_screenName}`} alt={project.title} />
                        </li>
                    ))
                ) : (
                    <p>Brak projektów</p>
                )}

            </ul>
        </div>
    )
}