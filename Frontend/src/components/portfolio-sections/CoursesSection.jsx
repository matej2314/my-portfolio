import { useContext} from "react";
import { DataContext } from "../../store/data-context";
import { sectionsClasses } from "./portSections-classes";
import Course from "./internal-components/Course";


export default function CoursesSection() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const courses = dataCtx.fetchedData.data.courses;

    return (
        <section id="courses-section" className="w-full flex flex-col items-stretch justify-center mb-4 border-dotted border-b-2 border-[#6f963b] border-opacity-40">
            <h2 className={sectionsClasses.h2.h2}>Courses</h2>
            <ul className="w-full flex flex-col justify-center items-center">
                <Course courses={courses} loading={loading}/>
            </ul>
        </section>
    )
}