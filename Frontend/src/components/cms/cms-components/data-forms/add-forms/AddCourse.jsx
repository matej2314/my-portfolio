import { useContext, useState, useRef } from "react"
import useSendRequest from '../../../../../hooks/useSendRequest';
import { DataContext } from '../../../../../store/data-context';
import { requestUrl } from "../../../../../url";

const addCourseUrl = requestUrl.courses.new;

export default function AddCourse({ courseData }) {

    const courseName = useRef();
    const courseDate = useRef();
    const courseOrganizer = useRef();
    const courseCategory = useRef();
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { refreshData } = useContext(DataContext)

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


    }

    return (
        <div>
            <h2>Add new course</h2>
            {result && !error && <p>{result.message}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="course-name">Course name:</label>
                <input type="text" name="course-name" id="course-name" ref={courseName} />
                <label htmlFor="course-date">Course date:</label>
                <input type="date" name="" id="course-date" ref={courseDate} />
                <label htmlFor="course-organizer">Organizer:</label>
                <input type="text" name="course-organizer" id="course-organizer" ref={courseOrganizer} />
                <label htmlFor="course-category">Course category:</label>
                <input type="text" name="course-category" id="course-category" ref={courseOrganizer} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}