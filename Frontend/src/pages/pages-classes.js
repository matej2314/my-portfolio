export const pagesClasses = {
    blogPage: {
        pageWrapper: "w-screen h-dvh overflow-hidden flex justify-around flex-nowrap font-sans mr-9",
        contentWrapper: "w-[95vw] h-content bg-neutral-600/30 mt-5 mr-9 flex flex-row items-center justify-center"
    },
    contactPage: {
        pageWrapper: "w-screen h-dvh overflow-hidden flex justify-around flex-nowrap",
        formWrapper: "w-full h-content flex justify-center mt-5 bg-contact-image bg-cover mr-9 bg-opacity-75"
    },
    mainPage: {
        wrapper: "w-screen h-dvh overflow-hidden flex justify-around flex-nowrap font-sans mr-9",
        contentWrapper: 'relative w-full h-content flex flex-row flex-nowrap mt-5 mr-9',
    },
    portfolioPage: {
        portfolioWrapper: "relative w-full h-content flex flex-row flex-nowrap",
        portfolioContentWrapper: "bg-neutral-600/30 text-gray-300 w-11/12 h-content rounded-md flex flex-col justify-between overflow-scroll no-scrollbar mr-9 my-5",
    },
    blogPage: {
        pageWrapper: "w-screen h-dvh overflow-hidden flex justify-around flex-nowrap",
        contentWrapper: "w-full h-content flex justify-center items-start mt-5 bg-neutral-600/30 mr-9",
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
    }
}

