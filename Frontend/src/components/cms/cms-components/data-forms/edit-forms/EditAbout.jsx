import { useRef, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { addForms, editForms } from "../data-forms-classes";

const editAboutUrl = requestUrl.about.edit;

export default function EditAbout({ descData, onClose }) {

    const about = useRef(descData.aboutText || '');
    const { sendRequest, result, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await sendRequest({
                url: editAboutUrl,
                method: "PUT",
                data: {
                    id: descData.id,
                    about: about.current.value
                },
            });
        } catch (error) {

        }
    }

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
        <div
            className={editForms.ediAbout.wrapper}
        >
            <h2 className={editForms.ediAbout.h2}>Edit 'about me' text</h2>
            <h3 className="text-sm">( to go back, press "Manage" button )</h3>
            {error && <p className={addForms.message.error}>{error}</p>}
            <form
                onSubmit={handleSubmit}
                className={`${editForms.form.form} border-2 border-white p-4 mt-8 rounded-md`}>
                <label
                    className={editForms.label.label}
                    htmlFor="about-id"
                >
                    Id:
                </label>
                <input
                    className={editForms.input.input}
                    type="text"
                    name="about-id"
                    id="about-id"
                    defaultValue={descData.id}
                    readOnly />
                <label
                    className={editForms.label.label}
                    htmlFor="about-text"
                >
                    Edit 'about me' text:
                </label>
                <textarea
                    className={editForms.input.input}
                    name="about-text"
                    id="about-text"
                    defaultValue={descData.aboutText}
                    ref={about}
                />
                <button
                    className={editForms.submitBtn.submitBtn}
                    type="submit"
                    disabled={user.role !== 'admin'}
                >
                    Save
                </button>
            </form>
        </div>
    )
}