import { useRef, useEffect, useContext } from "react";
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from "../../../../../hooks/useSendRequest";
import { requestUrl } from "../../../../../url";
import { addForms } from "../data-forms-classes";

const addServiceUrl = requestUrl.services.new;

export default function AddService({ onClose }) {
    const serviceName = useRef();
    const serviceDescription = useRef();

    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

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

    useEffect(() => {
        if (result || error) {
            const message = result?.message || error;
            const type = result ? "info" : "error";

            toast[type](message);

            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [result, error, onClose]);


    return (
        <div className={addForms.addService.wrapper}>
            <h2 className={addForms.h2.h2}>Add new service</h2>
            <form className={addForms.addService.form} onSubmit={handleSubmit}>
                {result && result.message && <p className={addForms.message.result}>{result.message}</p>}
                {error && <p className={addForms.message.error}>{error}</p>}
                <label className={addForms.label.label} htmlFor="service-name">Service name:</label>
                <input className={addForms.input.input} type="text" name="service-name" id="service-name" ref={serviceName} />
                <label className={addForms.label.label} htmlFor="service-description">Service description:</label>
                <textarea className={addForms.input.input} name="" id="service-description" ref={serviceDescription} />
                <button className={addForms.btnSave.btnSave} type="submit" disabled={user.role !== 'admin'}>Save</button>
            </form>
        </div>
    )
}