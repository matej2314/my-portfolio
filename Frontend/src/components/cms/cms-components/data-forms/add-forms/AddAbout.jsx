import { useRef, useEffect, useContext } from "react"
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import { requestUrl } from "../../../../../url";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { addForms } from "../data-forms-classes";
import { handleToastAndClose } from "../../../../../utils/handleToastAndClose";

const addAboutUrl = requestUrl.about.new;

export default function AddAbout({ onClose }) {
    const about = useRef();
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { user } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.role !== 'admin') {
            toast.info('Sorry! You are not an admin!');
            return;
        }

        try {
            await sendRequest({
                url: addAboutUrl,
                data: { about: about.current.value }
            });
        } catch (error) {
            console.log('Nie udało się dodać nowego opisu')
        }
    };

    useEffect(() => {
        const cleanupFn = handleToastAndClose(error, result, onClose, toast);

        return cleanupFn;
    }, [result, error, onClose]);

    return (
        <div className={addForms.addAbout.wrapper}>
            <h2 className="text-2xl">Add new about me text</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            {error && <p className={addForms.message.error}>{error}</p>}
            <form
                className={addForms.addAbout.form}
                onSubmit={handleSubmit}
            >
                <label className="text-xl" htmlFor="about-text">Write new 'about me' text:</label>
                <textarea className={addForms.addAbout.textarea} name="about-text" id="about-text" ref={about} />
                <button className={addForms.btnSave.btnSave} type="submit">Save</button>
            </form>
        </div>
    )
}