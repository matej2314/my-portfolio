import { useContext } from "react";
import { DataContext } from "../../../store/data-context";

export default function ManageCourses() {
    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const courses = dataCtx.fetchedData.data.courses;


    return (
        <>
            <div className="w-[95vw] h-fit flex flex-col justify-center items-center text-lg text-white p-0">
                <h2 className="w-fit h-fit text-2xl mb-8">Courses:</h2>
                <ul className="w-fit h-fit flex flex-col justify-center items-center text-lg text-white border-2 border-l-cyan-100 p-4">
                    <li className="w-10/12 h-fit flex flex-row justify-start items-center border-b-2 border-black gap-4 mb-4">
                        <span className="w-full">Id</span>
                        <span className="w-full">Title</span>
                        <span className="w-full">Date</span>
                        <span className="w-full">Organizer</span>
                        <span className="w-full">Category</span>
                    </li>
                    {!loading && courses && Array.isArray(courses) ? (
                        courses.map((course) => {
                            return <li className="w-full h-fit flex flex-row justify-start items-center border-b-2 border-black gap-4" key={course.id}>
                                <span className="w-full flex flex-row justify-center items-center">{course.id}</span>
                                <span className="w-full">{course.title}</span>
                                <span className="w-full">{course.date}</span>
                                <span className="w-full">{course.organizer}</span>
                                <span className="w-full">{course.category}</span>
                                <div className="w-fit h-fit flex flex-row justify-center items-center gap-3">
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </li>
                        })
                    ) : (
                        <p>Brak danych</p>
                    )
                    }
                </ul>
            </div>
        </>
    )
}