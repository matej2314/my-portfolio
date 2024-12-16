import { useContext } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from '../store/data-context'
import { useMediaQuery } from 'react-responsive';
import { Icon } from "@iconify/react/dist/iconify.js";

import { imgUrl } from "../url";
import LeftSidebar from '../components/LeftSidebar';
import FittedIcon from '../components/icons/FittedIcon';
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
    };

    return (
        <>
            <div className={pagesClasses.projectsDetailsPage.wrapper}>
                {!isMobile ? < LeftSidebar /> : <MobileMenu />}
                <div className={pagesClasses.projectsDetailsPage.detailsWrapper}>
                    <div id="projects-details" className={pagesClasses.projectsDetailsPage.div}>
                        <h2 className={pagesClasses.projectsDetailsPage.projectTitle}>{selectedProject.title}</h2>
                        <div className="w-full h-fit flex flex-col md:flex-row justify-center items-center text-base md:text-lg p-3 gap-4">
                            <div className="w-full h-full bg-lime-600 text-black font-semibold flex flex-col justify-center items-center gap-3 py-2 rounded-md">
                                <p className="w-fit h-fit flex justify-center items-center gap-1">
                                    <Icon icon="codicon:calendar" width={30} height={30} className="text-gray-300/80" />
                                    Completion date:
                                </p>
                                <p>{formDate(selectedProject.end_date)}</p>
                            </div>
                            <div className="w-full h-full bg-lime-600 text-black font-semibold flex justify-center items-center rounded-md">
                                <p className="w-full h-fit flex flex-col justify-center items-center gap-3 py-2 md:py-0">
                                    <span
                                        className="w-fit h-fit flex justify-center items-center gap-1"
                                    >
                                        <Icon icon="codicon:symbol-property" width={30} height={30} className="text-zinc-600" />
                                        Tech stack:
                                    </span>
                                    <span className="ml-6 md:ml-0">{selectedProject.technologies}</span>
                                </p>
                            </div>
                            <div className="w-full h-full bg-lime-600 text-black font-semibold flex flex-col justify-center items-center gap-3 py-2 rounded-md">
                                <p className="w-full h-fit flex justify-center items-center gap-1">
                                    <FittedIcon difficulty={selectedProject.difficulty} />
                                    Difficulty:</p>
                                <p className="w-full h-fit flex justify-center items-center">
                                    {selectedProject.difficulty}
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-fit flex flex-row justify-center items-center">
                            <a className={pagesClasses.projectsDetailsPage.repoLink} href={selectedProject.repo}>
                                <Icon icon="codicon:github" width={30} height={30} />
                                Github repository
                            </a>
                        </div>

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
                            <h2 className={`${pagesClasses.projectsDetailsPage.subtitle} w-full h-fit flex justify-center items-center gap-3`}>
                                <Icon icon="solar:gallery-bold" width={33} height={33} />
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