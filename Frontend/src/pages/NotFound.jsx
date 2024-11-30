import { useMediaQuery } from 'react-responsive';

import MobileMenu from '../components/mobileElements/MobileMenu';
import LeftSidebar from '../components/LeftSidebar';
import { pagesClasses } from './pages-classes';


export default function NotFound() {

    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <>
            <main className={pagesClasses.notFound.wrapper}>
                {isMobile ? <MobileMenu /> : <LeftSidebar />}
                <div className={pagesClasses.notFound.contentWrapper}>
                    <p className='text-2xl'>Page not found.</p>
                </div>
            </main>
        </>
    )
}