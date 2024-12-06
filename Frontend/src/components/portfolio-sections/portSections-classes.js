export const sectionsClasses = {
    portfolioHeader: {
        wrapper: "w-full h-[65vh] indirect:h-[65vh] sm:h-[65vh] md:h-[30vh] flex flex-row items-center justify-center relative md:flex-row",
        innerWrapper: "w-full h-[100%] md:h-full relative flex flex-col justify-center items-center",
        photoTextWrapper: "w-full h-[50%] indirect:h-[60vh] mt-[13rem] md:h-[50%] sm:mt-[15rem] md:mt-0 absolute flex flex-col justify-center items-center gap-1",  
        bgImage: "top-0 left-0 z-0 w-full h-[65vh] indirect:h-[65vh] sm:h-[65vh] md:h-full object-cover opacity-60 blur-[2px] bg-gradient-to-t from-bg-neutral-600/30 via-transparent to-transparent",
        portfolioPhoto: "w-[6rem] h-[6rem] md:w-24 md:h-24 z-10 items-center justify-center rounded-full border-[3px] border-slate-200 max-w-full max-h-full object-cover",
        h2: "text-white text-lg md:text-xl md:text-lg font-semibold z-10",
        h3: "text-white text-xs md:text-base z-10 hover:text-[#b8c785]",
    },           
    portfolioFooter: {
        wrapper: "w-full flex flex-col items-center justify-center mb-4 gap-3 text-[#b8c785]",
        firstParagraph: "w-full flex justify-center",
        secondParagraph: "w-full flex justify-center items-center flex-wrap",
        link:"mx-1 text-[#6f963b] hover:text-[#b8c785]",
    },
    languages: {
        section: "w-full flex flex-col items-center pb-2 border-dotted border-b-2 border-[#6f963b] border-opacity-40 gap-4",
        ul: "w-full grid grid-rows-auto text-sm sm:text-xl md:text-xl gap-3",
        span: "border-dotted border-b-2 border-[#6f963b] max-w-10",
        li: "w-full h-full flex flex-row justify-around items-center pb-2"
    },
    service: {
        span: "text-[#6f963b] text-2xl hidden md:inline",
        paragraph: "w-full flex flex-wrap mt-2 whitespace-pre-line leading-relaxed",
    },
    greybox: {
        greybox: "w-full flex flex-col items-center justify-start pt-2 pb-3 px-4 bg-gray-500/15 rounded",
    },
    servicesSection: {
        h2: "w-fit flex  text-2xl mb-4 border-b-2 border-[#6f963b] border-opacity-30",
        servicesWrapper: "grid grid-rows-auto md:grid-cols-2 gap-2 pb-4 border-dotted border-b-2 border-[#6f963b] border-opacity-40 ",
    },
    skill: {
        span: "w-fit h-fit flex justify-center",
        li: "w-full h-fit flex flex-row items-center justify-center gap-1.5 indirect:gap-2.5 mx-auto", 
    },    
    skillsSection: {
        sectionWrapper: "w-full flex flex-col items-center px-1 border-dotted border-b-2 border-[#6f963b] border-opacity-40",
        ul: "w-full grid grid-cols-2 gap-x-12 gap-y-8 indirect:grid-cols-2 indirect:gap-x-12 sm:grid-cols-2 sm:text-xm sm:gap-x-12 lg:grid-cols-2 gap-14 my-4 text-xm md:text-xl mx-auto",
    },
    workSection: {
        sectionWrapper: "w-full flex flex-col justify-center items-center gap-4",
        contentWrapper: "w-full flex justify-center border-dotted border-b-2 border-[#6f963b] mb-4 pb-4 border-opacity-15",
    },

    h2: {
        titleWrapper: "w-full flex flex-row justify-center",
        h2: "w-fit text-2xl font-sans border-dotted border-b-2 border-[#6f963b] border-opacity-30"
    },

    h3: {
        h3: "text-lg w-full flex justify-center mx-auto border-solid border-b-2 border-[#6f963b] border-opacity-40 md:border-0",
    },

    li: {
        li: "w-full flex justify-around pb-2",
    },
    buttonsList: {
        buttonsList: "w-fit indirect:w-11/12 sm:w-11/12 md:w-11/12 flex flex-row justify-around items-center py-2.5 px-2 md:py-2 md:px-2 md:px-0 border-2 border-[#6f963b] my-4 mx-auto border-opacity-15 rounded-full gap-3",
    },
    categoryButton: {
        categoryButton: "hover:text-[#6f963b] text-[0.8rem] indirect:text-sm sm:text-xs md:text-base flex justify-start",
    },
    coursesSection: {
        section: "w-full flex flex-col items-center justify-center border-dotted border-b-2 border-[#6f963b] border-opacity-40 gap-4",
        ul: "w-full flex flex-col justify-center items-center gap-4 mb-4 pl-4 md:mb-4",
    },
    aboutMe: {
        wrapper: "w-full h-fit flex flex-col justify-center items-center gap-4 mt-3",
    }
}

