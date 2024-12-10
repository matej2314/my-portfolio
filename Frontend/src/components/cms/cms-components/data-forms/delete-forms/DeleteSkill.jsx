import { useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from "../../../../../store/auth-context";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { deleteForms } from "../data-forms-classes";

const deleteSkillUrl = requestUrl.skills.delete;


export default function DeleteSkill({ skillData, onClose }) {
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleDeleteSkill = async () => {
        const skillId = skillData.id;

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
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>Czy na pewno chcesz usunąć skill?</h2>
            {skillData.title && <p>{skillData.title}</p>}
            {skillData.id && <p>id: {skillData.id}</p>}
            {result && result.message && <p className={deleteForms.messages.result}>{result.message}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteSkill} disabled={user.role !== 'admin'}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={onClose}>Nie</button>
            </div>
        </div>
    )
}