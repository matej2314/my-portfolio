import { forwardRef } from 'react';
import { editForms } from '../data-forms-classes.js';

const EditProjectForm = forwardRef(({
    selectedProject,
    onSubmit,
    error,
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
    projectEndDate
}, ref) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({
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
                projectEndDate
            });
        }
    };

    return (
        <div className={editForms.editProjects.wrapper}>
            <h2 className="text-2xl">Edit selected project</h2>
            <h3 className="text-sm">( to go back, press "Menu" button )</h3>
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
    );
});

export default EditProjectForm;
