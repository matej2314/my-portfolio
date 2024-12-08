import { useRef, useEffect, useContext } from "react"
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
        if (result && !error) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [result, error, onClose])


    return (
        <div className="w-full h-full flex flex-col items-center justify-start text-white bg-neutral-600/30 pt-3 gap-4">
            <h2 className="text-3xl">Add new interest:</h2>
            {result && !error && <p className={addForms.message.result}>{result.message}</p>}
            {error && <p className={addForms.message.error}>{error}</p>}
            <form
                onSubmit={handleSubmit}
                className="w-1/4 h-fit flex flex-col items-center justify-center gap-3"
            >
                <label className="text-2xl" htmlFor="interest-name">Type interest name:</label>
                <input className="text-2xl text-black pl-2" type="text" name="interest-name" id="interest-name" ref={interest} />
                <button className={addForms.btnSave.btnSave} disabled={user.role !== 'admin'} type="submit">Save</button>
            </form>
        </div>
    )
}