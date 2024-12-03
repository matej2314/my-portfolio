import { useContext, useState } from "react";
import { DataContext } from '../../../store/data-context';

import DeleteSkill from "./data-forms/delete-forms/DeleteSkill";
import AddSkill from './data-forms/add-forms/AddSkill';
import { cmsComponents } from "./cms-componenst-styles";

export default function ManageSkills() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const skills = dataCtx.fetchedData.data.skills;

    const [selectedSkill, setSelectedSkill] = useState(null);
    const [actionType, setActionType] = useState(null);

    const handleAddNewSkill = () => {
        setActionType('add')
    };

    const handleDeleteSkill = (skill) => {
        setActionType('delete');
        setSelectedSkill(skill);
    };

    if (actionType === 'add') {
        return <AddSkill />
    }

    if (actionType === 'delete') {
        return <DeleteSkill skillData={selectedSkill} />
    }

    return (
        <div className={cmsComponents.manageSkills.wrapper}>
            <h2 className={cmsComponents.manageSkills.h2}>Skills:</h2>
            <button
                onClick={handleAddNewSkill}
                className={cmsComponents.manageSkills.addNew}
            >
                Add new
            </button>
            <ul className={cmsComponents.manageSkills.ul}>
                {!loading && skills && Array.isArray(skills) ? (
                    skills.map((skill) => (
                        <li className={cmsComponents.manageSkills.li} key={skill.id}>
                            <span className={cmsComponents.manageSkills.span}>{skill.id}</span>
                            <span className={cmsComponents.manageSkills.span}>{skill.title}</span>
                            <span className={cmsComponents.manageSkills.span}>{skill.category}</span>
                            <span className={cmsComponents.manageSkills.span}>{skill.icon}</span>
                            <span className={cmsComponents.manageSkills.span}>{skill.iconColor}</span>
                            <div className={cmsComponents.manageSkills.buttonDiv}>
                                <button
                                    onClick={() => handleDeleteSkill(skill)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No skills</p>
                )}
            </ul>
        </div>
    )
}