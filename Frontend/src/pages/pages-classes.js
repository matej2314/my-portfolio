export const pagesClasses = {
    blogPage: {
        pageWrapper: "pt-5 overflow-scroll no-scrollbar indirect:w-screen w-dvw h-dvh flex flex-col items-center indirect:gap-2 indirect:h-dvh overflow-hidden md:flex-row md:justify-around flex-nowrap font-sans md:mr-9 md:pt-5 md:pb-5",
        contentWrapper: "w-[95vw] overflow-scroll no-scrollbar h-[88vh] bg-neutral-600/30 px-6 indirect:h-content md:mt-0 md:mr-9 flex md:flex-row md:justify-center md:items-start"
    },
    contactPage: {
        pageWrapper: "w-full h-[100vh] overflow-scroll no-scrollbar flex flex-col rounded-lg items-center pt-5 gap-2 md:pt-5 md:pb-4 md:w-screen md:h-full md:overflow-hidden md:flex-row md:justify-around md:flex-nowrap z-0",
        formWrapper: "relative w-full h-full overflow-scroll no-scrollbar indirect:overflow-scroll indirect:no-scrollbar flex flex-row md:h-content md:justify-center md:rounded-lg bg-cover md:mr-4 bg-opacity-75 md:my- z-0 overflow-scroll no-scrollbar",
        img: "absolute z-0 left-0 top-0 w-full h-full bg-cover",
    },
    mainPage: {
        wrapper: "w-screen h-dvh overflow-hidden flex justify-around flex-nowrap font-sans pt-5 mr-9 md:pt-5 md:pb-4",
        contentWrapper: 'relative w-full h-content flex flex-row justify-center flex-nowrap mr-5 md:mb-5',
    },
    portfolioPage: {
        portfolioWrapper: "w-dvw h-dvh flex flex-col items-center py-5 gap-2 md:flex-row md:flex-nowrap md:py-5",
        portfolioContentWrapper: "relative bg-neutral-600/30 text-gray-300 w-11/12 h-full md:h-content gap-3 rounded-md flex flex-col items-center justify-center md:flex-col md:justify-around md:mr-5 overflow-scroll no-scrollbar",
    },
    projectsDetailsPage: {
        wrapper: "w-full h-dvh bg-black overflow-hidden flex flex-col justify-center items-center flex-nowrap pt-5 md:w-dvw md:h-dvh md:overflow-hidden md:flex md:flex-row md:items-center md:justify-around md:py-5",
        detailsWrapper: "w-full h-full md:h-content flex flex-col pt-3 justify-between items-center mx-auto bg-neutral-600/30 text-slate-200 overflow-scroll no-scrollbar mx-auto",
        div: "w-full h-full flex flex-col items-center px-2 pb-5 overflow-scroll no-scrollbar gap-4",
        projectTitle: "w-full flex flex-row justify-center text-3xl font-bold",
        screenshot: "w-full h-full flex flex-row justify-center border-8 border-slate-200 rounded-sm max-w-[45rem]",
        subtitle: "text-2xl font-bold text-[#b8c785]",
        description: "w-full flex flex-row justify-center text-xl px-4 whitespace-pre-line leading-relaxed",
        linkWrapper: "w-full flex flex-row justify-center gap-3 font-bold text-xl",
        linkParagraph: "underline underline-offset-2",
        demoLink: "hover:text-[#b8c785]",
        repoLink: " w-fit h-fit text-2xl underline underline-offset-1 text-[#b8c785] hover:text-[#5e6e29] flex justify-center items-center gap-3"
    },
    projectsPage: {
        wrapper: 'w-screen h-screen flex flex-col items-center pt-5 gap-2 overflow-scroll no-scrollbar px-6',
        contentWrapper: 'w-screen h-[101vh] flex flex-col justify-between bg-neutral-600/30 text-slate-300 overflow-scroll no-scrollbar gap-2 pt-2',
    },
    notFound: {
        wrapper: 'w-90dvw h-dvh flex flex-col items-center justify-between ml-5 md:ml-0 md:flex-row md:justify-between',
        contentWrapper: 'w-full h-content bg-neutral-600/30 flex flex-row justify-center items-start md:items-center text-white mr-9',
    },
    postReadMore: {
        contentWrapper: "w-full h-content flex flex-col justify-start items-center mt-5 mr-9 p-5 bg-neutral-600/30",
        div: "w-3/4 h- flex flex-col bg-neutral-100 py-2 px-5 gap-4",
        h2: "w-full flex flex-row justify-center text-black font-bold text-2xl underline underline-offset-2",
    }
}