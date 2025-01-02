import { useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { deleteForms } from '../data-forms-classes';
import { handleToastAndClose } from '../../../../../utils/handleToastAndClose';

const deleteAboutUrl = requestUrl.about.delete;

export default function DeleteAbout({ descData, onClose }) {
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleDeleteAbout = async () => {

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        }

        try {
            await sendRequest({
                url: deleteAboutUrl,
                method: "DELETE",
                data: { id: descData.id },
            });

        } catch (error) {
            console.log('Nie udało się usunąć opisu');
        }
    };

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);


    return (
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>
                Czy na pewno chcesz usunąć opis 'o mnie'?
            </h2>
            {descData && <p>{descData.name}</p>}
            {descData && <p>id: {descData.id}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteAbout}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={onClose}>Nie</button>
            </div>
        </div>
    )
}