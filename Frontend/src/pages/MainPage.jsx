import LeftSidebar from "../components/LeftSidebar";
import MainLeftContainer from "../components/MainLeftContainer";
import MainRightContainer from "../components/MainRightContainer";


export default function MainPage() {
    
    return (
        <main className="w-screen h-dvh overflow-hidden flex justify-around flex-nowrap font-sans mr-9">
           <LeftSidebar />
            <div id="content" className='relative w-full h-content flex flex-row flex-nowrap mt-5 mr-9'>
                <MainLeftContainer />
                <MainRightContainer />
            </div>
        </main>
    );
};