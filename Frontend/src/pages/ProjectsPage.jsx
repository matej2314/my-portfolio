import Projects from '../components/projects/Projects';
import MobileMenu from '../components/mobileElements/MobileMenu';
import ProjectsCategories from '../components/projects/ProjectsCategories';


export default function ProjectsPage() {

    return (
        <main className='w-full h-content flex flex-col items-center py-4'>
            <MobileMenu />
            <div>
                <Projects />
            </div>
        </main>
    )
}