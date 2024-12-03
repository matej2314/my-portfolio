import { useContext, useState } from "react";
import { DataContext } from '../../../store/data-context';

import AddProject from './data-forms/add-forms/AddProject';
import EditProjects from './data-forms/edit-forms/EditProjects';
import DeleteProject from './data-forms/delete-forms/DeleteProject';

export default function ManageProjects() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const projects = dataCtx.fetchedData.data.projects;

    const [selectedProject, setSelectedProject] = useState(null);
    const [actionType, setActionType] = useState(null);

    const handleEdit = (projectData) => {
        setSelectedProject(() => projectData);
        setActionType('edit');
    };

    const handleDelete = (project) => {
        setSelectedProject(() => project);
        setActionType('delete')
    };

    const handleAddNew = () => {
        setActionType('add')
    }

    if (actionType === 'add' && selectedProject) {
        return <AddProject />
    }

    if (actionType === 'edit' && selectedProject) {
        return <EditProjects selectedProject={selectedProject} />
    };

    if (actionType === 'delete' && selectedProject) {
        return (
            <DeleteProject selectedProject={selectedProject} />
        )
    }


    return (
        <div className="w-[95vw] h-fit flex flex-col justify-start items-center text-lg text-white p-0 gap-4">
            <h2 className="w-full h-fit flex flex-row text-2xl justify-center">Projects</h2>
            <button
                onClick={handleAddNew}
                className="w-fit h-fit text-lg text-white"
            >
                Add new
            </button>
            <ul className="w-fit h-fit flex flex-col justify-center items-center text-sm text-white border-2 border-l-cyan-100 p-4 gap-4">
                {!loading && projects && Array.isArray(projects) ? (
                    projects.map((project) => {
                        return <>
                            <li key={project.id} className="w-fit h-full flex flex-row items-start justify-center text-white text-sm gap-2 border-b-2 border-black p-2" >
                                <span className="w-full">{project.id}</span>
                                <span className="w-full">{project.title}</span>
                                <span className="w-full">{project.category}</span>
                                <span className="w-full">{project.link}</span>
                                <span className="w-full">{project.description}</span>
                                <span className="w-full">{project.repo}</span>
                                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                                    <button
                                        onClick={() => handleEdit({
                                            id: project.id,
                                            title: project.title,
                                            category: project.category,
                                            link: project.link,
                                            screen: project.project_screenName,
                                            description: project.description,
                                            repo: project.repo,
                                            long: project.long_text
                                        })}
                                        className="w-full h-fit text-sm text-white"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project)}
                                        className="w-full h-fit text-sm text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        </>
                    })
                ) : (
                    <p>Brak projektów</p>
                )}
            </ul>
        </div>
    )
}