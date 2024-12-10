import { useRef, useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from "../../../../../hooks/useSendRequest"
import { requestUrl } from "../../../../../url"
import { addForms } from "../data-forms-classes";

export default function AddSkill({ onClose }) {
    const skillName = useRef();
    const skillCat = useRef();
    const skillIcon = useRef();
    const skillIconColor = useRef();

    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addSkillUrl = requestUrl.skills.new;

        const data = {
            skillName: skillName.current.value,
            skillCat: skillCat.current.value,
            icon: skillIcon.current.value,
            iconColor: skillIconColor.current.value,
        };

        try {
            await sendRequest({
                url: addSkillUrl,
                data: data
            });

        } catch (error) {
            console.log('Nie udało się dodać nowego skilla');
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
        <div className={addForms.addSkill.wrapper}>
            <h2 className={addForms.h2.h2}>Add new skill</h2>
            {error && <p className={addForms.message.error}>{error}</p>}
            <form className={addForms.addSkill.form} onSubmit={handleSubmit}>
                <label className={addForms.label.label} htmlFor="skill-name">Skill name:</label>
                <input className={addForms.input.input} type="text" name="skill-name" id="skill-name" ref={skillName} />
                <label className={addForms.label.label} htmlFor="skill-category">Skill category:</label>
                <input className={addForms.input.input} type="text" name="skill-category" id="skill-category" ref={skillCat} />
                <label className={addForms.label.label} htmlFor="skill-icon">Skill icon:</label>
                <input className={addForms.input.input} type="text" name="skill-icon" id="skill-icon" ref={skillIcon} />
                <label className={addForms.label.label} htmlFor="icon-color">Icon color - optional</label>
                <input className={addForms.input.input} type="text" name="icon-color" id="icon-color" ref={skillIconColor} />
                <button className={addForms.btnSave.btnSave} type="submit" disabled={user.role !== 'admin'}>Save</button>
            </form>
        </div>
    )
}