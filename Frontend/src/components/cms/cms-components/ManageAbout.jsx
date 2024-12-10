import { useContext, useState } from "react"
import { DataContext } from "../../../store/data-context"
import { cmsComponents } from "./cms-componenst-styles"
import AddAbout from './data-forms/add-forms/AddAbout';
import EditAbout from './data-forms/edit-forms/EditAbout';
import DeleteAbout from './data-forms/delete-forms/DeleteAbout';



export default function ManageAbout() {
    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const about = dataCtx.fetchedData.data.about;
    const { refreshData } = dataCtx;
    const [actionType, setActionType] = useState(null);
    const [selectedDesc, setSelectedDesc] = useState(null);

    const handleAddNew = () => {
        setActionType('add');
    };

    const handleEdit = (descData) => {
        setSelectedDesc(() => descData)
        setActionType('edit')
    };

    const handleDelete = (descData) => {
        setSelectedDesc(() => descData)
        setActionType('delete')
    };

    const handleCloseAction = () => {
        setActionType(null);
        refreshData();
    }

    if (actionType === 'add') {
        return <AddAbout onClose={handleCloseAction} />
    };

    if (actionType === 'edit' && selectedDesc) {
        return <EditAbout descData={selectedDesc} onClose={handleCloseAction} />
    };

    if (actionType === 'delete' && selectedDesc) {
        return <DeleteAbout descData={selectedDesc} onClose={handleCloseAction} />
    }

    return (
        <div className={cmsComponents.wrapper.wrapper}>
            <h2 className={cmsComponents.h2.h2}>'About me' text:</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            <button
                onClick={handleAddNew}
                className={cmsComponents.addNew.addNew}
            >
                Add new
            </button>
            <ul className={cmsComponents.ul.ul}>
                {!loading && about && Array.isArray(about) ? (
                    about.map((text) => {
                        return <li
                            key={text.id}
                            className={cmsComponents.manageAbout.li}>
                            <span className={cmsComponents.span.span}>{text.id}</span>
                            <span className={cmsComponents.span.span}>{text.aboutText}</span>
                            <div className={cmsComponents.buttonDiv.buttonDiv}>
                                <button
                                    className={cmsComponents.actionBtn.actionBtn}
                                    onClick={() => handleEdit(text)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={cmsComponents.actionBtn.actionBtn}
                                    onClick={() => handleDelete(text)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    })
                ) : (
                    <p className="w-fit h-fit text-2xl text-white">Brak opisów.</p>
                )}
            </ul>
        </div>
    )
}