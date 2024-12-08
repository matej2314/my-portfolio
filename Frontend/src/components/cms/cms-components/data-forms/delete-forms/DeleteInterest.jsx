import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { deleteForms } from '../data-forms-classes';
import ManageInterests from '../../ManageInterests';


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
                data: { id: interestId, interestName: interestName },
            });

        } catch (error) {
            console.log('Nie udało się usunąć zainteresowania.')
        }
    };

    const handleDenyDelete = () => {
        setDenyDeleteInterest(true);
    }

    useEffect(() => {
        if (result && !error) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [result, error, onClose])

    return (
        <div>

        </div>
    )


}