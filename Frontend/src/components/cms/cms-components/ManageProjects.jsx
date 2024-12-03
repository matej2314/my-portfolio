import { useContext, useState } from "react";
import { DataContext } from '../../../store/data-context';

import { cmsComponents } from "./cms-componenst-styles";
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

    if (actionType === 'add') {
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
        <div className={cmsComponents.manageProjects.wrapper}>
            <h2 className={cmsComponents.manageProjects.h2}>Projects</h2>
            <button
                onClick={handleAddNew}
                className={cmsComponents.manageProjects.addNew}
            >
                Add new
            </button>
            <ul className={cmsComponents.manageProjects.ul}>
                {!loading && projects && Array.isArray(projects) ? (
                    projects.map((project) => (
                        <li
                            key={project.id}
                            className={cmsComponents.manageProjects.li}
                        >
                            <span className={cmsComponents.manageProjects.span}>{project.id}</span>
                            <span className={cmsComponents.manageProjects.span}>{project.title}</span>
                            <span className={cmsComponents.manageProjects.span}>{project.category}</span>
                            <span className={cmsComponents.manageProjects.span}>{project.link}</span>
                            <span className={cmsComponents.manageProjects.span}>{project.description}</span>
                            <span className={cmsComponents.manageProjects.span}>{project.repo}</span>
                            <div className={cmsComponents.manageProjects.buttonDiv}>
                                <button
                                    onClick={() =>
                                        handleEdit({
                                            id: project.id,
                                            title: project.title,
                                            category: project.category,
                                            link: project.link,
                                            screen: project.project_screenName,
                                            description: project.description,
                                            repo: project.repo,
                                            long: project.long_text,
                                        })
                                    }
                                    className={cmsComponents.manageProjects.actionBtn}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project)}
                                    className={cmsComponents.manageProjects.actionBtn}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Brak projektów</p>
                )}
            </ul>
        </div>
    )
}