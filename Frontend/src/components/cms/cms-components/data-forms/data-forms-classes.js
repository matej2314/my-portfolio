export const addForms = {
    addCourse: {
        wrapper: "w-full h-full flex flex-col items-center justify-center text-white bg-neutral-600/30",
        form: "w-1/2 h-fit flex flex-col justify-center items-center gap-4 border-2 border-black p-4",
    },
    addPost: {
        wrapper: "w-full h-full flex flex-col justify-start items-center text-white gap-6 bg-neutral-600/30 pt-3",
        form: "w-1/3 h-fit flex flex-col justify-center items-center gap-3",
    },
    addProject: {
        wrapper: "w-full h-fit flex flex-col justify-center items-center text-white gap-4 bg-neutral-600/30",
        h2: "w-1/3 h-fit flex flex-col justify-center items-center text-2xl gap-3 my-2",
    },
    addService: {
        wrapper: "w-full h-full flex flex-col justify-start items-center gap-3  text-white bg-neutral-600/30",
        form: "w-1/3 h-fit flex flex-col justify-center items-center text-white gap-4",
        label: "w-full h-fit flex flex-row justify-center",
    },
    addSkill: {
        wrapper: "w-full h-full flex flex-col justify-start items-center gap-6 text-white bg-neutral-600/30",
        form: "w-1/4 h-fit flex flex-col justify-center items-center gap-4 border-2 border-black p-2",
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
}
};

export const deleteForms = {
    messages: {
        result: "text-lime-600",
        error: "text-red-600",
    },
    buttonWrapper: {
        buttonWrapper: 'w-1/5 h-fit flex flex-row justify-around items-center',
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
    editProjects: {
        textarea: "w-full h-[5rem] flex flex-col justify-start items-center break-before-auto pl-2 bg-slate-300",
    },
    wrapper: {
        wrapper: "w-fit h-fit flex flex-col justify-center items-center text-md text-white border-2 border-black p-4 gap-3 bg-neutral-600/30 rounded-md",
    },
    h2: {
        h2: "w-full h-full flex justify-center items-center text-lg text-white",
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
    }
}