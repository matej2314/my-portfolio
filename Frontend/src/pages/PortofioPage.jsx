import LeftSidebar from "../components/LeftSidebar";
import Portfolio from "../components/Portfolio";


export default function PortfolioPage() {
    return (
        <div className="relative w-full h-content flex flex-row flex-nowrap">
            <LeftSidebar />
            <div className="bg-neutral-600/30 text-gray-300 w-11/12 h-content rounded-md flex flex-col justify-between overflow-scroll no-scrollbar mr-9 my-5">
                    <Portfolio/>
                    </div>
                </div>
    )
};

