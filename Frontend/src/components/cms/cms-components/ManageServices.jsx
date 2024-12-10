import { useContext, useState } from "react";
import { DataContext } from '../../../store/data-context';
import useSendRequest from '../../../hooks/useSendRequest';
import EditServices from "./data-forms/edit-forms/EditServices";
import AddService from "./data-forms/add-forms/AddService";
import DeleteService from './data-forms/delete-forms/DeleteService';
import { cmsComponents } from "./cms-componenst-styles";

export default function ManageServices() {
    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const services = dataCtx.fetchedData.data.services;
    const { refreshData } = dataCtx;

    const [selectedService, setSelectedService] = useState(null);
    const [actionType, setActionType] = useState(null);

    const handleAddNewService = () => {
        setActionType('add')
    };

    const handleEditService = (serviceData) => {
        setSelectedService(() => serviceData);
        setActionType('edit');
    };

    const handleDeleteService = (serviceData) => {
        setActionType('delete');
        setSelectedService(() => serviceData);
    };

    const handleCloseAction = () => {
        setActionType(null);
        refreshData();
    }

    if (actionType === 'add') {
        return <AddService onClose={handleCloseAction} />
    };

    if (actionType === 'edit' && selectedService) {
        return <EditServices selectedService={selectedService} onClose={handleCloseAction} />
    };

    if (actionType === 'delete' && selectedService) {
        return <DeleteService serviceData={selectedService} onClose={handleCloseAction} />
    }

    return (
        <div className={cmsComponents.wrapper.wrapper}>
            <h2 className={cmsComponents.h2.h2}>Services:</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            <button
                onClick={handleAddNewService}
                className={cmsComponents.addNew.addNew}
            >
                Add new
            </button>
            <ul className={cmsComponents.ul.ul}>
                {!loading && services && Array.isArray(services) ? (
                    services.map((service) => (
                        <li className={cmsComponents.li.li} key={service.id}>
                            <span className={cmsComponents.span.span}>{service.id}</span>
                            <span className={cmsComponents.span.span}>{service.title}</span>
                            <span className={cmsComponents.span.span}>{service.description}</span>
                            <div className={cmsComponents.buttonDiv.buttonDiv}>
                                <button
                                    onClick={() => handleEditService(service)}
                                    className={cmsComponents.actionBtn.actionBtn}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteService(service)}
                                    className={cmsComponents.actionBtn.actionBtn}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No services</p>
                )}
            </ul>
        </div>
    )
}