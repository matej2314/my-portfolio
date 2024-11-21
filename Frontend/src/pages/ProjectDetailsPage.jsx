import { useContext } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from '../store/data-context'

import LeftSidebar from '../components/LeftSidebar';

export default function ProjectDetails() {

    const dataCtx = useContext(DataContext);
    const projects = dataCtx.fetchedData.data.projects;



    return (
        <>
            <div className="w-screen h-dvh bg-black overflow-hidden flex justify-around flex-nowrap">
                <LeftSidebar />
                <div className="w-full h-content flex justify-center mt-5 mr-9 bg-slate-300">
                    <p className="text-black">Details of projects</p>
                </div>

            </div>
        </>
    )
}