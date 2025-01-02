import { useRef, useEffect, useContext } from "react"
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import { requestUrl } from "../../../../../url";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { addForms } from "../data-forms-classes";
import { handleToastAndClose } from "../../../../../utils/handleToastAndClose";

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

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        }

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
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <div className={addForms.addCourse.wrapper}>
            <h2 className={addForms.h2.h2}>Add new course</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            {error && <p className={addForms.message.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={addForms.addCourse.form}>
                <label className={addForms.label.label} htmlFor="course-name">Course name:</label>
                <input className={addForms.input.input} type="text" name="course-name" id="course-name" ref={courseName} />
                <label className={addForms.label.label} htmlFor="course-date">Course date:</label>
                <input className={addForms.input.input} type="date" name="" id="course-date" ref={courseDate} />
                <label className={addForms.label.label} htmlFor="course-organizer">Organizer:</label>
                <input className={addForms.input.input} type="text" name="course-organizer" id="course-organizer" ref={courseOrganizer} />
                <label className={addForms.label.label} htmlFor="course-category">Select course category:</label>
                <select
                    className={addForms.select.select}
                    name="course-category"
                    id="course-category"
                    ref={courseCategory}
                >
                    <option className={addForms.select.option} value="SEO">SEO</option>
                    <option className={addForms.select.option} value="Security">Security</option>
                    <option className={addForms.select.option} value="WebDev">WebDev</option>
                </select>
                <button className={addForms.btnSave.btnSave} type="submit">Save</button>
            </form>
        </div>
    )
}