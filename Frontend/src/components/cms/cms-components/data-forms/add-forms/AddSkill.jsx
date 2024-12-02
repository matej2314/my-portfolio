import { useRef } from "react"
import useSendRequest from "../../../../../hooks/useSendRequest"
import { requestUrl } from "../../../../../url"

export default function AddSkill() {
    const skillName = useRef();
    const skillCat = useRef();
    const skillIcon = useRef();
    const skillIconColor = useRef();

    const { sendRequest, result, error } = useSendRequest();

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
            })
        } catch (error) {
            console.log('Nie udało się dodać nowego skilla');
        }
    };


    return (
        <div>
            <h2>Add new skill</h2>
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="skill-name">Skill name:</label>
                <input type="text" name="skill-name" id="skill-name" ref={skillName} />
                <label htmlFor="skill-category">Skill category:</label>
                <input type="text" name="skill-category" id="skill-category" ref={skillCat} />
                <label htmlFor="skill-icon">Skill icon:</label>
                <input type="text" name="skill-icon" id="skill-icon" ref={skillIcon} />
                <label htmlFor="icon-color">Icon color - optional</label>
                <input type="text" name="icon-color" id="icon-color" ref={skillIconColor} />
                <input type="submit" value="Save" />
            </form>
        </div>
    )
}