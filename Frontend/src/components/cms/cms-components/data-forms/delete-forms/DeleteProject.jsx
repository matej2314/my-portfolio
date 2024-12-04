import { useState, useEffect } from "react";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { deleteForms } from "../data-forms-classes";
import ManageProjects from "../../ManageProjects";

const deleteProjectUrl = requestUrl.projects.delete;

export default function DeleteProject({ selectedProject, onClose }) {
    const [denyDelete, setDenyDelete] = useState(false);
    const { sendRequest, result, error } = useSendRequest();

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
    };

    useEffect(() => {
        if (result && !error) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [error, result, onClose]);


    return (
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>Czy na pewno chcesz usunąć projekt:</h2>
            {selectedProject.title && <p>{selectedProject.title} ?</p>}
            {selectedProject.id && <p>id: {selectedProject.id}</p>}

            {result && result.message && <p className={deleteForms.messages.result}>{result.message}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteProject}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )

}