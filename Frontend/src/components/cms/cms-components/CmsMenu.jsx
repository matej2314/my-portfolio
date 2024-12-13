import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../../../store/auth-context';
import { cmsComponents } from './cms-componenst-styles';

export default function CmsMenu({ handleSelected, onClose }) {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();


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
            <div className='w-full h-fit flex justify-stretch items-center pl-[28rem] gap-5'>
                <button className='text-lime-500 hover:text-white'><Link to="/">Home</Link></button>
                <button className={cmsComponents.cmsMenu.h2} onClick={onClose}>Manage:</button>
                <ul className={cmsComponents.cmsMenu.ul}>
                    <li className={cmsComponents.cmsMenu.li}><button disabled={!isAuthenticated} onClick={() => handleSelected('courses')}>Courses</button></li>
                    <li className={cmsComponents.cmsMenu.li}><button disabled={!isAuthenticated} onClick={() => handleSelected('posts')}>Posts</button></li>
                    <li className={cmsComponents.cmsMenu.li}><button disabled={!isAuthenticated} onClick={() => handleSelected('projects')}>Projects</button></li>
                    <li className={cmsComponents.cmsMenu.li}><button disabled={!isAuthenticated} onClick={() => handleSelected('services')}>Services</button></li>
                    <li className={cmsComponents.cmsMenu.li}><button disabled={!isAuthenticated} onClick={() => handleSelected('skills')}>Skills</button></li>
                    <li className={cmsComponents.cmsMenu.li}><button disabled={!isAuthenticated} onClick={() => handleSelected('about')}>About me</button></li>
                    <li className={cmsComponents.cmsMenu.li}><button disabled={!isAuthenticated} onClick={() => handleSelected('interests')}>Interests</button></li>
                </ul>
            </div>
            <div className={cmsComponents.cmsMenu.userDiv}>
                <span className='w-fit h-fit'>User:</span>
                {user && user.userName ? (
                    <p className='w-fit h-fit'>{user.userName}</p>
                ) : (
                    <p className='w-fit h-fit'>Guest</p>
                )}
                <div className='w-fit h-fit flex justify-center'>
                    <button onClick={handleLogOut} className={cmsComponents.cmsMenu.logOutBtn} disabled={!isAuthenticated}>Logout</button>
                </div>
            </div>
        </div>
    );
}
