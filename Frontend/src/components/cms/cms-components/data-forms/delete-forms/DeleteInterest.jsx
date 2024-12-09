import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { deleteForms } from '../data-forms-classes';



const deleteInterestUrl = requestUrl.interests.delete;

export default function DeleteInterest(interestData, onClose) {
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);
    const [denyDeleteInterest, setDenyDeleteInterest] = useState(false);


    const handleDeleteInterest = async () => {
        const interestId = interestData.id;
        const interestName = interestData.intName;

        try {
            await sendRequest({
                url: deleteInterestUrl,
                method: "DELETE",
                data: { id: interestId, interestName: interestName },
            });

        } catch (error) {
            console.log('Nie udało się usunąć zainteresowania.')
        }
    };

    const handleDenyDelete = () => {
        setDenyDeleteInterest(true);
    }

    if (denyDeleteInterest) {
        onClose();
    }

    useEffect(() => {
        if (result && !error) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [result, error, onClose]);

    return (
        <div className={deleteForms.wrapper.wrapper}>
            <h2 className={deleteForms.h2.h2}>
                Czy na pewno chcesz usunąć zainteresowanie z bazy danych?
            </h2>
            {interestData && <p>{interestData.intName}</p>}
            {interestData && <p>id: {interestData.id}</p>}
            {result && result.message && <p className={deleteForms.messages.result}>{result.message}</p>}
            {error && <p className={deleteForms.messages.error}>{error}</p>}
            <div className={deleteForms.buttonWrapper.buttonWrapper}>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteInterest} disabled={user.role !== 'admin'}>Tak</button>
                <button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDenyDelete}>Nie</button>
            </div>
        </div>
    )


}