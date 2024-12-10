import { useEffect, useContext } from 'react';
import { toast } from 'react-toastify'

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { deleteForms } from '../data-forms-classes';

const deleteCourseUrl = requestUrl.courses.delete;

export default function DeleteCourse({ courseData, onClose }) {
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

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

    useEffect(() => {
        if (result || error) {
            const message = result?.message || error;
            const type = result ? "info" : "error";

            toast[type](message);

            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [result, error, onClose]);

    return (
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>
                Czy na pewno chcesz usunąć kurs?
            </h2>
            {courseData && <p>{courseData.name}</p>}
            {courseData && <p>id: {courseData.id}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteCourse} disabled={user.role !== 'admin'}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={onClose}>Nie</button>
            </div>
        </div>
    )
}