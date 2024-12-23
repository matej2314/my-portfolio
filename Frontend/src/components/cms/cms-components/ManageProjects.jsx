import { useContext, useState } from "react";
import { DataContext } from '../../../store/data-context';

import { cmsComponents } from "./cms-componenst-styles";
import AddProject from './data-forms/add-forms/AddProject';
import ShowProjectPics from "./ShowProjectPics";
import EditProjects from './data-forms/edit-forms/EditProjects';
import DeleteProject from './data-forms/delete-forms/DeleteProject';

export default function ManageProjects() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const projects = dataCtx.fetchedData.data.projects;
    const { refreshData } = dataCtx;

    const [selectedProject, setSelectedProject] = useState(null);
    const [actionType, setActionType] = useState(null);

    const handleShowPictures = (project) => {
        setSelectedProject(() => project);
        setActionType('show');
    }

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
    };

    const handleCloseAction = () => {
        setActionType(null);
        refreshData();
    };

    if (actionType === 'add') {
        return <AddProject onClose={handleCloseAction} />
    }

    if (actionType === 'edit' && selectedProject) {
        return <EditProjects selectedProject={selectedProject} onClose={handleCloseAction} />
    };

    if (actionType === 'delete' && selectedProject) {
        return (
            <DeleteProject selectedProject={selectedProject} onClose={handleCloseAction} />
        )
    };

    if (actionType === 'show' && selectedProject) {
        return <ShowProjectPics id={selectedProject.id} name={selectedProject.title} />
    }


    return (
        <div className={`${cmsComponents.wrapper.wrapper} mx-8`}>
            <h2 className={cmsComponents.h2.h2}>Projects</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
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
                            <span className={cmsComponents.span.span}>{project.title}</span>
                            <span className={cmsComponents.span.span}>{project.category}</span>
                            <span className={cmsComponents.span.span}>{project.link}</span>
                            <span className={cmsComponents.span.span}>{project.description}</span>
                            <span className={cmsComponents.span.span}>{project.repo}</span>
                            <div className={cmsComponents.buttonDiv.buttonDiv}>
                                <button
                                    onClick={() => handleShowPictures(project)}
                                    className={cmsComponents.actionBtn.actionBtn}
                                >
                                    Pictures
                                </button>
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
                                            goal: project.goal,
                                            technologies: project.technologies,
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