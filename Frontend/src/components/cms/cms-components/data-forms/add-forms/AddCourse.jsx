import { useRef, useEffect, useContext } from "react"
import { AuthContext } from '../../../../../store/auth-context';
import { requestUrl } from "../../../../../url";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { addForms } from "../data-forms-classes";


const addCourseUrl = requestUrl.courses.new;

export default function AddCourse({ onClose }) {

    const courseName = useRef();
    const courseDate = useRef();
    const courseOrganizer = useRef();
    const courseCategory = useRef();
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCourse = {
            courseName: courseName.current.value,
            courseDate: courseDate.current.value,
            organizer: courseOrganizer.current.value,
            courseCat: courseCategory.current.value,
        };

        try {
            await sendRequest({
                url: addCourseUrl,
                data: newCourse,
            });

        } catch (error) {
            console.log('Błąd podczas dodawania nowego kursu');
        }


    };

    useEffect(() => {
        if (result && !error) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [result, error, onClose])

    return (
        <div className={addForms.addCourse.wrapper}>
            <h2 className={addForms.h2.h2}>Add new course</h2>
            {result && !error && <p className={addForms.message.result}>{result.message}</p>}
            {error && <p className={addForms.message.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={addForms.addCourse.form}>
                <label className={addForms.label.label} htmlFor="course-name">Course name:</label>
                <input className={addForms.input.input} type="text" name="course-name" id="course-name" ref={courseName} />
                <label className={addForms.label.label} htmlFor="course-date">Course date:</label>
                <input className={addForms.input.input} type="date" name="" id="course-date" ref={courseDate} />
                <label className={addForms.label.label} htmlFor="course-organizer">Organizer:</label>
                <input className={addForms.input.input} type="text" name="course-organizer" id="course-organizer" ref={courseOrganizer} />
                <label className={addForms.label.label} htmlFor="course-category">Course category:</label>
                <input className={addForms.input.input} type="text" name="course-category" id="course-category" ref={courseCategory} />
                <button className={addForms.btnSave.btnSave} type="submit" disabled={user.role !== 'admin'}>Save</button>
            </form>
        </div>
    )
}