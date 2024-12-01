import { useContext } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from '../store/data-context'
import { useMediaQuery } from 'react-responsive';

import { imgUrl } from "../url";
import LeftSidebar from '../components/LeftSidebar';
import { pagesClasses } from "./pages-classes";
import MobileMenu from '../components/mobileElements/MobileMenu';

export default function ProjectDetails() {
    const { id } = useParams();

    const dataCtx = useContext(DataContext);
    const projects = dataCtx.fetchedData.data.projects || [];
    const selectedProject = projects.find((project) => project.id === id);


    if (!selectedProject) {
        return <p>Wybierz projekt.</p>
    }

    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <>
            <div className={pagesClasses.projectsDetailsPage.wrapper}>
                {!isMobile ? < LeftSidebar /> : <MobileMenu />}
                <div className={pagesClasses.projectsDetailsPage.detailsWrapper}>
                    <div id="projects-details" className={pagesClasses.projectsDetailsPage.div}>
                        <h2 className={pagesClasses.projectsDetailsPage.projectTitle}>{selectedProject.title}</h2>
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
                        <h2 className={pagesClasses.projectsDetailsPage.subtitle}>Description:</h2>
                        <p className={pagesClasses.projectsDetailsPage.description}>{selectedProject.long_text}</p>
                        {selectedProject.link === 'localhost' ? null : <div className={pagesClasses.projectsDetailsPage.linkWrapper}>
                            <p className={pagesClasses.projectsDetailsPage.linkParagraph}>
                                Link to the demo :
                            </p>
                            <a className={pagesClasses.projectsDetailsPage.demoLink} href={selectedProject.link}>{selectedProject.title}</a>
                        </div>}
                        <a className={pagesClasses.projectsDetailsPage.repoLink} href={selectedProject.repo}>Github repository</a>
                    </div>
                </div>

            </div>
        </>
    )
}