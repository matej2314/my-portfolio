import { useRef, useContext } from "react";
import { DataContext } from "../../../../../store/data-context";
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';

const editeServiceUrl = requestUrl.services.put;



export default function EditServices({ selectedService }) {
    console.log(selectedService)
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { refreshData } = useContext(DataContext);

    const serviceId = useRef(selectedService.id || '');
    const serviceTitle = useRef(selectedService.title || '');
    const serviceDesc = useRef(selectedService.description || '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedService = {
            serviceId: serviceId.current.value,
            serviceName: serviceTitle.current.value,
            serviceDescription: serviceDesc.current.value,
        };

        try {
            await sendRequest({
                url: editeServiceUrl,
                method: "PUT",
                data: updatedService
            });
        } catch (error) {
            console.log('Nie udało się edytować usługi.');
        }
    }

    return (
        <div className="w-fit h-fit flex flex-col justify-center items-center text-md text-white border-2 border-black p-4 gap-3">
            <h2 className="w-full h-full flex justify-center items-center text-lg text-black">Edit selected service</h2>
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} className="w-[30vw] h-fit flex flex-col justify-center items-center gap-4 text-black text-md">
                <label
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                    htmlFor="service-id"
                >Service id:
                </label>
                <input
                    className="w-full h-fit flex flex-row justify-center items-center text-black pl-2"
                    type="text"
                    name="service-id"
                    id="service-id"
                    defaultValue={selectedService.id}
                    ref={serviceId}
                    readOnly
                />
                <label
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                    htmlFor="service-title"
                >
                    Service title:
                </label>
                <input
                    className="w-full h-fit flex flex-row justify-center items-center text-black pl-2"
                    type="text"
                    name="service-title"
                    id="service-title"
                    defaultValue={selectedService.title}
                    ref={serviceTitle}
                />
                <label
                    className="w-full h-fit flex flex-row justify-center items-center text-black"
                    htmlFor="service-description"
                >
                    Service description:
                </label>
                <textarea
                    className="w-full h-fit flex flex-row justify-center items-center text-black pl-2"
                    type="text"
                    name="service-description"
                    id="service-description"
                    defaultValue={selectedService.description}
                    ref={serviceDesc}
                />
                <button
                    className="w-1/2 h-fit flex flex-row justify-center items-center"
                    type="submit"
                >
                    Save
                </button>

            </form>
        </div>
    )
}