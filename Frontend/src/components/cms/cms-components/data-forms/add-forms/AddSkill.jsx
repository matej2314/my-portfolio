import { useRef, useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from "../../../../../hooks/useSendRequest"
import { requestUrl } from "../../../../../url"
import { addForms } from "../data-forms-classes";
import { handleToastAndClose } from "../../../../../utils/handleToastAndClose";

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

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        };

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
            console.log('Failed to add new skill.');
        }
    };

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <div className={addForms.addSkill.wrapper}>
            <h2 className={addForms.h2.h2}>Add new skill</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            {error && <p className={addForms.message.error}>{error}</p>}
            <form className={addForms.addSkill.form} onSubmit={handleSubmit}>
                <label className={addForms.label.label} htmlFor="skill-name">Skill name:</label>
                <input className={addForms.input.input} type="text" name="skill-name" id="skill-name" ref={skillName} />
                <label className={addForms.label.label} htmlFor="skill-category">Choose skill category:</label>
                <select
                    className={addForms.select.select}
                    name="skill-category"
                    id="skill-category"
                    ref={skillCat} >
                    <option className={addForms.select.option} value="WebDev">WebDev</option>
                    <option className={addForms.select.option} value="DevOps">DevOps</option>
                    <option className={addForms.select.option} value="SEO">SEO</option>
                    <option className={addForms.select.option} value="Security">Security</option>
                </select>
                <label className={addForms.label.label} htmlFor="skill-icon">Skill icon:</label>
                <input className={addForms.input.input} type="text" name="skill-icon" id="skill-icon" ref={skillIcon} />
                <label className={addForms.label.label} htmlFor="icon-color">Icon color - optional</label>
                <input className={addForms.input.input} type="text" name="icon-color" id="icon-color" ref={skillIconColor} />
                <button className={addForms.btnSave.btnSave} type="submit">Save</button>
            </form>
        </div>
    )
}