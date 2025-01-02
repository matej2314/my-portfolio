import { useRef, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { editForms } from "../data-forms-classes";
import { handleToastAndClose } from "../../../../../utils/handleToastAndClose";

const editProjectUrl = requestUrl.projects.put;

export default function EditProjects({ selectedProject, onClose }) {
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const projectId = useRef(selectedProject.id || '');
    const projectName = useRef(selectedProject.title || '');
    const projectCat = useRef(selectedProject.category || '');
    const projectUrl = useRef(selectedProject.link || '');
    const mainScreens = useRef();
    const galleryScreens = useRef();
    const projectGoal = useRef(selectedProject.goal || '');
    const projectDesc = useRef(selectedProject.description || '');
    const projectRepo = useRef(selectedProject.repo || '');
    const technologies = useRef(selectedProject.technologies || '');
    const projLongTxt = useRef(selectedProject.long || '');
    const projectDiff = useRef(selectedProject.difficulty || '');
    const projectEndDate = useRef(selectedProject.end_date || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        };

        const formData = new FormData();

        formData.append('projectName', projectName.current.value);
        formData.append('projectCat', projectCat.current.value);
        formData.append('projectURL', projectUrl.current.value);
        formData.append('goal', projectGoal.current.value);
        formData.append('projectDesc', projectDesc.current.value);
        formData.append('projectRepo', projectRepo.current.value);
        formData.append('technologies', technologies.current.value);
        formData.append('projectLongTxt', projLongTxt.current.value);
        formData.append('projectDiff', projectDiff.current.value);
        formData.append('projectEndDate', projectEndDate.current.value);

        if (mainScreens.current.files.length > 0) {
            const mainFiles = mainScreens.current.files;
            for (let i = 0; i < mainFiles.length; i++) {
                formData.append('mainImages', mainFiles[i]);

            };
        } else {
            formData.append('projectScr', selectedProject.screen);
        }

        if (galleryScreens.current.files.length > 0) {
            const galleryFiles = galleryScreens.current.files;
            for (let i = 0; i < galleryFiles.length; i++) {
                formData.append('galleryImages', galleryFiles[i]);
            }
        };

        let images = false;
        if (mainScreens.current.files.length > 0 || galleryScreens.current.files.length > 0) {
            images = true;
        }

        try {
            await sendRequest({
                url: `${editProjectUrl}/${selectedProject.id}/${images}`,
                method: "PUT",
                data: formData,
            });

        } catch (error) {
            console.log('Błąd podczas edycji projektu.');
        };

    };

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <div className={editForms.editProjects.wrapper}>
            <h2 className="text-2xl">Edit selected project</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            {error && <p>{error}</p>}
            <form
                onSubmit={handleSubmit}
                className={`${editForms.form.form} mt-4 border-2 border-white p-4 rounded-md`}
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
                <select
                    className={editForms.input.input}
                    type="text"
                    name="project-category"
                    id="project-category"
                    defaultValue={selectedProject.category}
                    ref={projectCat}
                >
                    <option className={editForms.select.option} value="Frontend">Frontend</option>
                    <option className={editForms.select.option} value="Backend">Backend</option>
                    <option className={editForms.select.option} value="FullStack">FullStack</option>
                </select>
                <label
                    className={editForms.label.label}
                    htmlFor="project-url">
                    Project URL:
                </label>
                <input
                    className={editForms.input.input}
                    type="text"
                    name="project-url"
                    id="project-url"
                    defaultValue={selectedProject.link}
                    ref={projectUrl}
                />
                <label
                    className={editForms.label.label}
                    htmlFor="project-screen"
                >
                    Upload new main screens of the project:
                </label>
                <input
                    className={editForms.input.input}
                    type="file"
                    name="project-screens"
                    id="project-screens"
                    ref={mainScreens}
                    multiple
                />
                <label
                    className={editForms.label.label}
                    htmlFor="gallery-screens"
                >Upload new screens to gallery:
                </label>
                <input
                    type="file"
                    className={editForms.input.input}
                    id="gallery-screens"
                    name="gallery-screens"
                    ref={galleryScreens}
                    multiple />
                <label
                    className={editForms.label.label}
                    htmlFor="project-goal"
                >
                    Edit main goal of the project:
                </label>
                <textarea
                    className={editForms.input.input}
                    name="project-goal"
                    id="project-goal"
                    defaultValue={selectedProject.goal}
                    ref={projectGoal}
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
                    className={editForms.input.input}
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
                <label
                    className={editForms.label.label}
                    htmlFor="project-endDate">Project completion date:</label>
                <input
                    className="text-lg"
                    type="date"
                    name="project-endDate"
                    id="project-endDate"
                    defaultValue={selectedProject.end_date}
                    ref={projectEndDate}
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