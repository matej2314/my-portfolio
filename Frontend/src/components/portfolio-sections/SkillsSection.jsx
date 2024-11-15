import { useContext } from "react"
import { DataContext } from "../../store/data-context"

import Skill from "./Skill"

export default function SkillsSection() {

    // const dataCtx = useContext(DataContext);


    return (
        <section id="skills-section" className=" w-full flex flex-col items-stretch mt-4 border-dotted border-b-2 border-[#6f963b]">
            <h2 className="w-full flex justify-center text-2xl mb-4 font-sans">Skills</h2>
            <ul className="w-full grid grid-cols-2 gap-7 pl-11 pr-3 mb-4 text-xl">
               <Skill />
            </ul>
        </section>
 )
}