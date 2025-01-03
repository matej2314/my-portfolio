import { useRef, useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { addForms } from "../data-forms-classes";
import { handleToastAndClose } from "../../../../../utils/handleToastAndClose";
import AddProjectForm from "./AddProjectForm";

const addProjectUrl = requestUrl.projects.new;

export default function AddProject({ onClose }) {

    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleSubmit = async (addRefs) => {

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        }

        const formData = new FormData();

        formData.append('projectName', addRefs.current.projectName.value);
        formData.append('projectCat', addRefs.current.projectCat.value);
        formData.append('prURL', addRefs.current.projectUrl.value);
        formData.append('description', addRefs.current.projectDesc.value);
        formData.append('goal', addRefs.current.projectGoal.value);
        formData.append('repo', addRefs.current.projectRepo.value);
        formData.append('technologies', addRefs.current.technologies.value);
        formData.append('longText', addRefs.current.projectLongTxt.value);
        formData.append('projectDiff', addRefs.current.projectDiff.value);
        formData.append('endDate', addRefs.current.projectEndDate.value);

        // Main photos
        const mainFiles = addRefs.current.projectScr.files;
        for (let i = 0; i < mainFiles.length; i++) {
            formData.append('mainImages', mainFiles[i]);
        };

        // Photos for gallery
        const galleryFiles = addRefs.current.galleryScr.files;
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
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <div className={addForms.addProject.wrapper}>
            <h2 className={addForms.h2.h2}>Add new Project</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            {error && <p className={addForms.message.error}>{error}</p>}
            <AddProjectForm onSubmit={handleSubmit} />
        </div>
    )
}