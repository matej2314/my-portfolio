import { useRef, useEffect, useContext } from "react"
import { toast } from "react-toastify";

import { AuthContext } from '../../../../../store/auth-context';
import { requestUrl } from "../../../../../url";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { addForms } from "../data-forms-classes";


const addInterestUrl = requestUrl.interests.new;

export default function AddInterest({ onClose }) {
    const interest = useRef();
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await sendRequest({
                url: addInterestUrl,
                data: { interest: interest.current.value }
            });

        } catch (error) {

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
        <div className={addForms.AddInterest.wrapper}>
            <h2 className="text-3xl">Add new interest:</h2>
            {error && <p className={addForms.message.error}>{error}</p>}
            <form
                onSubmit={handleSubmit}
                className={addForms.AddInterest.form}
            >
                <label className="text-2xl" htmlFor="interest-name">Type name of new interest:</label>
                <input className={addForms.input.input} type="text" name="interest-name" id="interest-name" ref={interest} />
                <button className={addForms.btnSave.btnSave} disabled={user.role !== 'admin'} type="submit">Save</button>
            </form>
        </div>
    )
}