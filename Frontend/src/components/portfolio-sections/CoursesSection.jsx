import { useContext } from "react";
import { motion } from "framer-motion";

import { DataContext } from "../../store/data-context";
import { sectionsClasses } from "./portSections-classes";
import Course from "./internal-components/Course";


export default function CoursesSection() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const courses = dataCtx.fetchedData.data.courses;

    return (
        <section id="courses-section" className={sectionsClasses.coursesSection.section}>
            <div className={sectionsClasses.h2.titleWrapper}>
                <h2 className={sectionsClasses.h2.h2}>Courses</h2>
            </div>
            <ul className={sectionsClasses.coursesSection.ul}>
                <Course courses={courses} loading={loading} />
            </ul>
        </section>
    )
}