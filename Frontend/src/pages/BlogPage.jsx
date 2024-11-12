import LeftSidebar from "../components/LeftSidebar";


export default function BlogPage() {
    return (
        <div className="w-screen h-dvh overflow-hidden flex justify-around flex-nowrap font-sans mr-9">
            <LeftSidebar />
            <div className="w-[95vw] h-content bg-neutral-600/30 mt-5 mr-9 flex flex-row items-center justify-center">
                <p className="text-gray-200 text-4xl">Work in progress</p>
            </div>
        </div>
    )
}