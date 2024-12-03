import { useState, useContext } from "react"
import { AuthContext } from '../../store/auth-context';
import { cmsPages } from "./cmsPages-styles"
import CmsMenu from "./cms-components/CmsMenu";
import ManageCourses from './cms-components/ManageCourses';
import ManagePosts from './cms-components/ManagePosts';
import ManageProjects from './cms-components/ManageProjects';
import ManageServices from './cms-components/ManageServices';
import ManageSkills from './cms-components/ManageSkills';


export default function CmsMainPage() {
    const [selectedButton, setSelectedButton] = useState(null);
    const { isAuthenticated } = useContext(AuthContext);

    const handleSelected = (button) => {
        setSelectedButton(button);
    };

    const selectedComponent = () => {
        switch (selectedButton) {
            case 'courses':
                return <ManageCourses />
            case 'posts':
                return <ManagePosts />
            case 'projects':
                return <ManageProjects />
            case 'services':
                return <ManageServices />
            case 'skills':
                return <ManageSkills />
            default:
                return null;
        }
    }

    return (
        <main className={cmsPages.mainPage.main}>
            <CmsMenu handleSelected={handleSelected} />
            <div className="w-full h-full flex flex-row justify-center items-stretch">
                {selectedButton ? selectedComponent() : (
                    <div className="w-full h-full flex flex-row justify-center items-center">
                        <p className="text-2xl text-white font-bold">Select category</p>
                    </div>
                )}
            </div>
        </main>
    )
}