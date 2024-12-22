import { useContext, useState } from "react";
import { DataContext } from '../../../store/data-context';

import DeleteSkill from "./data-forms/delete-forms/DeleteSkill";
import AddSkill from './data-forms/add-forms/AddSkill';
import { cmsComponents } from "./cms-componenst-styles";

export default function ManageSkills() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const skills = dataCtx.fetchedData.data.skills;
    const { refreshData } = dataCtx;

    const [selectedSkill, setSelectedSkill] = useState(null);
    const [actionType, setActionType] = useState(null);

    const handleAddNewSkill = () => {
        setActionType('add')
    };

    const handleDeleteSkill = (skill) => {
        setActionType('delete');
        setSelectedSkill(() => skill);
    };

    const handleCloseAction = () => {
        setActionType(null);
        refreshData();
    };

    if (actionType === 'add') {
        return <AddSkill onClose={handleCloseAction} />
    }

    if (actionType === 'delete') {
        return <DeleteSkill skillData={selectedSkill} onClose={handleCloseAction} />
    }

    return (
        <div className={cmsComponents.wrapper.wrapper}>
            <h2 className={cmsComponents.h2.h2}>Skills:</h2>
            <h3 className="text-sm text-zinc-300">( to go back, press "Manage" button )</h3>
            <button
                onClick={handleAddNewSkill}
                className={cmsComponents.addNew.addNew}
            >
                Add new
            </button>
            <ul className={cmsComponents.ul.ul}>
                {!loading && skills && Array.isArray(skills) ? (
                    skills.map((skill) => (
                        <li className={cmsComponents.li.li} key={skill.id}>
                            <span className={cmsComponents.span.span}>{skill.title}</span>
                            <span className={cmsComponents.span.span}>{skill.category}</span>
                            <span className={cmsComponents.span.span}>{skill.icon}</span>
                            <span className={cmsComponents.span.span}>{skill.iconColor}</span>
                            <div className={cmsComponents.manageSkills.buttonDiv}>
                                <button
                                    className={cmsComponents.actionBtn.actionBtn}
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