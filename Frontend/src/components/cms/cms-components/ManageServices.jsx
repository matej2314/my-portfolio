import { useContext, useState } from "react";
import { DataContext } from '../../../store/data-context';
import useSendRequest from '../../../hooks/useSendRequest';

export default function ManageServices() {
    const [selectedService, setSelectedService] = useState(null);

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const services = dataCtx.fetchedData.data.services;

    const handleAddNewService = () => {
        console.log('add service')
    };

    const handleEditService = (serviceData) => {
        setSelectedService(() => serviceData);
    };

    const handleDeleteService = (serviceId) => {
        selectedService(() => serviceId);
    }

    return (
        <div className="w-[95vw] h-fit flex flex-col justify-start items-center text-lg text-white p-0 gap-2">
            <h2 className="w-full h-fit flex flex-row justify-center">Services:</h2>
            <button
                onClick={handleAddNewService}
                className="w-fit h-fit text-lg text-white"
            >
                Add New
            </button>
            <ul className="w-fit h-fit flex flex-col justify-center items-center text-sm text-white border-2 border-l-cyan-100 p-4 gap-4">
                {!loading && services && Array.isArray(services) ? (
                    services.map((service) => (
                        <li className="w-full h-full flex flex-row items-start justify-center text-white text-sm gap-4 border-b-2 border-black p-2" key={service.id}>
                            <span className="w-full">{service.id}</span>
                            <span className="w-full">{service.title}</span>
                            <span className="w-full">{service.description}</span>
                            <div className="w-fit h-fit flex justify-around items-center gap-3">
                                <button
                                    onClick={() => handleEditService({ id: service.id, title: service.title, description: service.description })}
                                    className="w-fit h-fit text-sm text-white"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteService(service.id)}
                                    className="w-fit h-fit text-sm text-white"
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