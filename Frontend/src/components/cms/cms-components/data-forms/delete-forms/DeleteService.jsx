import { useState } from "react";
import useSendRequest from "../../../../../hooks/useSendRequest";
import ManageServices from '../../ManageServices';
import { requestUrl } from "../../../../../url";

const deleteServiceUrl = requestUrl.services.delete;

export default function DeleteService({ serviceData }) {
    const [denyDelete, setDenyDelete] = useState(false);
    const { sendRequest, result, error } = useSendRequest();


    const handleDeleteService = async () => {
        const serviceId = serviceData.id;

        try {
            await sendRequest({
                url: deleteServiceUrl,
                method: "DELETE",
                data: { serviceId: serviceId }
            });
        } catch (error) {
            console.log('Nie udało się usunąć usługi');
        }
    };

    const handleDenyDelete = () => {
        setDenyDelete(true);
    };

    if (denyDelete) {
        return <ManageServices />
    }

    return (
        <div>
            <h2>Czy na pewno chcesz usunąć usługę?</h2>
            {serviceData.id && <p>ID: {serviceData.id}</p>}
            {serviceData.title && <p>Nazwa: {serviceData.title}</p>}
            {result && result.message && <p>{result.message}</p>}
            {error && <p>{error}</p>}
            <div>
                <button onClick={handleDeleteService}>Tak</button>
                <button onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )
}