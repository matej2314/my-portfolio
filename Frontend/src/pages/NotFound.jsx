import { useMediaQuery } from 'react-responsive';

import MobileMenu from '../components/mobileElements/MobileMenu';
import LeftSidebar from '../components/LeftSidebar';


export default function NotFound() {

    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <>
            <main className='w-90dvw h-dvh flex flex-col items-center justify-between ml-5 md:ml-0 md:flex-row md:justify-between'>
                {isMobile ? <MobileMenu /> : <LeftSidebar />}
                <div className='w-full h-content bg-neutral-600/30 flex flex-row justify-center items-start md:items-center text-white mr-9'>
                    <p className='text-2xl'>Page not found.</p>
                </div>
            </main>
        </>
    )
}