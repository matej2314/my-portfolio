import { useState } from 'react';

import Projects from '../components/projects/Projects';
import MobileMenu from '../components/mobileElements/MobileMenu';
import ProjectsCategories from '../components/projects/ProjectsCategories';


export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    function setProjectCat(category) {
        setSelectedCategory(category);
    };

    return (
        <main className='w-full h-[101vh] flex flex-col items-center py-4 gap-2 overflow-y-scroll no-scrollbar px-4'>
            <MobileMenu />
            <div className='w-full h-[100vh] flex flex-col justify-center bg-neutral-600/30 text-slate-300 pl-4 overflow-y-scroll overflow-x-hidden'>
                <Projects selectedCategory={selectedCategory} isMobile={true} />
                <ProjectsCategories setProjectCat={setProjectCat} />
            </div>
        </main>
    )
}