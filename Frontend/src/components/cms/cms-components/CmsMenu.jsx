
export default function CmsMenu({ handleSelected }) {

    return (
        <div className="w-fit h-fit flex flex-row justify-center items-center text-white gap-3">
            <h2>Manage:</h2>
            <ul className="w-full h-fit flex flex-row justify-center items-center gap-3">
                <li><button onClick={() => handleSelected('courses')}>Courses</button></li>
                <li><button onClick={() => handleSelected('posts')}>Posts</button></li>
                <li><button onClick={() => handleSelected('projects')}>Projects</button></li>
                <li><button onClick={() => handleSelected('services')}>Services</button></li>
                <li><button onClick={() => handleSelected('skills')}>Skills</button></li>
            </ul>
        </div>
    )
}