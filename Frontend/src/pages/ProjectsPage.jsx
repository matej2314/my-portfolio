import { useState } from 'react';

import Projects from '../components/projects/Projects';
import MobileMenu from '../components/mobileElements/MobileMenu';
import ProjectsCategories from '../components/projects/ProjectsCategories';
import { projectsClasses } from '../components/projects/projectsClasses';
import { pagesClasses } from './pages-classes';

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    function setProjectCat(category) {
        setSelectedCategory(category);
    };

    return (
        <main className={pagesClasses.projectsPage.wrapper}>
            <MobileMenu />
            <div className={pagesClasses.projectsPage.contentWrapper}>
                <Projects selectedCategory={selectedCategory} isMobile={true} />
                <ProjectsCategories setProjectCat={setProjectCat} />
            </div>
        </main >
    )
}