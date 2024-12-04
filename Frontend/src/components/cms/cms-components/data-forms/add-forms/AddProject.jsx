import { useRef, useEffect } from "react";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { addForms } from "../data-forms-classes";

const addProjectUrl = requestUrl.projects.new;

export default function AddProject({ onClose }) {
    const values = useRef({
        projectName: null,
        projectCat: null,
        projectUrl: null,
        projectScr: null,
        projectDesc: null,
        projectRepo: null,
        projectLongTxt: null,
    });

    const { sendRequest, result, error } = useSendRequest();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            projectName: values.current.projectName.value,
            projectCat: values.current.projectCat.value,
            prURL: values.current.projectUrl.value,
            prScrName: values.current.projectScr.value,
            description: values.current.projectDesc.value,
            repo: values.current.projectRepo.value,
            longText: values.current.projectLongTxt.value,
        };

        try {
            await sendRequest({
                url: addProjectUrl,
                data: data,
            });

        } catch (error) {
            console.log('Nie udało się dodać projektu', error);
        }

    };

    useEffect(() => {
        if (result && !error) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [result, error, onCLose])

    return (
        <div className={addForms.addProject.wrapper}>
            <h2 className={addForms.addProject.h2}>Add new Project</h2>
            {result && result.message && <p className={addForms.message.result}>{result.message}</p>}
            {error && <p className={addForms.message.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={addForms.addProject.h2}>
                <label className={addForms.label.label} htmlFor="project-name">Project name:</label>
                <input className={addForms.input.input} type="text" name="project-name" id="project-name" ref={(el) => (values.current.projectName = el)} />
                <label className={addForms.label.label} htmlFor="project-category">Project Category:</label>
                <input className={addForms.input.input} type="text" name="project-category" id="project-category" ref={(el) => (values.current.projectCat = el)} />
                <label className={addForms.label.label} htmlFor="project-url">Project URL:</label>
                <input className={addForms.input.input} type="url" name="project-url" id="project-url" ref={(el) => (values.current.projectUrl = el)} />
                <label className={addForms.label.label} htmlFor="project-screen">Screen name:</label>
                <input className={addForms.input.input} type="text" name="project-screen" id="project-screen" ref={(el) => (values.current.projectScr = el)} />
                <label className={addForms.label.label} htmlFor="project-description">Project short description</label>
                <textarea className={addForms.input.input} name="project-description" id="project-descritpion" ref={(el) => (values.current.projectDesc = el)} />
                <label className={addForms.label.label} htmlFor="project-repo">Project repository URL:</label>
                <input className={addForms.input.input} type="url" name="project-repo" id="project-repo" ref={(el) => (values.current.projectRepo = el)} />
                <label className={addForms.label.label} htmlFor="project-longText">Long Description:</label>
                <textarea className={addForms.input.input} name="project-longText" id="project-longText" ref={(el) => (values.current.projectLongTxt = el)} />
                <button className={addForms.btnSave.btnSave} type="submit">Save</button>
            </form>
        </div>
    )
}