import { useContext } from "react"
import { AuthContext } from '../../store/auth-context';
import { DataContext } from '../../store/data-context';

import { cmsPages } from "./cmsPages-styles"
import CmsMenu from "./cms-components/CmsMenu";
import ManageCourses from './cms-components/ManageCourses';
import ManagePosts from './cms-components/ManagePosts';
import ManageProjects from './cms-components/ManageProjects';
import ManageServices from './cms-components/ManageServices';
import ManageSkills from './cms-components/ManageSkills';


export default function CmsMainPage() {
    const { isAuthenticated } = useContext(AuthContext);


    return (
        <main className={cmsPages.mainPage.main}>
            <CmsMenu />
        </main>
    )
}