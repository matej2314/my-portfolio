import { useState } from "react";
import useSendRequest from "../../../../../hooks/useSendRequest";
import ManageServices from '../../ManageServices';
import { requestUrl } from "../../../../../url";
import { deleteForms } from "../data-forms-classes";

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
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>Czy na pewno chcesz usunąć usługę?</h2>
            {serviceData.title && <p>{serviceData.title}</p>}
            {serviceData.id && <p>Id: {serviceData.id}</p>}

            {result && result.message && <p className={deleteForms.messages.result}>{result.message}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button onClick={handleDeleteService}>Tak</button>
                <button onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )
}