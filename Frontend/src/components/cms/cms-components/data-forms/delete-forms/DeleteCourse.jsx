import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';

import ManageCourses from '../../ManageCourses';

const deleteCourseUrl = requestUrl.courses.delete;

export default function DeleteCourse({ courseData }) {
    const { sendRequest, result, error } = useSendRequest();
    const [denyDeleteCourse, setDenyDeleteCourse] = useState(false);

    const handleDeleteCourse = async () => {
        const courseId = courseData.courseData.id;
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
        <div>
            {courseData && <p>{courseData.name}</p>}
            {courseData && <p>{courseData.id}</p>}
            {result && result.message && <p>{result.message}</p>}
            <p>
                Czy na pewno chcesz usunąć kurs?
            </p>
            <div>
                <button onClick={handleDeleteCourse}>Tak</button>
                <button onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )
}