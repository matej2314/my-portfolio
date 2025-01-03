import { useRef } from "react";
import { addForms } from "../data-forms-classes";

export default function AddProjectForm({ onSubmit }) {

    const addRefs = useRef({
        projectName: null,
        projectCat: null,
        projectUrl: null,
        projectScr: null,
        projectGoal: null,
        galleryScr: null,
        projectDesc: null,
        projectRepo: null,
        technologies: null,
        projectLongTxt: null,
        projectDiff: null,
        projectEndDate: null,
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(addRefs);
    }

    return (
        <form onSubmit={handleFormSubmit} className={addForms.addProject.form}>
            <label
                className={addForms.label.label}
                htmlFor="project-name"
            >
                Project name:
            </label>
            <input
                className={addForms.input.input}
                type="text"
                name="project-name"
                id="project-name"
                ref={(el) => (addRefs.current.projectName = el)}
            />
            <label className={addForms.label.label} htmlFor="project-category">Project Category:</label>
            <select
                className={`${addForms.select.select} text-base`}
                name="project-category"
                id="project-category"
                ref={(el) => (addRefs.current.projectCat = el)}
            >
                <option className={addForms.select.option} value="Frontend">Frontend</option>
                <option className={addForms.select.option} value="Backend">Backend</option>
                <option className={addForms.select.option} value="FullStack">FullStack</option>
            </select>
            <label
                className={addForms.label.label}
                htmlFor="project-url"
            >
                Project URL:
            </label>
            <input
                className={addForms.input.input}
                type="url" name="project-url"
                id="project-url"
                ref={(el) => (addRefs.current.projectUrl = el)}
            />
            <label
                className={addForms.label.label}
                htmlFor="project-screen"
            >
                Upload main screens of the project:
            </label>
            <input
                className={addForms.input.input}
                type="file" name="project-screens"
                id="project-screens"
                ref={(el) => (addRefs.current.projectScr = el)}
                multiple />
            <label
                className={addForms.label.label}
                htmlFor="gallery-screens"
            >
                Upload screens to gallery:
            </label>
            <input
                type="file"
                className={addForms.input.input}
                id="gallery-screens"
                name="gallery-screens"
                ref={(el) => (addRefs.current.galleryScr = el)}
                multiple />
            <label
                className={addForms.label.label}
                htmlFor="project-goal"
            >Type main goal of the project:
            </label>
            <textarea
                className={addForms.input.input}
                type="text"
                name="project-goal"
                id="project-goal"
                ref={(el) => (addRefs.current.projectGoal = el)}
            />
            <label
                className={addForms.label.label}
                htmlFor="project-description"
            >
                Project short description
            </label>
            <textarea
                className={addForms.input.input}
                name="project-description"
                id="project-descritpion"
                ref={(el) => (addRefs.current.projectDesc = el)}
            />
            <label
                className={addForms.label.label}
                htmlFor="project-repo"
            >
                Project repository URL:
            </label>
            <input
                className={addForms.input.input}
                type="url" name="project-repo"
                id="project-repo" ref={(el) => (addRefs.current.projectRepo = el)}
            />
            <label
                className={addForms.label.label}
                htmlFor="project-tech"
            >
                Tech stack:
            </label>
            <input
                className={addForms.input.input}
                type="text"
                name="project-tech"
                id="project-tech"
                ref={(el) => (addRefs.current.technologies = el)}
            />
            <label
                className={addForms.label.label}
                htmlFor="project-longText"
            >
                Long Description:
            </label>
            <textarea
                className={addForms.input.input}
                name="project-longText"
                id="project-longText"
                ref={(el) => (addRefs.current.projectLongTxt = el)}
            />
            <label
                className={addForms.label.label}
                htmlFor="project-diff"
            >
                Select project-difficulty:
            </label>
            <select
                className={`${addForms.select.select} text-lg`}
                name="project-diff"
                id="project-diff"
                ref={(el) => (addRefs.current.projectDiff = el)}
            >
                <option className={addForms.select.option} value="newbie">newbie</option>
                <option className={addForms.select.option} value="junior">junior</option>
                <option className={addForms.select.option} value="mid">mid</option>
                <option className={addForms.select.option} value="senior">senior</option>
            </select>
            <label
                className={addForms.label.label}
                htmlFor="project-endDate"
            >
                Project completion date:
            </label>
            <input
                className={`${addForms.input.input} text-lg`}
                type="date"
                name="project-endDate"
                id="project-endDate"
                ref={(el) => (addRefs.current.projectEndDate = el)}
            />
            <button
                className={addForms.btnSave.btnSave}
                type="submit"
            >
                Save
            </button>
        </form>
    )
}