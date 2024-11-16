import { textarea } from "framer-motion/client";

export const compClasses = {
    contactForm: {
        formDiv: "w-full h-full text-gray-100 flex flex-col items-center rounded-md pt-24 overflow-hidden",
        contactForm: "w-3/4  flex flex-col items-center font-black",
        h2: "text-5xl mb-8",
        firstLabel: "text-lg mb-2",
        otherLabels: "text-lg my-2",
        input: "w-5/12 text-stone-950 p-1",
        textarea: "w-5/12 h-32 text-stone-950 p-1 resize-none",
    },
    footer: {
        footer: "w-full bg-neutral-600/30 h-10 text-lg rounded-md flex justify-around items-center py-4",
        paragraph: "text-gray-300",
        span: "ml-56 text-[#6f963b] text-xs",
    },
    leftSidebar: {
        leftSidebar: "h-content w-fit ml-10 mt-3 flex flex-col justify-between",
        link: "bg-[#6f963b] w-10/12 rounded-lg mt-2 flex justify-center items-center py-5 px-4 text-black hover:bg-[#374528] hover:text-slate-200",
        span: "font-bold font-sans tracking-wider",
    },
    mainLeftContainer: {
        mainContainer: 'bg-neutral-600/30 w-full mr-5 rounded-md text-gray-300 overflow-scroll no-scrollbar',
    },
    mainRightContainer: {
        mainContainer: 'bg-neutral-600/30 text-gray-300 w-full h-full rounded-md flex flex-col justify-between overflow-scroll no-scrollbar',
    },
    menu: {
        menu: "w-4/5 h-full px-6 bg-neutral-600/30 flex flex-col justify-stretch mt-3 rounded-lg pt-28",
        ul: "flex flex-col items-center gap-5 text-gray-300 text-xl",
        link: "hover:text-2xl hover:text-[#b8c785]",
    },
    portfolio: {
        wrapper: "w-full h-[100%] flex flex-col gap-0",
    },
    project: {
        
    }
}

