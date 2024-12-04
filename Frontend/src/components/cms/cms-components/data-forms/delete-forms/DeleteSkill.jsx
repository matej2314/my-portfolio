import { useState, useEffect } from "react";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { deleteForms } from "../data-forms-classes";
import ManageSkills from '../../ManageSkills';

const deleteSkillUrl = requestUrl.skills.delete;


export default function DeleteSkill({ skillData, onClose }) {
    const [denyDelete, setDenyDelete] = useState(false);
    const { sendRequest, result, error } = useSendRequest();

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

    const handleDenyDelete = () => {
        setDenyDelete(true);
    }

    if (denyDelete) {
        return <ManageSkills />
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
            <h2 className={deleteForms.h2.h2}>Czy na pewno chcesz usunąć skill?</h2>
            {skillData.title && <p>{skillData.title}</p>}
            {skillData.id && <p>id: {skillData.id}</p>}
            {result && result.message && <p className={deleteForms.messages.result}>{result.message}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteSkill}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )
}