export const projectsClasses = {
    projects: {
        wrapper: "w-[98%] h-full flex flex-col justify-start overflow-scroll no-scrollbar z-0",
    },
    project: {
        wrapper: "relative w-full z-0 flex flex-row justify-center pt-10 md:pt-0",
        ul: " absolute w-full h-[75vh] gap-9 flex flex-col justify-between md:grid md:grid-cols-2 md:gap-9 pl-2 overflow-scroll no-scrollbar z-0",
        li: "relative w-full h-full flex flex-row justify-center",
        projectImage: "max-h-80 sm:max-w-92 md:max-w-80 md:max-h-72 rounded-md",
        hoverContent: "absolute w-full md:w-[93%] h-full justify-self-center bottom-0 left-0 right-0 text-white flex flex-col justify-end items-center md:absolute md:w-full md:h-full md:text-base",
        contentWrapper: "w-full bg-black/80 flex flex-col justify-center items-center p-1 gap-1 md:w-80 md:flex-col md:pl-4 md:gap-1",
        h3: "text-sm md:text-lg underline underline-offset-1",
        description: "w-full flex flex-row justify-center text-[0.5rem] md:flex md:flex-col md:justify-center md:text-base md:whitespace-pre-wrap",
        link: "underline underline-offset-2 hover:text-[#b8c785]",
    },
    projectsCategories: {
        wrapper: "w-full h-fit flex items-center bg-neutral-600/30 rounded-md",
        ul: "w-full flex flex-row justify-center items-center text-[0.5rem] indirect:text-lg py-2 gap-16",
        button: "hover:text-[#b8c785]",
    },
}