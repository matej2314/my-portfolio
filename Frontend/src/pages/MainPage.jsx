import LeftSidebar from "../components/LeftSidebar";
import MainLeftContainer from "../components/MainLeftContainer";
import MainRightContainer from "../components/MainRightContainer";


export default function MainPage() {
    const codeSign = "</>";
    return (
        <main className="w-screen h-dvh overflow-hidden flex justify-around flex-nowrap font-sans">
           <LeftSidebar />
            <div id="content" className='relative left-6 w-full h-content flex flex-row flex-nowrap mx-9 mt-5'>
                <MainLeftContainer />
                <MainRightContainer />
               
            </div>
        </main>
    );
};