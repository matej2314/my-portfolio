import { useContext } from "react";
import { DataContext } from '../../store/data-context';

import Project from "./Project";
import { projectsClasses } from "./projectsClasses";

export default function Projects() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const projects = dataCtx.fetchedData.data.projects;

    return (
        <div className="w-[98%] h-full flex flex-col justify-start">
            <Project projects={projects} loading={loading} />
        </div>
    )

}