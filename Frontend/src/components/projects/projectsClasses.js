export const projectsClasses = {
    projects: {
        wrapper: "w-[98%] h-full flex flex-col justify-start overflow-scroll no-scrollbar z-0",
    },
    project: {
        wrapper: "relative w-full h-80 z-0 flex flex-row justify-center pt-10 md:pt-0",
        ul: "relative w-full h-[75vh] gap-9 flex flex-col justify-between xl:grid xl:grid-cols-2 xl:gap-9 pl-2 overflow-scroll no-scrollbar z-0",
        li: "relative w-full h-fit flex flex-row justify-center",
        projectImage: "max-h-80 sm:max-w-92 md:max-w-80 md:max-h-72 rounded-md",
        hoverContent: "absolute w-full h-80 w-fit justify-self-center bottom-0 left-0 right-0 text-white flex flex-col justify-end items-center indirect:absolute indirect:w-[74vw] sm:absolute sm:w-[56%] md:absolute md:w-full md:h-80 md:text-base",
        contentWrapper: "absolute w-full bg-black/80 flex flex-col justify-center indirect:w-[87vw] items-center p-1 gap-1 md:w-80 md:flex-col md:gap-1",
        h3: "text-sm md:text-lg underline underline-offset-1",
        description: "w-full flex flex-row justify-center text-[0.5rem] md:flex md:flex-col md:justify-center md:text-base md:pl-2.5 md:whitespace-pre-wrap",
        link: "underline underline-offset-2 hover:text-[#b8c785]",
    },
    projectsCategories: {
        wrapper: "w-full h-fit flex items-center bg-neutral-600/30 rounded-md",
        ul: "w-full flex flex-row justify-center items-center text-[1rem] indirect:text-lg py-2 gap-16",
        button: "hover:text-[#b8c785]",
    },
}