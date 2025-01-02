import { useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from "../../../../../store/auth-context";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { deleteForms } from "../data-forms-classes";
import { handleToastAndClose } from "../../../../../utils/handleToastAndClose";

const deleteServiceUrl = requestUrl.services.delete;

export default function DeleteService({ serviceData, onClose }) {
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleDeleteService = async () => {
        const serviceId = serviceData.id;

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        }

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

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);


    return (
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>Czy na pewno chcesz usunąć usługę?</h2>
            {serviceData.title && <p>{serviceData.title}</p>}
            {serviceData.id && <p>Id: {serviceData.id}</p>}

            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteService}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={onClose}>Nie</button>
            </div>
        </div>
    )
}