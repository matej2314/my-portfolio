import { useContext, useState } from "react";
import { DataContext } from '../../../store/data-context';

export default function ManageSkills() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const skills = dataCtx.fetchedData.data.skills;

    const [selectedSkill, setSelectedSkill] = useState(null);

    const handleAddNewSkill = () => {
        console.log('add new skill')
    };

    const handleDeleteSkill = (skillId) => {
        setSelectedSkill(skillId)
    };

    const handleEditSkill = (skillData) => {
        setSelectedSkill(() => skillData);
    }
    console.log(selectedSkill)
    return (
        <div className="w-[100vw] h-fit flex flex-col justify-start items-center text-lg text-white p-0 gap-2">
            <h2 className="w-full h-fit flex flex-row justify-center">Skills:</h2>
            <button
                onClick={handleAddNewSkill}
                className="w-fit h-fit text-lg text-white"
            >
                Add new
            </button>
            <ul className="w-fit h-fit flex flex-col justify-center items-center text-sm text-white border-2 border-l-cyan-100 p-4 gap-4">
                {!loading && skills && Array.isArray(skills) ? (
                    skills.map((skill) => (
                        <li className="w-full h-full flex flex-row items-start justify-center text-white text-sm gap-2 border-b-2 border-black p-2" key={skill.id}>
                            <span className="w-full">{skill.id}</span>
                            <span className="w-full">{skill.title}</span>
                            <span className="w-full">{skill.category}</span>
                            <span className="w-full">{skill.icon}</span>
                            <span className="w-full">{skill.iconColor}</span>
                            <div className="w-fit h-fit flex flex-col gap-2">
                                <button
                                    onClick={() => handleEditSkill({
                                        id: skill.id,
                                        title: skill.title,
                                        category: skill.category,
                                        icon: skill.icon,
                                        iconColor: skill.iconColor
                                    })}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteSkill(skill.id)}
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
        </div >
    )
}