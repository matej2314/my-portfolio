import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../store/auth-context';
import { cmsComponents } from './cms-componenst-styles';

export default function CmsMenu({ handleSelected }) {
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogOut = async () => {
        try {
            const message = await logout();
            alert(message);
            navigate('/login_admin');
        } catch (error) {
            console.log(error.message)
        }
    };

    return (

        <div className={cmsComponents.cmsMenu.wrapper}>
            <div className='w-full h-fit flex justify-stretch items-center pl-[28rem]'>
                <h2 className={cmsComponents.cmsMenu.h2}>Manage:</h2>
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
                    <button onClick={handleLogOut} className={cmsComponents.cmsMenu.logOutBtn}>Logout</button>
                </div>
            </div>
        </div>
    );
}
