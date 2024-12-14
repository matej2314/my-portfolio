import { useRef, useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
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
        galleryScr: null,
        projectDesc: null,
        projectRepo: null,
        technologies: null,
        projectLongTxt: null,
        projectDiff: null,
        projectEndDate: null,
    });

    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        }

        const formData = new FormData();

        formData.append('projectName', values.current.projectName.value);
        formData.append('projectCat', values.current.projectCat.value);
        formData.append('prURL', values.current.projectUrl.value);
        formData.append('description', values.current.projectDesc.value); // Tekstowy opis projektu
        formData.append('repo', values.current.projectRepo.value);
        formData.append('technologies', values.current.technologies.value); // Technologie
        formData.append('longText', values.current.projectLongTxt.value); // Długi opis
        formData.append('projectDiff', values.current.projectDiff.value);
        formData.append('endDate', values.current.projectEndDate.value);

        // Pliki główne
        const mainFiles = values.current.projectScr.files;
        for (let i = 0; i < mainFiles.length; i++) {
            formData.append('mainImages', mainFiles[i]);
        };

        // Pliki galerii
        const galleryFiles = values.current.galleryScr.files;
        for (let i = 0; i < galleryFiles.length; i++) {
            formData.append('galleryImages', galleryFiles[i]);
        };

        try {
            await sendRequest({
                url: addProjectUrl,
                data: formData,
            });

        } catch (error) {
            console.log('Nie udało się dodać projektu', error);
        }

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
        <div className={addForms.addProject.wrapper}>
            <h2 className={addForms.h2.h2}>Add new Project</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            {error && <p className={addForms.message.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={addForms.addProject.form}>
                <label className={addForms.label.label} htmlFor="project-name">Project name:</label>
                <input className={addForms.input.input} type="text" name="project-name" id="project-name" ref={(el) => (values.current.projectName = el)} />
                <label className={addForms.label.label} htmlFor="project-category">Project Category:</label>
                <select
                    className={`${addForms.select.select} text-base`}
                    name="project-category"
                    id="project-category"
                    ref={(el) => (values.current.projectCat = el)}
                >
                    <option className={addForms.select.option} value="Frontend">Frontend</option>
                    <option className={addForms.select.option} value="Backend">Backend</option>
                    <option className={addForms.select.option} value="FullStack">FullStack</option>
                </select>
                <label className={addForms.label.label} htmlFor="project-url">Project URL:</label>
                <input className={addForms.input.input} type="url" name="project-url" id="project-url" ref={(el) => (values.current.projectUrl = el)} />
                <label className={addForms.label.label} htmlFor="project-screen">Upload main screens of the project:</label>
                <input className={addForms.input.input} type="file" name="project-screens" id="project-screens" ref={(el) => (values.current.projectScr = el)} multiple />
                <label className={addForms.label.label} htmlFor="gallery-screens">Upload screens to gallery:</label>
                <input type="file" className={addForms.input.input} id="gallery-screens" name="gallery-screens" ref={(el) => (values.current.galleryScr = el)} multiple />
                <label className={addForms.label.label} htmlFor="project-description">Project short description</label>
                <textarea className={addForms.input.input} name="project-description" id="project-descritpion" ref={(el) => (values.current.projectDesc = el)} />
                <label className={addForms.label.label} htmlFor="project-repo">Project repository URL:</label>
                <input className={addForms.input.input} type="url" name="project-repo" id="project-repo" ref={(el) => (values.current.projectRepo = el)} />
                <label className={addForms.label.label} htmlFor="project-tech">Tech stack:</label>
                <input className={addForms.input.input} type="text" name="project-tech" id="project-tech" ref={(el) => (values.current.technologies = el)} />
                <label className={addForms.label.label} htmlFor="project-longText">Long Description:</label>
                <textarea className={addForms.input.input} name="project-longText" id="project-longText" ref={(el) => (values.current.projectLongTxt = el)} />
                <label className={addForms.label.label} htmlFor="project-diff">Select project-difficulty:</label>
                <select className={`${addForms.select.select} text-lg`} name="project-diff" id="project-diff" ref={(el) => (values.current.projectDiff = el)}>
                    <option className={addForms.select.option} value="newbie">newbie</option>
                    <option className={addForms.select.option} value="junior">junior</option>
                    <option className={addForms.select.option} value="mid">mid</option>
                    <option className={addForms.select.option} value="senior">senior</option>
                </select>
                <label className={addForms.label.label} htmlFor="project-endDate">Project completion date:</label>
                <input className={`${addForms.input.input} text-lg`} type="date" name="project-endDate" id="project-endDate" ref={(el) => (values.current.projectEndDate = el)} />
                <button className={addForms.btnSave.btnSave} type="submit">Save</button>
            </form>
        </div>
    )
}