import { useState, useContext } from 'react';
import { DataContext } from '../../../store/data-context';
import { cmsComponents } from './cms-componenst-styles';
import AddInterest from './data-forms/add-forms/AddInterest';
import DeleteInterest from './data-forms/delete-forms/DeleteInterest';



export default function ManageInterests() {
    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const interests = dataCtx.fetchedData.data.interests;
    const { refreshData } = dataCtx;
    const [actionType, setActionType] = useState(null);
    const [selectedInterest, setSelectedInterest] = useState(null);

    const handleAddNew = () => {
        setActionType('add')
    };

    const handleDelete = (interestData) => {
        setSelectedInterest(interestData);
        setActionType('delete')
    };

    const handleCloseAction = () => {
        setActionType(null);
        refreshData();
    }

    if (actionType === 'add') {
        return <AddInterest onClose={handleCloseAction} />
    };

    if (actionType === 'delete' && selectedInterest) {
        return <DeleteInterest interestData={selectedInterest} onClose={handleCloseAction} />
    }

    return (
        <div className={cmsComponents.wrapper.wrapper}>
            <h2
                className={cmsComponents.h2.h2}
            >
                Interests in DB:
            </h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            <button
                onClick={handleAddNew}
                className={cmsComponents.addNew.addNew}
            >
                Add new
            </button>
            <ul className={cmsComponents.ul.ul}>
                {!loading && interests && Array.isArray(interests) ? (
                    interests.map((interest) => {
                        return <li
                            className={cmsComponents.li.li}
                        >
                            <span className={cmsComponents.span.span}>{interest.id}</span>
                            <span className={cmsComponents.span.span}>{interest.intName}</span>
                            <button
                                className={cmsComponents.actionBtn.actionBtn}
                                onClick={() => handleDelete(interest)}
                            >
                                Delete
                            </button>
                        </li>
                    })
                ) : (
                    <div className={cmsComponents.managePosts.noPostsLi}>
                        <p>Brak zainteresowań</p>
                    </div>
                )}
            </ul>
        </div>
    )
}