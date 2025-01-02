import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../../store/auth-context";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { handleToastAndClose } from "../../../../../utils/handleToastAndClose";
import EditProjectForm from "./EditProjectForm";
import { editForms } from "../data-forms-classes";

const editProjectUrl = requestUrl.projects.put;

export default function EditProjects({ selectedProject, onClose }) {
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleSubmit = async (formRefs) => {
        if (user.role !== "admin") {
            toast.info("Sorry! You are not an admin!");
            return;
        }

        const formData = new FormData();
        formData.append("projectName", formRefs.projectName.current.value);
        formData.append("projectCat", formRefs.projectCat.current.value);
        formData.append("projectURL", formRefs.projectUrl.current.value);
        formData.append("goal", formRefs.projectGoal.current.value);
        formData.append("projectDesc", formRefs.projectDesc.current.value);
        formData.append("projectRepo", formRefs.projectRepo.current.value);
        formData.append("technologies", formRefs.technologies.current.value);
        formData.append("projectLongTxt", formRefs.projLongTxt.current.value);
        formData.append("projectDiff", formRefs.projectDiff.current.value);
        formData.append("projectEndDate", formRefs.projectEndDate.current.value);

        if (formRefs.mainScreens.current.files.length > 0) {
            const mainFiles = formRefs.mainScreens.current.files;
            for (let i = 0; i < mainFiles.length; i++) {
                formData.append("mainImages", mainFiles[i]);
            }
        } else {
            formData.append("projectScr", selectedProject.screen);
        }

        if (formRefs.galleryScreens.current.files.length > 0) {
            const galleryFiles = formRefs.galleryScreens.current.files;
            for (let i = 0; i < galleryFiles.length; i++) {
                formData.append("galleryImages", galleryFiles[i]);
            }
        }

        let images = false;
        if (
            formRefs.mainScreens.current.files.length > 0 ||
            formRefs.galleryScreens.current.files.length > 0
        ) {
            images = true;
        }

        try {
            await sendRequest({
                url: `${editProjectUrl}/${selectedProject.id}/${images}`,
                method: "PUT",
                data: formData,
            });
        } catch (error) {
            console.log("Błąd podczas edycji projektu.");
        }
    };

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);
        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <div className={editForms.editProjects.wrapper}>
            <h2 className="w-full h-fit flex justify-center text-slate-100 text-2xl">Edit selected project</h2>
            <h3 className="w-full flex justify-center text-slate-100 text-sm">(to go back, press "Manage" button)</h3>
            {error && <p>{error}</p>}
            <EditProjectForm
                selectedProject={selectedProject}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
