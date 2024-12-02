import { useRef, useContext } from "react";
import { DataContext } from "../../../../../store/data-context";
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';

const editProjectUrl = requestUrl.projects.put;


export default function EditProjects({ selectedProject }) {
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { refreshData } = useContext(DataContext)

    const projectId = useRef(selectedProject.id || '');
    const projectName = useRef(selectedProject.title || '');
    const projectCat = useRef(selectedProject.category || '');
    const projectUrl = useRef(selectedProject.link || '');
    const projectScreen = useRef(selectedProject.screen || '');
    const projectDesc = useRef(selectedProject.description || '');
    const projectRepo = useRef(selectedProject.repo || '');
    const projLongDesc = useRef(selectedProject.long || '');

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProject = {

        };


    }

    return (
        <div className="w-fit h-fit flex flex-col justify-center items-center text-md text-white border-2 border-black p-4 gap-3">
            <h2 className="w-full h-full flex justify-center items-center text-lg text-black">Edit selected project</h2>
            <form
                className="w-[30vw] h-fit flex flex-col justify-center items-center gap-4 text-black text-md"
            >
                <label
                    htmlFor="project-id"
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                >Project id:
                </label>
                <input
                    className="w-full h-fit flex flex-row justify-center items-center text-black pl-2"
                    type="text" name="" id="project-id"
                    defaultValue={selectedProject.id}
                    ref={projectId}
                    readOnly />
                <label
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                    htmlFor="project-name">
                    Project name:
                </label>
                <input
                    className="w-full h-fit flex flex-row justify-center items-center text-black pl-2"
                    type="text"
                    name="project-name"
                    id="project-name"
                    defaultValue={selectedProject.title}
                    ref={projectName}
                />
                <label
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                    htmlFor="project-category">
                    Category:
                </label>
                <input
                    className="w-full h-fit flex flex-row justify-center items-center text-black pl-2"
                    type="text"
                    name="project-category"
                    id="project-category"
                    defaultValue={selectedProject.category}
                    ref={projectCat}
                />
                <label
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                    htmlFor="project-url">
                    Project URL:
                </label>
                <input
                    className="w-full h-fit flex flex-row justify-center items-center text-black pl-2"
                    type="url"
                    name="project-url"
                    id="project-url"
                    defaultValue={selectedProject.link}
                    ref={projectUrl}
                />
                <label
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                    htmlFor="project-screen">
                    Screen name:
                </label>
                <input
                    className="w-full h-fit flex flex-row justify-center items-center text-black pl-2"
                    type="text"
                    name="project-screen" id="project-screen"
                    defaultValue={selectedProject.screen}
                    ref={projectScreen}
                />
                <label
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                    htmlFor="project-desc">
                    Description:
                </label>
                <textarea
                    className="w-full h-fit flex flex-row justify-center items-center text-black pl-2"
                    type="text"
                    name="project-desc"
                    id="project-desc"
                    defaultValue={selectedProject.description}
                    ref={projectDesc}
                />
                <label
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                    htmlFor="project-repo">
                    Repository
                </label>
                <input
                    className="w-full h-fit flex flex-row justify-center items-center text-black pl-2"
                    type="url"
                    name="project-repo"
                    id="project-repo"
                    defaultValue={selectedProject.repo}
                    ref={projectRepo}
                />
                <label
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                    htmlFor="proj-long-desc">
                    Long Description:
                </label>
                <textarea
                    className="w-full h-[5rem] flex flex-col justify-start items-center break-before-auto pl-2"
                    type="text"
                    name="proj-long-desc"
                    id="proj-long-desc"
                    defaultValue={selectedProject.long}
                    ref={projLongDesc}
                />
                <button
                    className="w-1/2 h-fit flex flex-row justify-center items-center"
                    type="submit"
                >
                    Save
                </button>
            </form>
        </div>
    )
}