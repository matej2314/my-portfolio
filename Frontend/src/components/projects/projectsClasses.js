
export const projectsClasses = {
    projects: {
        wrapper: "w-[98%] h-full w-full flex flex-col justify-start overflow-scroll no-scrollbar z-0",
    },
    project: {
        wrapper: "w-full z-0",
        ul: "w-full grid grid-cols-2 gap-3 pl-2 overflow-scroll no-scrollbar z-0",
        li: "relative w-full",
        projectImage: "w-full h-full rounded-md",
        hoverContent: "w-full h-full absolute bottom-0 left-o right-0 text-white flex flex-col justify-end items-center",
        contentWrapper: "w-full bg-black/80 flex flex-col justify-around items-center p-2 gap-2",
        h3: "text-lg underline underline-offset-1",
        description: "w-full flex flex-row justify-center text-sm whitespace-no-wrap",
        link: "text-white hover:text-[#b8c785] underline underline-offset-2",
    },
    projectsCategories: {
        wrapper: "w-full h-fit flex items-center bg-neutral-600/30 rounded-md",
        ul: "w-full flex flex-row justify-center items-center text-lg py-2 gap-16",
        button: "hover:text-[#b8c785]",
    },
    modal: {
        overlay: "absolute top-0 left-0 translate-y-[1.2vh] translate-x-1/3 mx-auto flex flex-col justify-center z-100 p-2",
        contentWrapper: "bg-white w-[1/2vw] h-[3/4vh] rounded-md text-black p-2",
        closeButton: "absolute top-2 right-4 cursor-pointer",
        img: "w-[50rem] h-[25rem] my-2",
        h2: "w-full h-fit flex flex-row justify-center mt- text-xl font-bold",
    },
}