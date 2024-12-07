import { motion } from "framer-motion"

import { sectionsClasses } from "../portSections-classes"

export default function Course({ courses, loading }) {

    return (
        <>
            {!loading && courses && Array.isArray(courses) ? (
                courses.map((course) => (
                    <motion.li
                        key={course.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ amount: 0.4, once: false }}
                        className={`${sectionsClasses.li.li} items-center h-[10rem] border-r-2 border-[#6f963b] border-opacity-40 whitespace-break-spaces`}
                    >
                        {`${course.title} - ${course.organizer}`}
                    </motion.li>
                ))
            ) : (
                <p>Brak kursów do wyświetlenia</p>
            )}
        </>
    )
}