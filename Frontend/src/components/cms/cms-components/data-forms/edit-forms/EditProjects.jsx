import React, { useEffect, useContext, useRef } from "react";
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import EditProjectForm from './EditProjectForm';
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

    const handleSubmit = async (formData) => {
        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        };

        const { projectName, projectCat, projectUrl, mainScreens, galleryScreens, projectGoal, projectDesc, projectRepo, technologies, projLongTxt, projectDiff, projectEndDate } = formData;

        const data = new FormData();

        data.append('projectName', projectName.current.value);
        data.append('projectCat', projectCat.current.value);
        data.append('projectURL', projectUrl.current.value);
        data.append('goal', projectGoal.current.value);
        data.append('projectDesc', projectDesc.current.value);
        data.append('projectRepo', projectRepo.current.value);
        data.append('technologies', technologies.current.value);
        data.append('projectLongTxt', projLongTxt.current.value);
        data.append('projectDiff', projectDiff.current.value);
        data.append('projectEndDate', projectEndDate.current.value);

        if (mainScreens.current.files.length > 0) {
            for (let i = 0; i < mainScreens.current.files.length; i++) {
                data.append('mainImages', mainScreens.current.files[i]);
            }
        }

        if (galleryScreens.current.files.length > 0) {
            for (let i = 0; i < galleryScreens.current.files.length; i++) {
                data.append('galleryImages', galleryScreens.current.files[i]);
            }
        }

        try {
            await sendRequest({
                url: `${editProjectUrl}/${selectedProject.id}`,
                method: "PUT",
                data,
            });
        } catch (error) {
            console.log('Error during project edit.');
        }

    };

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);
        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <EditProjectForm
            selectedProject={selectedProject}
            onSubmit={handleSubmit}
            onClose={onClose}
            projectId={projectId}
            projectName={projectName}
            projectCat={projectCat}
            projectUrl={projectUrl}
            mainScreens={mainScreens}
            galleryScreens={galleryScreens}
            projectGoal={projectGoal}
            projectDesc={projectDesc}
            projectRepo={projectRepo}
            technologies={technologies}
            projLongTxt={projLongTxt}
            projectDiff={projectDiff}
            projectEndDate={projectEndDate}
            error={error}
        />
    );
}
