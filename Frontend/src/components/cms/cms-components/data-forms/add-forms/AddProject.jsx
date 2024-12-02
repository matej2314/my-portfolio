import { useRef } from "react";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";

const addProjectUrl = requestUrl.projects.new;

export default function AddProject() {

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

    return (
        <div>
            <h2>Add new Project</h2>
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="project-name">Project name:</label>
                <input type="text" name="project-name" id="project-name" ref={(el) => (values.current.projectName = el)} />
                <label htmlFor="project-category">Project Category:</label>
                <input type="text" name="project-category" id="project-category" ref={(el) = (values.current.projectCat = el)} />
                <label htmlFor="project-url">Project URL:</label>
                <input type="url" name="project-url" id="project-url" ref={(el) => (values.current.projectUrl = el)} />
                <label htmlFor="project-screen">Screen name:</label>
                <input type="text" name="project-screen" id="project-screen" ref={(el) => (values.current.projectScr = el)} />
                <label htmlFor="project-description">Project short description</label>
                <textarea name="project-description" id="project-descritpion" ref={(el) => (values.current.projectDesc = el)} />
                <label htmlFor="project-repo">Project repository URL:</label>
                <input type="url" name="project-repo" id="project-repo" ref={(el) => (values.current.projectRepo = el)} />
                <label htmlFor="project-longText">Long Description:</label>
                <textarea name="project-longText" id="project-longText" ref={(el) => (values.current.projectLongTxt = el)} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}