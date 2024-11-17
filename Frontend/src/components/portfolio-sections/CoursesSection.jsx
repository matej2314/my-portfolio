import { useContext, useState } from "react";
import { DataContext } from "../../store/data-context";
import { sectionsClasses } from "./portSections-classes";
import Course from "./internal-components/Course";
import CategoryMenu from "./internal-components/CategoryMenu";


export default function CoursesSection() {

    const [courseCategory, setCourseCategory] = useState(null);

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const courses = dataCtx.fetchedData.data.courses;

    function handleCourseCategory(category) {
        setCourseCategory(category);
    }


    return (
        <section id="courses-section">
            <h2 className={sectionsClasses.h2.h2}>Courses</h2>
            <ul>
                <Course courses={courses} loading={loading} courseCategory={courseCategory} />
            </ul>
            <CategoryMenu handleCategoryClick={handleCourseCategory} />
        </section>
    )
}