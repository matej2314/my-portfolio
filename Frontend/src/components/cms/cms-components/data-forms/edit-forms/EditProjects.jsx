import { useRef, useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { editForms } from "../data-forms-classes";

const editProjectUrl = requestUrl.projects.put;

export default function EditProjects({ selectedProject, onClose }) {
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const projectId = useRef(selectedProject.id || '');
    const projectName = useRef(selectedProject.title || '');
    const projectCat = useRef(selectedProject.category || '');
    const projectUrl = useRef(selectedProject.link || '');
    const projectScreen = useRef(selectedProject.screen || '');
    const projectDesc = useRef(selectedProject.description || '');
    const projectRepo = useRef(selectedProject.repo || '');
    const technologies = useRef(selectedProject.technologies || '');
    const projLongTxt = useRef(selectedProject.long || '');
    const projectDiff = useRef(selectedProject.difficulty || '');
    const projectEndDate = useRef(selectedProject.end_date || '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProject = {
            projectId: selectedProject.id,
            projectName: projectName.current.value.trim(),
            projectCat: projectCat.current.value.trim(),
            projectURL: projectUrl.current.value.trim(),
            projectScr: projectScreen.current.value.trim(),
            projectDesc: projectDesc.current.value.trim(),
            projectRepo: projectRepo.current.value.trim(),
            technologies: technologies.current.value.trim(),
            projectLongTxt: projLongTxt.current.value.trim(),
            projectDiff: projectDiff.current.value,
            projectEndDate: projectEndDate.current.value.trim(),

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
    useEffect(() => {
        if (result || error) {
            const message = result?.message || error;
            const type = result ? "info" : "error";

            toast[type](message);

            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [result, error, onClose]);


    return (
        <div className={editForms.wrapper.wrapper}>
            <h2 className={editForms.h2.h2}>Edit selected project</h2>
            {error && <p>{error}</p>}
            <form
                onSubmit={handleSubmit}
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
                    htmlFor="project-tech">
                    Tech stack:
                </label>
                <input
                    className={editForms.input.input}
                    type="text"
                    name="project-tech"
                    id="project-tech"
                    defaultValue={selectedProject.technologies}
                    ref={technologies}
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
                    ref={projLongTxt}
                />
                <label
                    className={editForms.label.label}
                    htmlFor="project-diff">
                    Choose project difficulty:
                </label>
                <select
                    name="project-diff"
                    id="project-diff"
                    defaultValue={selectedProject.difficulty}
                    ref={projectDiff}
                >
                    <option value="newbie">newbie</option>
                    <option value="junior">junior</option>
                    <option value="mid">mid</option>
                    <option value="senior">senior</option>
                </select>
                <label htmlFor="project-endDate">Project end date:</label>
                <input
                    type="text"
                    name="project-endDate"
                    id="project-endDate"
                    defaultValue={selectedProject.end_date}
                    ref={projectEndDate}
                />
                <button
                    className={editForms.submitBtn.submitBtn}
                    type="submit"
                    disabled={user.role !== 'admin'}
                >
                    Save
                </button>
            </form>
        </div>
    )
}