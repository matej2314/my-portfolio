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
        <motion.section
            id="courses-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={sectionsClasses.coursesSection.wrapper}
        >
            <div className={sectionsClasses.h2.titleWrapper}>
                <h2 className={sectionsClasses.h2.h2}>Courses</h2>
            </div>
            <ul className={sectionsClasses.coursesSection.ul}>
                <Course courses={courses} loading={loading} />
            </ul>
        </motion.section>
    )
}