
export const projectsClasses = {
    projects: {
        wrapper: "w-[98%] h-full w-full flex flex-col justify-start overflow-scroll no-scrollbar z-0",
    },
    project: {
        wrapper: "w-full z-0",
        ul: "w-full flex flex-col md:grid md:grid-cols-2 gap-9 pl-2 overflow-scroll no-scrollbar z-0",
        li: "relative w-full",
        projectImage: "max-w-72 max-h-72 rounded-md",
        hoverContent: "w-full h-full absolute bottom-0 left-o right-0 text-white flex flex-col justify-end items-center",
        contentWrapper: "w-full bg-black/80 flex flex-col justify-around items-center p-2 gap-2",
        h3: "text-lg underline underline-offset-1",
        description: "w-full flex flex-row justify-center text-sm whitespace-no-wrap",
        link: "underline underline-offset-2 hover:text-[#b8c785]",
    },
    projectsCategories: {
        wrapper: "w-full h-fit flex items-center bg-neutral-600/30 rounded-md",
        ul: "w-full flex flex-row justify-center items-center text-lg py-2 gap-16",
        button: "hover:text-[#b8c785]",
    },
}