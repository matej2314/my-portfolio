import { useContext } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from '../store/data-context'
import { imgUrl } from "../url";

import LeftSidebar from '../components/LeftSidebar';

export default function ProjectDetails() {
    const { id } = useParams();

    const dataCtx = useContext(DataContext);
    const projects = dataCtx.fetchedData.data.projects || [];
    const selectedProject = projects.find((project) => project.id === id);
    console.log(selectedProject);

    if (!selectedProject) {
        return <p>Wybierz projekt.</p>
    }

    return (
        <>
            <div className="w-screen h-dvh bg-black overflow-hidden flex justify-around flex-nowrap">
                <LeftSidebar />
                <div className="w-full h-content flex justify-center mt-5 mr-9 bg-neutral-600/30 text-slate-200 p-2 overflow-scroll no-scrollbar">
                    <div id="projects-details" className="w-3/4 h-full flex flex-col items-center pt-1 px-2 pb-2 overflow-scroll no-scrollbar gap-4">
                        <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                        <img className="border-8 border-slate-200 rounded-sm" src={`${imgUrl}/${selectedProject.project_screenName}`} alt="" />
                        <p className="w-full flex flex-row justify-stretch mt-2 text-xl px-4">{selectedProject.description}</p>
                        <a className="text-xl underline underline-offset-1 hover:text-[#b8c785]" href="http://">Github repository</a>
                    </div>
                </div>

            </div>
        </>
    )
}