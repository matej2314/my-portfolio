export const projectsClasses = {
    projects: {
        wrapper: "w-[98%] h-full flex flex-col justify-start overflow-scroll no-scrollbar z-0",
        ul: "relative w-full h-full md:h-full gap-4 md:gap-8 flex flex-col justify-between xl:grid xl:grid-cols-2 xl:gap-x-5 xl:gap-y-12 pl-2 overflow-scroll no-scrollbar z-0",
    },
    project: {
        li: "w-[95%] max-h-72 md:h-80 relative perspective-1000",
        projectImage: "w-full max-h-72 md:max-h-80 object-cover rounded-md",
        cardWrapper: 'relative w-full h-72 md:h-80 transition-transform duration-700 ease-in-out transform-preserve-3d',
        frontCard: "absolute w-full h-72 md:h-80", 
        contentWrapper: "absolute w-full h-full md:w-full md:h-full bg-black/70 text-white flex flex-col justify-center items-center backface-hidden rotate-y-180",
        h3: "text-sm md:text-lg underline underline-offset-1 -translate-y-1/2 ",
        description: "w-full flex flex-row justify-center md:-translate-y-[.5rem] text-[0.5rem] md:flex md:flex-col md:justify-center md:text-base md:text-center md:whitespace-pre-wrap",
        link: "underline underline-offset-2 hover:text-[#b8c785] translate-y-1/3 ",
    },
    projectsCategories: {
        wrapper: "w-full h-fit flex items-center bg-neutral-600/30 rounded-md",
        ul: "w-full flex flex-row justify-center items-center text-[1rem] indirect:text-lg py-2 gap-16",
        button: "hover:text-[#b8c785]",
    },
}