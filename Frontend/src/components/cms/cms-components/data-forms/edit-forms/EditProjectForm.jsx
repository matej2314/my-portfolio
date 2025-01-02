import { useRef } from "react";
import { editForms } from "../data-forms-classes";

export default function EditProjectForm({ selectedProject, onSubmit }) {
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formRefs = {
            projectId,
            projectName,
            projectCat,
            projectUrl,
            mainScreens,
            galleryScreens,
            projectGoal,
            projectDesc,
            projectRepo,
            technologies,
            projLongTxt,
            projectDiff,
            projectEndDate,
        };
        onSubmit(formRefs);
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className={`${editForms.form.form} mt-4 border-2 border-white p-4 rounded-md`}
        >
            {/* Poniżej znajduje się zawartość formularza */}
            <label htmlFor="project-id" className={editForms.label.label}>Project id:</label>
            <input
                className={editForms.input.input}
                type="text"
                id="project-id"
                defaultValue={selectedProject.id}
                ref={projectId}
                readOnly
            />
            <label className={editForms.label.label} htmlFor="project-name">Project name:</label>
            <input
                className={editForms.input.input}
                type="text"
                id="project-name"
                defaultValue={selectedProject.title}
                ref={projectName}
            />
            <label className={editForms.label.label} htmlFor="project-category">Category:</label>
            <select
                className={editForms.input.input}
                id="project-category"
                defaultValue={selectedProject.category}
                ref={projectCat}
            >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="FullStack">FullStack</option>
            </select>
            {/* Dodaj pozostałe pola formularza w analogiczny sposób */}
            <button className={editForms.submitBtn.submitBtn} type="submit">Save</button>
        </form>
    );
}
