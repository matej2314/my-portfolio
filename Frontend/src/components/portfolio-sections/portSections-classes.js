export const sectionsClasses = {
    languages: {
        section: " w-full flex-col justify-between items-center mt-4 pb-4 border-dotted border-b-2 border-[#6f963b]",
        h2: "w-full flex justify-center text-2xl mb-4 font-sans",
        ul: "w-full grid grid-cols-2 text-xl gap-4",
        li: "w-full flex justify-around pb-2",
        span: "border-dotted border-b-2 border-[#6f963b]"
    },
    portfolioHeader: {
        wrapper: "w-full flex justify-center",
        innerWrapper: "w-full h-56 bg-gradient-to-t from-bg-neutral-600/30 via-transparent to-transparent relative",
        bgImage: "h-56 w-full opacity-60 object-cover blur-[2px]",
        portfolioPhoto: "w-24 h-24 z-10 relative bottom-[62%] justify-self-center items-center justify-center rounded-full border-4 border-slate-300 -translate-y-2/3 hover:scale-110",
        h2: "absolute top-[57%] left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold z-20",
        h3: "absolute top-[70%] left-[40%] text-white text-sm z-20 hover:text-[#b8c785]"
    },
    service: {
        serviceWrapper: "w-full flex flex-col items-center justify-start pt-2 pb-3 px-4 bg-gray-500/15 rounded",
        h3: "text-lg w-full flex justify-center mx-auto",
        span: "text-[#6f963b] text-2xl",
        paragraph: "w-full flex flex-wrap mt-2",
    },
    servicesSection: {
        h2: "w-full flex justify-center text-2xl my-4",
        servicesWrapper: "grid grid-cols-2 gap-2 px-4 border-dotted border-b-2 border-[#6f963b] pb-4",
    },
    skill: {
        li: "w-full flex justify-around pb-2",
        span: "ml-6 text-lg  border-dotted border-b-2 border-[#6f963b]",
    },
    skillsSection: {
        sectionWrapper: "w-full flex flex-col items-stretch mt-4 border-dotted border-b-2 border-[#6f963b]",
        h2: "w-full flex justify-center text-2xl mb-4 font-sans",
        ul: "w-full grid grid-cols-2 gap-7 pl-11 pr-3 mb-4 text-xl",
    }

}

