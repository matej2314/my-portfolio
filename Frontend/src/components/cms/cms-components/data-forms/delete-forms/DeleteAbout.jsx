import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { deleteForms } from '../data-forms-classes';
import ManageAbout from '../../ManageAbout';

const deleteAboutUrl = requestUrl.about.delete;

export default function DeleteAbout({ descData, onClose }) {
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);
    const [denyDeleteAbout, setDenyDeleteAbout] = useState(false);

    const handleDeleteAbout = async () => {
        const id = descData.id;

        try {
            await sendRequest({
                url: deleteAboutUrl,
                data: { id: id },
            });

        } catch (error) {
            console.log('Nie udało się usunąć opisu');
        }
    };

    const handleDenyDelete = () => {
        setDenyDeleteAbout(true);
    };

    if (denyDeleteAbout) {
        onClose();
    }

    useEffect(() => {
        if (result && !error) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [error, result, onClose]);

    return (
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>
                Czy na pewno chcesz usunąć opis 'o mnie'?
            </h2>
            {descData && <p>{descData.name}</p>}
            {descData && <p>id: {descData.id}</p>}
            {result && result.message && <p className={deleteForms.messages.result}>{result.message}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteAbout} disabled={user.role !== 'admin'}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )
}