import { projectsClasses } from "./projectsClasses"


export default function Project({ projects, loading }) {

    return (
        <div className="w-full">
            <ul className="w-full grid grid-cols-2 grid-rows-2 gap-3">
                <li className="w-full">
                    <img className="w-full h-full rounded-md" src=".../../projects-photos/notesapp.png" alt="" />
                </li>
                <li>
                    <img className="w-full h-full rounded-md" src=".../../projects-photos/salaryapp.png" alt="" />
                </li>
            </ul>


        </div>
    )
}