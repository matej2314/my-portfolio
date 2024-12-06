import { useState, useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from '../../store/auth-context';
import { cmsPages } from "./cmsPages-styles"
import CmsMenu from "./cms-components/CmsMenu";
import ManageCourses from './cms-components/ManageCourses';
import ManagePosts from './cms-components/ManagePosts';
import ManageProjects from './cms-components/ManageProjects';
import ManageServices from './cms-components/ManageServices';
import ManageSkills from './cms-components/ManageSkills';
import ManageInterests from "./cms-components/ManageInterests";
import ManageAbout from './cms-components/ManageAbout';


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
            case 'about':
                return <ManageAbout />
            case 'interests':
                return <ManageInterests />
            default:
                return null;
        }
    }

    return (
        <>
            {isAuthenticated ? (
                <main className={cmsPages.mainPage.main}>
                    <CmsMenu handleSelected={handleSelected} />
                    <div className={cmsPages.mainPage.contentWrapper}>
                        {selectedButton ? selectedComponent() : (
                            <div className={cmsPages.mainPage.parWrapper}>
                                <p className={cmsPages.mainPage.paragraph}>Select category</p>
                            </div>
                        )}
                    </div>
                </main>
            ) : (
                <main className={cmsPages.mainPage.main}>
                    <CmsMenu handleSelected={handleSelected} />
                    <div className={cmsPages.mainPage.parWrapper}>
                        <p className={cmsPages.mainPage.paragraph}>Aby skorzystać z panelu, <Link to="/login_admin" className="hover:text-lime-600">zaloguj się</Link></p>
                    </div>

                </main>
            )}
        </>
    )
}