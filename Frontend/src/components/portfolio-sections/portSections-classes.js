export const sectionsClasses = {
    portfolioHeader: {
        wrapper: "w-full h-[fit-content] flex flex-col items-center justify-center relative md:flex-row",
        innerWrapper: "w-full h-60 relative flex flex-col justify-center items-center",
        photoTextWrapper: "w-full h-[50%] absolute flex flex-col justify-center items-center gap-2",
        bgImage: "top-0 left-0 z-0 w-full h-60 opacity-60 blur-[2px] bg-gradient-to-t from-bg-neutral-600/30 via-transparent to-transparent",
        portfolioPhoto: "w-24 h-24 z-10 items-center justify-center rounded-full border-4 border-slate-300 hover:scale-110",
        h2: "text-white text-lg font-semibold z-10",
        h3: "text-white text-sm z-10 hover:text-[#b8c785]"
    },
    languages: {
        section: "w-full flex-col justify-between items-center mt-4 pb-4 border-dotted border-b-2 border-[#6f963b] border-opacity-40",
        ul: "w-full grid grid-rows-auto md:grid-cols-2 text-xl gap-4",
        span: "border-dotted border-b-2 border-[#6f963b]"
    },
    service: {
        serviceWrapper: "w-full flex flex-col items-center justify-start pt-2 pb-3 px-4 bg-gray-500/15 rounded",
        span: "text-[#6f963b] text-2xl",
        paragraph: "w-full flex flex-wrap mt-2",
    },
    servicesSection: {
        h2: "w-full flex flex-row justify-center text-2xl my-4",
        servicesWrapper: "grid grid-rows-auto md:grid-cols-2 gap-2 px-4 border-dotted border-b-2 border-[#6f963b] border-opacity-40 pb-4",
    },
    skill: {
        span: "ml-6 text-lg border-dotted border-b-2 border-[#6f963b]",
    },
    skillsSection: {
        sectionWrapper: "w-full flex flex-col items-stretch justify-center my-4 border-dotted border-b-2 border-[#6f963b] border-opacity-40",
        ul: "w-full grid grid-rows-auto md:grid-cols-2 gap-7 pl-11 pr-3 mb-4 text-xl",
    },
    workSection: {
        sectionWrapper: "w-full flex justify-center border-dotted border-b-2 border-[#6f963b] mb-4 border-opacity-15",
        workWrapper: "w-11/12 flex flex-col items-center justify-center pt-2 pb-4 px-4 mb-6 bg-gray-500/15 rounded",
    },

    h2: {
        h2: "w-full flex justify-center text-2xl mb-4 font-sans"
    },

    h3: {
        h3: "text-lg w-full flex justify-center mx-auto",
    },

    li: {
        li: "w-full flex justify-around pb-2",
    },
    buttonsList: {
        buttonsList: "w-11/12 flex justify-evenly items-center py-1 border-2 border-[#6f963b] mb-4 mx-auto border-opacity-15 rounded-full gap-3",
    },
    categoryButton: {
        categoryButton: "hover:text-[#6f963b] flex justify-start",
    }

}

