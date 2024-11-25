export const pagesClasses = {
    blogPage: {
        pageWrapper: "md:w-screen w-full h-full flex flex-col items-center py-5 justify-center md:h-dvh overflow-hidden md:flex-row md:justify-around flex-nowrap font-sans md:mr-9 md:pt-5 md:pb-5",
        contentWrapper: "w-[95vw] h-[90vh] bg-neutral-600/30 md:h-content md:mt-0 md:mr-9 flex md:flex-row md:justify-center md:items-start"
    },
    contactPage: {
        pageWrapper: "w-full h-full flex flex-col items-center justify-center pt-6 pb-3 px-2 md:pt-4 md:pb-4 md:w-screen md:h-full md:overflow-hidden md:flex-row md:justify-around md:flex-nowrap",
        formWrapper: "w-full h-full flex md:h-content md:justify-center bg-contact-image bg-cover md:mr-9 bg-opacity-75 md:my-0"
    },
    mainPage: {
        wrapper: "w-screen h-dvh overflow-hidden flex justify-around flex-nowrap font-sans mr-9 md:pt-5 md:pb-4",
        contentWrapper: 'relative w-full h-content flex flex-row flex-nowrap mr-9 md:mb-5',
    },
    portfolioPage: {
        portfolioWrapper: "w-screen h-dvh flex flex-col items-center pt-5 justify-center md:flex-row md:flex-nowrap md:py-5",
        portfolioContentWrapper: "relative bg-neutral-600/30 text-gray-300 w-11/12 h-full md:h-content rounded-md flex flex-col items-center justify-center md:flex-col md:justify-between md:mt-5 md:mb-5 md:mr-9 overflow-scroll no-scrollbar",
    },
    projectsDetailsPage: {
        wrapper: "w-screen h-dvh bg-black overflow-hidden flex justify-around flex-nowrap",
        detailsWrapper: "w-full h-content flex flex-row justify-center items-center mt-5 mr-9 bg-neutral-600/30 text-slate-200 p-2 overflow-scroll no-scrollbar",
        div: "w-3/4 h-full flex flex-col items-center pt-1 px-2 pb-2 overflow-scroll no-scrollbar gap-4",
        projectTitle: "text-2xl font-bold",
        screenshot: "border-8 border-slate-200 rounded-sm max-w-[45rem]",
        subtitle: "text-xl font-bold text-[#b8c785]",
        description: "w-full flex flex-row justify-center text-xl px-4 whitespace-pre-line leading-relaxed",
        linkWrapper: "w-full flex flex-row justify-center gap-2 font-bold text-xl",
        linkParagraph: "underline underline-offset-2",
        demoLink: "hover:text-[#b8c785]",
        repoLink: "text-xl underline underline-offset-1 hover:text-[#b8c785]"
    },
    projectsPage: {
        
    }
}

