import { useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from "../../../../../store/auth-context";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { handleToastAndClose } from "../../../../../utils/handleToastAndClose";
import { requestUrl } from "../../../../../url";
import { deleteForms } from "../data-forms-classes";

const deleteSkillUrl = requestUrl.skills.delete;


export default function DeleteSkill({ skillData, onClose }) {
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleDeleteSkill = async () => {
        const skillId = skillData.id;

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        }

        try {
            await sendRequest({
                url: deleteSkillUrl,
                method: "DELETE",
                data: { skillId: skillId }
            });

        } catch (error) {

        }
    };

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>Czy na pewno chcesz usunąć skill?</h2>
            {skillData.title && <p>{skillData.title}</p>}
            {skillData.id && <p>id: {skillData.id}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteSkill}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={onClose}>Nie</button>
            </div>
        </div>
    )
}