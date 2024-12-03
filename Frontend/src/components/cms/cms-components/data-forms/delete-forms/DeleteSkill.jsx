import { useState } from "react";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { deleteForms } from "../data-forms-classes";
import ManageSkills from '../../ManageSkills';

const deleteSkillUrl = requestUrl.skills.delete;


export default function DeleteSkill({ skillData }) {
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
    }

    return (
        <div>
            <h2>Czy na pewno chcesz usunąć skill?</h2>
            {skillData.id && <p>O id: {skillData.id}</p>}
            {skillData.title && <p>i nazwie: {skillData.title} ?</p>}
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
            <div>
                <button onClick={handleDeleteSkill}>Tak</button>
                <button onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )
}