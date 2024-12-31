import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../../../store/auth-context';
import { cmsComponents } from './cms-componenst-styles';

export default function CmsMenu({ handleSelected, onClose }) {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const buttonsArr = ['courses', 'posts', 'projects', 'services', 'skills', 'about', 'interests'];

    const handleLogOut = async () => {
        try {
            const message = await logout();
            toast.info(message);
            navigate('/login_admin');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className={cmsComponents.cmsMenu.wrapper}>
            <div
                className={cmsComponents.cmsMenu.contentWrapper}
            >
                <div className={cmsComponents.cmsMenu.homeWrapper}>
                    <button className="text-lime-500 hover:text-white">
                        <Link to="/" className="flex items-center">Home</Link>
                    </button>
                </div>
                <ul className={cmsComponents.cmsMenu.ul}>
                    <button className="text-lime-500 hover:text-white" onClick={onClose}>Menu:</button>
                    {buttonsArr.map((item) => (
                        <li key={item} className={cmsComponents.cmsMenu.li}>
                            <button disabled={!isAuthenticated} onClick={() => handleSelected(item)}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className={cmsComponents.cmsMenu.userDiv}>
                    <span className="text-sm md:text-base">User:</span>
                    {user && user.userName ? (
                        <p className="text-sm md:text-base">{user.userName}</p>
                    ) : (
                        <p className="text-sm md:text-base">Guest</p>
                    )}
                    <button
                        onClick={handleLogOut}
                        className="text-lime-500 hover:text-white ml-0 md:ml-5"
                        disabled={!isAuthenticated}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
