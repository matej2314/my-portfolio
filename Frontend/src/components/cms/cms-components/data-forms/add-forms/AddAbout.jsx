import { useRef, useEffect, useContext } from "react"
import { AuthContext } from '../../../../../store/auth-context';
import { requestUrl } from "../../../../../url";
import useSendRequest from "../../../../../hooks/useSendRequest";
import { addForms } from "../data-forms-classes";

const addAboutUrl = requestUrl.about.new;

export default function AddAbout({ onClose }) {
    const about = useRef();
    const { sendRequest, result, isLoading, error } = useSendRequest();
    const { user } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();

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
        if (result && !error) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [result, error, onClose])



    return (
        <div className="w-full h-full flex flex-col justify-start items-center bg-neutral-600/30 text-white pt-2 gap-8">
            <h2 className="text-3xl">Add new about me text</h2>
            {result && result.message && <p className={addForms.message.result}>{result.message}</p>}
            {error && <p className={addForms.message.error}>{error}</p>}
            <form
                className="w-11/12 h-full flex flex-col items-center justify-start text-white gap-4 "
                onSubmit={handleSubmit}
            >
                <label className="text-2xl" htmlFor="about-text">Write new 'about me' text:</label>
                <textarea className={addForms.input.input} name="about-text" id="about-text" ref={about} />
                <button className={addForms.btnSave.btnSave} type="submit" disabled={user.role !== 'admin'}>Save</button>
            </form>
        </div>
    )
}