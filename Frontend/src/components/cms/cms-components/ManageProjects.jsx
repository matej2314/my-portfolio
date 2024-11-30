import { useContext } from "react";
import { DataContext } from '../../../store/data-context';


export default function ManageProjects() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const projects = dataCtx.fetchedData.data.projects;

    return (
        <div className="w-[95vw] h-fit flex flex-col justify-start items-center text-lg text-white p-0 gap-2">
            <h2 className="w-full h-fit flex flex-row justify-center">Projects</h2>
            <ul className="w-fit h-fit flex flex-col justify-center items-center text-sm text-white border-2 border-l-cyan-100 p-4 gap-4">
                {!loading && projects && Array.isArray(projects) ? (
                    projects.map((project) => {
                        return <li className="w-fit h-fit flex flex-row items-start justify-center text-white text-sm gap-2 border-b-2 border-black p-2" key={project.id}>
                            <span className="w-full">{project.id}</span>
                            <span className="w-full">{project.title}</span>
                            <span className="w-full">{project.category}</span>
                            <span className="w-full">{project.link}</span>
                            <span className="w-full">{project.project_screenName}</span>
                            <span className="w-full">{project.description}</span>
                            <span className="w-full">{project.repo}</span>
                            <span className="w-full">{project.long_text}</span>
                        </li>
                    })
                ) : (
                    <p>Brak projektów</p>
                )}
            </ul>
        </div>
    )
}