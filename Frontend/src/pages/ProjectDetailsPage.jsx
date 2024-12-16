import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from '../store/data-context'
import { useMediaQuery } from 'react-responsive';

import { imgUrl } from "../url";
import LeftSidebar from '../components/LeftSidebar';
import { pagesClasses } from "./pages-classes";
import MobileMenu from '../components/mobileElements/MobileMenu';
import { formDate } from "../utils/formatDate";
import ScreenGallery from "../components/projects/ScreenGallery";

export default function ProjectDetails() {
    const dataCtx = useContext(DataContext);
    const projects = dataCtx.fetchedData.data.projects || [];
    const { id } = useParams();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const selectedProject = projects.find((project) => project.id === id);

    if (!selectedProject) {
        return <p>Wybierz projekt.</p>
    }

    return (
        <>
            <div className={pagesClasses.projectsDetailsPage.wrapper}>
                {!isMobile ? < LeftSidebar /> : <MobileMenu />}
                <div className={pagesClasses.projectsDetailsPage.detailsWrapper}>
                    <div id="projects-details" className={pagesClasses.projectsDetailsPage.div}>
                        <h2 className={pagesClasses.projectsDetailsPage.projectTitle}>{selectedProject.title}</h2>
                        <div className="w-full h-fit flex flex-col md:flex-row justify-center items-center bg-neutral-600/30 border-2 border-white rounded-md text-base p-3 gap-4">
                            <div className="w-full h-fit flex flex-row justify-center items-center bg-lime-400 text-black gap-7 md:gap-5 rounded-md py-2">
                                <p className="w-fit h-fit underline underline-offset-1">Completion date:</p>
                                <p>{formDate(selectedProject.end_date)}</p>
                            </div>
                            <div className="w-full h-fit flex flex-row justify-center items-center bg-lime-400 text-black  rounded-md py-2 gap-4 pl-5 md:gap-5 md:pl-5">
                                <p className="w-fit h-fit flex justify-self-center justify-end underline underline-offset-1">Tech stack:</p>
                                <p className="w-full h-fit">{selectedProject.technologies}</p>
                            </div>
                            <div className="w-full h-fit flex flex-row justify-center items-center bg-lime-400 text-black gap-8 md:gap-5 rounded-md py-2">
                                <p className="w-full h-fit flex flex-row justify-end underline underline-offset-1">Difficulty:</p>
                                <p className="w-full h-fit flex flex-row justify-start">{selectedProject.difficulty}</p>
                            </div>
                        </div>
                        <a className={pagesClasses.projectsDetailsPage.repoLink} href={selectedProject.repo}>Github repository</a>
                        <img
                            className={pagesClasses.projectsDetailsPage.screenshot}
                            src={`${imgUrl}/${selectedProject.project_screenName}-640.png`}
                            srcSet={`
                                ${imgUrl}/${selectedProject.project_screenName}-320.png 320w,
                                ${imgUrl}/${selectedProject.project_screenName}-640.png 640w,
                                ${imgUrl}/${selectedProject.project_screenName}.png 1100w
                                `}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            alt="" />
                        <div className="w-full h-fit flex flex-col justify-center items-center">
                            <h2 className={pagesClasses.projectsDetailsPage.subtitle}>Description:</h2>
                            <p className={pagesClasses.projectsDetailsPage.description}>{selectedProject.long_text}</p>
                            {selectedProject.link === 'localhost' ? null : <div className={pagesClasses.projectsDetailsPage.linkWrapper}>
                                <p className={pagesClasses.projectsDetailsPage.linkParagraph}>
                                    Link to the demo :
                                </p>
                                <a className={pagesClasses.projectsDetailsPage.demoLink} href={selectedProject.link}>{selectedProject.title}</a>
                            </div>}
                        </div>
                        <div className="w-screen h-fit flex flex-col justify-center items-center gap-4">
                            <h2 className={pagesClasses.projectsDetailsPage.subtitle}>
                                Gallery:
                            </h2>
                            <ScreenGallery id={selectedProject.id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}