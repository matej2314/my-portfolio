import AddInterest from "./add-forms/AddInterest";
import EditServices from "./edit-forms/EditServices";

export const addForms = {
    addAbout: {
        wrapper: "w-full h-full flex flex-col justify-start items-center bg-neutral-600/30 text-white pt-2 gap-6",
        form: "w-11/12 h-fit flex flex-col items-center justify-start text-white gap-4 py-4 border-2 border-white rounded-md",
        textarea: "w-11/12 h-[10rem] text-black bg-slate-300 pl-2",
    },
    addCourse: {
        wrapper: "w-full h-full flex flex-col items-center justify-start text-white bg-neutral-600/30",
        form: "w-1/2 h-fit flex flex-col justify-center items-center gap-4 p-4 border-2 border-white mt-8 rounded-md",
    },
    addPost: {
        wrapper: "w-full h-full flex flex-col justify-start items-center text-white gap-4 bg-neutral-600/30 pt-3",
        form: "w-1/3 h-fit flex flex-col justify-center items-center gap-3 border-2 border-white p-4",
    },
    addProject: {
        wrapper: "w-full h-fit flex flex-col justify-center items-center text-white bg-neutral-600/30 pb-4",
        form: "w-1/3 h-fit flex flex-col justify-center items-center text-2xl gap-3 my-2 border-2 border-white p-4 mt-8 rounded-md",
    },
    addService: {
        wrapper: "w-full h-full flex flex-col justify-start items-center gap-1 text-white bg-neutral-600/30",
        form: "w-1/3 h-fit flex flex-col justify-center items-center text-white gap-4 mt-4 border-2 border-white p-4 rounded-md",
        label: "w-full h-fit flex flex-row justify-center",
    },
    addSkill: {
        wrapper: "w-full h-full flex flex-col justify-start items-center text-white bg-neutral-600/30",
        form: "w-1/4 h-fit flex flex-col justify-center items-center gap-4 border-2 border-white p-4 mt-8 rounded-md",
    },
    AddInterest: {
        wrapper: "w-full h-full flex flex-col items-center justify-start text-white bg-neutral-600/30 pt-3 gap-4",
        form:"w-1/4 h-fit flex flex-col items-center justify-center gap-3 border-2 border-white p-4 rounded-md",
    },
    btnSave: {
        btnSave: "w-fit h-fit flex flex-row justify-center border-2 border-black p-3 rounded-xl text-md bg-neutral-700 hover:bg-neutral-800/50",
    },
    input: {
        input: "w-full h-fit flex justify-center items-center text-black bg-slate-300 pl-2",
    },
    label: {
        label: "w-full h-fit flex flex-row justify-center text-sm",
    },
    h2: {
        h2: "w-1/2 h-fit flex flex-col justify-center items-center text-2xl gap-3 my-2",
    },
    message: {
        result: "text-lime-600 text-xl",
        error: "text-red-600 text-xl",
    },
    select: {
        select: "text-black pl-2",
        option: "text-black pl-2"
    }
};

export const deleteForms = {
    messages: {
        result: "text-lime-600",
        error: "text-red-600",
    },
    buttonWrapper: {
        buttonWrapper: 'w-full justify-around md:w-1/5 h-fit flex flex-row md:justify-around items-center',
    },
    wrapper: {
        wrapper: 'w-1/2 h-fit flex flex-col justify-start items-center gap-2 text-white bg-neutral-600/30 p-5 rounded-md',
    },
    h2: {
        h2: "text-xl underline underline-offset-2",
    },
    buttonsConfirm: {
        buttonConf: "bg-neutral-700 hover:bg-neutral-800/50 p-2 rounded-md hover:text-lime-600",
    }

};

export const editForms = {
    editPosts: {

    },
    ediAbout: {
        wrapper: 'w-full h-full flex flex-col justify-start items-center text-md text-white gap-2 p-4 bg-neutral-600/30 rounded-md',
        h2: "w-full h-fit text-2xl flex flex-row justify-center",
    },
    editProjects: {
        wrapper: "w-full h-fit flex flex-col justify-center items-center text-md text-white border-2 border-black p-4 gap-4 bg-neutral-600/30 rounded-md",
        textarea: "w-full h-[5rem] flex flex-col justify-start items-center break-before-auto px-2 bg-slate-300",
    },
    EditServices: {
        wrapper: "w-full h-full flex flex-col items-center justify-start bg-neutral-600/30 p-4 gap-3 text-white",
    },
    form: {
        form: "w-[30vw] h-fit flex flex-col justify-center items-center gap-4 text-black text-md",
    },
    label: {
        label: "w-full h-fit flex flex-row justify-center items-center text-white",
    },
    input: {
        input: "w-full h-fit flex flex-row justify-center items-center text-black bg-slate-300 pl-2", 
    },
    submitBtn: {
        submitBtn: "w-fit h-fit flex flex-row justify-center border-2 border-black p-3 text-white rounded-xl text-md bg-neutral-700 hover:bg-neutral-800/50",
    },
    select: {
        select: "text-black pl-2",
        option: "text-black pl-2"
    },
}