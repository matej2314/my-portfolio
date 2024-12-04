import { useRef } from "react";
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { editForms } from "../data-forms-classes";

const editProjectUrl = requestUrl.projects.put;

export default function EditProjects({ selectedProject }) {
    const { sendRequest, result, isLoading, error } = useSendRequest();

    const projectId = useRef(selectedProject.id || '');
    const projectName = useRef(selectedProject.title || '');
    const projectCat = useRef(selectedProject.category || '');
    const projectUrl = useRef(selectedProject.link || '');
    const projectScreen = useRef(selectedProject.screen || '');
    const projectDesc = useRef(selectedProject.description || '');
    const projectRepo = useRef(selectedProject.repo || '');
    const projLongDesc = useRef(selectedProject.long || '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProject = {
            projectId: projectId.current.value,
            projectName: projectName.current.value,
            projectCat: projectCat.current.value,
            projectURL: projectUrl.current.value,
            projectScr: projectScreen.current.value,
            projectDesc: projectDesc.current.value,
            projectRepo: projectRepo.current.value,
            projectLongTxt: projectLongTxt.current.value
        };

        try {
            await sendRequest({
                url: editProjectUrl,
                method: "PUT",
                data: updatedProject,
            });
        } catch (error) {
            console.log('Błąd podczas edycji projektu.');
        };

    };

    return (
        <div className={editForms.wrapper.wrapper}>
            <h2 className={editForms.h2.h2}>Edit selected project</h2>
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
            <form
                className={editForms.form.form}
            >
                <label
                    htmlFor="project-id"
                    className={editForms.label.label}
                >Project id:
                </label>
                <input
                    className={editForms.input.input}
                    type="text" name="" id="project-id"
                    defaultValue={selectedProject.id}
                    ref={projectId}
                    readOnly />
                <label
                    className={editForms.label.label}
                    htmlFor="project-name">
                    Project name:
                </label>
                <input
                    className={editForms.input.input}
                    type="text"
                    name="project-name"
                    id="project-name"
                    defaultValue={selectedProject.title}
                    ref={projectName}
                />
                <label
                    className={editForms.label.label}
                    htmlFor="project-category">
                    Category:
                </label>
                <input
                    className={editForms.input.input}
                    type="text"
                    name="project-category"
                    id="project-category"
                    defaultValue={selectedProject.category}
                    ref={projectCat}
                />
                <label
                    className={editForms.label.label}
                    htmlFor="project-url">
                    Project URL:
                </label>
                <input
                    className={editForms.input.input}
                    type="url"
                    name="project-url"
                    id="project-url"
                    defaultValue={selectedProject.link}
                    ref={projectUrl}
                />
                <label
                    className={editForms.label.label}
                    htmlFor="project-screen">
                    Screen name:
                </label>
                <input
                    className={editForms.input.input}
                    type="text"
                    name="project-screen" id="project-screen"
                    defaultValue={selectedProject.screen}
                    ref={projectScreen}
                />
                <label
                    className={editForms.label.label}
                    htmlFor="project-desc">
                    Description:
                </label>
                <textarea
                    className={editForms.input.input}
                    type="text"
                    name="project-desc"
                    id="project-desc"
                    defaultValue={selectedProject.description}
                    ref={projectDesc}
                />
                <label
                    className={editForms.label.label}
                    htmlFor="project-repo">
                    Repository
                </label>
                <input
                    className={editForms.input.input}
                    type="url"
                    name="project-repo"
                    id="project-repo"
                    defaultValue={selectedProject.repo}
                    ref={projectRepo}
                />
                <label
                    className={editForms.label.label}
                    htmlFor="proj-long-desc">
                    Long Description:
                </label>
                <textarea
                    className={editForms.editProjects.textarea}
                    type="text"
                    name="proj-long-desc"
                    id="proj-long-desc"
                    defaultValue={selectedProject.long}
                    ref={projLongDesc}
                />
                <button
                    className={editForms.submitBtn.submitBtn}
                    type="submit"
                >
                    Save
                </button>
            </form>
        </div>
    )
}