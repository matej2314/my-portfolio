import { useState, useContext } from "react";
import { DataContext } from "../../../../../store/data-context";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import ManageProjects from "../../ManageProjects";

const deleteProjectUrl = requestUrl.projects.delete;

export default function DeleteProject({ selectedProject }) {
    const [denyDelete, setDenyDelete] = useState(false);
    const { sendRequest, result, error } = useSendRequest();
    const { refreshData } = useContext(DataContext);

    const handleDeleteProject = async () => {
        const projectId = selectedProject.id;
        const projectName = selectedProject.title;

        try {
            await sendRequest({
                url: deleteProjectUrl,
                method: "DELETE",
                data: {
                    projectId: projectId,
                    projectName: projectName
                },
            });

        } catch (error) {
            console.log('Nie udało się usunąć projektu');
        }
    };

    const handleDenyDelete = () => {
        setDenyDelete(true);
    };

    if (denyDelete) {
        return <ManageProjects />
    }

    return (
        <div>
            <h2>Czy na pewno chcesz usunąć projekt:</h2>
            {selectedProject.id && <p>O id: {selectedProject.id}</p>}
            {selectedProject.title && <p>i nazwie: {selectedProject.title} ?</p>}
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
            <div>
                <button onClick={handleDeleteProject}>Tak</button>
                <button onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )

}