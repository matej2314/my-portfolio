import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { deleteForms } from '../data-forms-classes';
import ManageCourses from '../../ManageCourses';


const deleteCourseUrl = requestUrl.courses.delete;

export default function DeleteCourse({ courseData, onClose }) {
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);
    const [denyDeleteCourse, setDenyDeleteCourse] = useState(false);

    const handleDeleteCourse = async () => {
        const courseId = courseData.id;
        try {
            await sendRequest({
                url: deleteCourseUrl,
                method: "DELETE",
                data: { courseId: courseId }
            });
        } catch (error) {
            console.log('Błąd wysyłania w deleteCourse');
        }

    };

    const handleDenyDelete = () => {
        setDenyDeleteCourse(true);
    };

    if (denyDeleteCourse) {
        onClose();
    }

    useEffect(() => {
        if (result && !error) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [error, result, onClose]);

    return (
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>
                Czy na pewno chcesz usunąć kurs?
            </h2>
            {courseData && <p>{courseData.name}</p>}
            {courseData && <p>id: {courseData.id}</p>}
            {result && result.message && <p className={deleteForms.messages.result}>{result.message}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteCourse} disabled={user.role !== 'admin'}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )
}