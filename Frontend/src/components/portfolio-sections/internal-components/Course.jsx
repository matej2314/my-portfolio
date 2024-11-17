import { sectionsClasses } from "../portSections-classes"

export default function Course({ courses, loading }) {
    
    return (
        <>
            {!loading && courses && Array.isArray(courses) ? (
                courses.map((course) => (
                    <li key={course.id} className="w-full flex flex-row justify-around mb-4">
                        {`${course.title} - ${course.organizer}`}
                    </li>
))
            ): (
                    <p>Brak kursów do wyświetlenia</p>
            )}
        </>
    )
}