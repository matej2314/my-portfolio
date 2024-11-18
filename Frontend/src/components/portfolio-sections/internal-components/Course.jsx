import { sectionsClasses } from "../portSections-classes"

export default function Course({ courses, loading }) {

    return (
        <>
            {!loading && courses && Array.isArray(courses) ? (
                courses.map((course) => (
                    <li key={course.id} className={sectionsClasses.course.li}>
                        {`${course.title} - ${course.organizer}`}
                    </li>
                ))
            ) : (
                <p>Brak kursów do wyświetlenia</p>
            )}
        </>
    )
}