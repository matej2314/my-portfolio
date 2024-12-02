import { useRef } from "react";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";

const addServiceUrl = requestUrl.services.new;

export default function AddService() {

    const serviceName = useRef();
    const serviceDescription = useRef();

    const { sendRequest, result, error } = useSendRequest();

    const handleSubmit = async e => {
        e.preventDefault();

        const data = {
            serviceName: serviceName.current.value,
            serviceDesc: serviceDescription.current.value,
        };

        try {
            await sendRequest({
                url: addServiceUrl,
                data: data
            });
        } catch (error) {
            console.log('Dodawanie usługi nie powiodło się');
        }
    };

    return (
        <div>
            <h2>Add new service</h2>
            <form onSubmit={handleSubmit}>
                {result && result.message && <p>{result.message}</p>}
                {error && <p>{error}</p>}
                <label htmlFor="service-name">Service name:</label>
                <input type="text" name="service-name" id="service-name" ref={serviceName} />
                <label htmlFor="service-description">Service description:</label>
                <textarea name="" id="service-description" ref={serviceDescription} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}