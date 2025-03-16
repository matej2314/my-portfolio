import { useEffect, useState } from 'react';

import { cvURL } from '../../../url';
import ReactGA from 'react-ga4';

export default function SelectCvVersionBtns() {
    const [sendEvent, setSendEvent] = useState(false);

    const engUrl = `${cvURL}/en`;
    const plUrl = `${cvURL}/pl`;



    useEffect(() => {
        if (sendEvent) {
            const sendGaEvent = () => {
                ReactGA.event('download_cv', {
                    category: 'download cv',
                    action: 'downloaded',
                    label: 'CV downloaded',
                    elementId: 'download-btn'
                });
            };
            sendGaEvent();
        };

    }, [sendEvent]);

    return (
        <>
            <button
                onClick={() => setSendEvent(true)}
                type="button"
                className="w-fit h-fit flex text-nowrap justify-center items-center bg-green-500 hover:text-gray-500 rounded-md p-2">
                <a
                    href={engUrl}
                >
                    English version
                </a>
            </button>
            <button
                onClick={() => setSendEvent(true)}
                type="button"
                className="w-fit h-fit flex justify-center text-nowrap items-center bg-green-500 hover:text-gray-500 rounded-md p-2">
                <a
                    href={plUrl}
                >
                    Polish version
                </a>
            </button>
        </>

    )
};