export const cmsPages = {
    indexPage: {
        main: "w-screen h-screen flex justify-center items-center bg-zinc-500/30 pt-10",
        mainDiv: "w-1/2 h-fit flex flex-col justify-between items-center bg-neutral-600/30 p-5 text-white border-4 border-black rounded-md shadow-2xl shadow-grey-700",
        buttonWrapper: "w-full h-full flex flex-row items-center justify-center text-white gap-4",
        button: "w-fit h-fit p-5 bg-neutral-700 rounded-md border-[1px] border-white shadow-xl shadow-grey-700 hover:bg-neutral-600 hover:shadow-lg",
    },
    mainPage: {
        main: "w-full h-dvh flex flex-col justify-center items-center bg-zinc-500/30 pt-5 gap-12 overflow-hidden no-scrollbar pb-4",
        contentWrapper: "w-full h-full flex flex-row justify-center rounded-md overflow-scroll no-scrollbar",
        parWrapper: "w-full h-[98%] flex flex-row justify-center items-center bg-neutral-600/30 rounded-md ",
        paragraph: "w-full flex flex-col justify-center items-center text-white font-bold gap-8",
        titlePar: "text-5xl",
        linkPar: "w-full flex justify-center gap-3 text-xl",
    }
}