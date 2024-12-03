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
    }

    if (actionType === 'add') {
        return <AddService />
    };

    if (actionType === 'edit' && selectedService) {
        return <EditServices selectedService={selectedService} />
    };

    if (actionType === 'delete' && selectedService) {
        return <DeleteService serviceData={selectedService} />
    }

    return (
        <div className={cmsComponents.manageServices.wrapper}>
            <h2 className={cmsComponents.manageServices.h2}>Services:</h2>
            <button
                onClick={handleAddNewService}
                className={cmsComponents.manageServices.addNew}
            >
                Add New
            </button>
            <ul className={cmsComponents.manageServices.ul}>
                {!loading && services && Array.isArray(services) ? (
                    services.map((service) => (
                        <li className={cmsComponents.manageServices.li} key={service.id}>
                            <span className={cmsComponents.manageServices.span}>{service.id}</span>
                            <span className={cmsComponents.manageServices.span}>{service.title}</span>
                            <span className={cmsComponents.manageServices.span}>{service.description}</span>
                            <div className={cmsComponents.manageServices.buttonDiv}>
                                <button
                                    onClick={() => handleEditService(service)}
                                    className={cmsComponents.manageServices.actionBtn}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteService(service)}
                                    className={cmsComponents.manageServices.actionBtn}
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