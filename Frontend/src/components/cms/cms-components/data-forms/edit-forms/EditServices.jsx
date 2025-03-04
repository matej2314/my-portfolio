import { useRef, useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { editForms } from "../data-forms-classes";
import { handleToastAndClose } from '../../../../../utils/handleToastAndClose';

const editServiceUrl = requestUrl.services.put;

export default function EditServices({ selectedService, onClose }) {

    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { user } = useContext(AuthContext);

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

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        };

        try {
            await sendRequest({
                url: editServiceUrl,
                method: "PUT",
                data: updatedService
            });
        } catch (error) {
            console.log('Failed to editting service.');
        }
    };

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <div className={editForms.EditServices.wrapper}>
            <h2 className="text-2xl">Edit selected service</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            {error && <p>{error}</p>}
            <form
                onSubmit={handleSubmit}
                className={`${editForms.form.form} mt-3 border-2 border-white p-4 rounded-md`}>
                <label
                    className={editForms.label.label}
                    htmlFor="service-id"
                >Service id:
                </label>
                <input
                    className={editForms.input.input}
                    type="text"
                    name="service-id"
                    id="service-id"
                    defaultValue={selectedService.id}
                    ref={serviceId}
                    readOnly
                />
                <label
                    className={editForms.label.label}
                    htmlFor="service-title"
                >
                    Service title:
                </label>
                <input
                    className={editForms.input.input}
                    type="text"
                    name="service-title"
                    id="service-title"
                    defaultValue={selectedService.title}
                    ref={serviceTitle}
                />
                <label
                    className={editForms.label.label}
                    htmlFor="service-description"
                >
                    Service description:
                </label>
                <textarea
                    className={editForms.input.input}
                    type="text"
                    name="service-description"
                    id="service-description"
                    defaultValue={selectedService.description}
                    ref={serviceDesc}
                />
                <button
                    className={editForms.submitBtn.submitBtn}
                    type="submit"
                >
                    Save
                </button>

            </form>
        </div>
    )
}