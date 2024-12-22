import { useContext, useState } from "react";
import { DataContext } from "../../../store/data-context";
import AddCourse from './data-forms/add-forms/AddCourse';
import DeleteCourse from './data-forms/delete-forms/DeleteCourse';
import { cmsComponents } from "./cms-componenst-styles";

export default function ManageCourses() {
    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const courses = dataCtx.fetchedData.data.courses;
    const { refreshData } = dataCtx;

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [actionType, setActionType] = useState(null);

    const handleAddNew = () => {
        setActionType('add');
    };

    const handleDelete = (courseId) => {
        setSelectedCourse(() => courseId);
        setActionType('delete');
    };

    const handleCloseAction = () => {
        setActionType(null);
        refreshData();
    }

    if (actionType === 'delete') {
        return <DeleteCourse courseData={selectedCourse} onClose={handleCloseAction} />
    };

    if (actionType === 'add') {
        return <AddCourse onClose={handleCloseAction} />
    }



    return (
        <>
            <div className={cmsComponents.wrapper.wrapper}>
                <h2 className={cmsComponents.h2.h2}>Courses:</h2>
                <h3 className="text-sm text-zinc-300">( to go back, press "Manage" button )</h3>
                <button
                    onClick={handleAddNew}
                    className={cmsComponents.addNew.addNew}
                >
                    Add new
                </button>
                <ul className={cmsComponents.ul.ul}>
                    {!loading && courses && Array.isArray(courses) ? (
                        courses.map((course) => {
                            return <li className={cmsComponents.manageCourses.li} key={course.id}>
                                <span className={cmsComponents.manageCourses.span}>{course.title}</span>
                                <span className={cmsComponents.manageCourses.span}>{course.date}</span>
                                <span className={cmsComponents.manageCourses.span}>{course.organizer}</span>
                                <span className={cmsComponents.manageCourses.span}>{course.category}</span>
                                <div className={cmsComponents.buttonDiv.buttonDiv}>
                                    <button className={cmsComponents.actionBtn.actionBtn} onClick={() => handleDelete({ id: course.id, name: course.title })}>Delete</button>
                                </div>
                            </li>
                        })
                    ) : (
                        <p>Brak danych</p>
                    )
                    }
                </ul>
            </div>
        </>
    )
}