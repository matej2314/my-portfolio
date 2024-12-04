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
        <div className={cmsComponents.wrapper.wrapper}>
            <h2 className={cmsComponents.h2.h2}>Projects</h2>
            <button
                onClick={handleAddNew}
                className={cmsComponents.addNew.addNew}
            >
                Add new
            </button>
            <ul className={cmsComponents.ul.ul}>
                {!loading && projects && Array.isArray(projects) ? (
                    projects.map((project) => (
                        <li
                            key={project.id}
                            className={cmsComponents.li.li}
                        >
                            <span className={cmsComponents.span.span}>{project.id}</span>
                            <span className={cmsComponents.span.span}>{project.title}</span>
                            <span className={cmsComponents.span.span}>{project.category}</span>
                            <span className={cmsComponents.span.span}>{project.link}</span>
                            <span className={cmsComponents.span.span}>{project.description}</span>
                            <span className={cmsComponents.span.span}>{project.repo}</span>
                            <div className={cmsComponents.buttonDiv.buttonDiv}>
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
                                    className={cmsComponents.actionBtn.actionBtn}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project)}
                                    className={cmsComponents.actionBtn.actionBtn}
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