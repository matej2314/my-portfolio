import { useContext } from "react";
import { DataContext } from '../../../store/data-context';
import useSendRequest from '../../../hooks/useSendRequest';

export default function ManageServices() {

    const dataCtx = useContext(DataContext);
    const loading = dataCtx.isLoading;
    const services = dataCtx.fetchedData.data.services;

    return (
        <div className="w-[95vw] h-fit flex flex-col justify-start items-center text-lg text-white p-0 gap-2">
            <h2 className="w-full h-fit flex flex-row justify-center">Services:</h2>
            <ul className="w-fit h-fit flex flex-col justify-center items-center text-sm text-white border-2 border-l-cyan-100 p-4 gap-4">
                {!loading && services && Array.isArray(services) ? (
                    services.map((service) => (
                        <li className="w-full h-full flex flex-row items-start justify-center text-white text-sm gap-2 border-b-2 border-black p-2" key={service.id}>
                            <span className="w-full">{service.id}</span>
                            <span className="w-full">{service.title}</span>
                            <span className="w-full">{service.description}</span>
                        </li>
                    ))
                ) : (
                    <p>No services</p>
                )}
            </ul>
        </div>
    )
}