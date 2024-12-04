import { useState } from 'react';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { deleteForms } from '../data-forms-classes';

import ManageCourses from '../../ManageCourses';

const deleteCourseUrl = requestUrl.courses.delete;

export default function DeleteCourse({ courseData }) {
    const { sendRequest, result, error } = useSendRequest();
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
        return <ManageCourses />
    }

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
                <button onClick={handleDeleteCourse}>Tak</button>
                <button onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )
}