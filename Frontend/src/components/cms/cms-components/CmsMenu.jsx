import { useContext } from 'react';
import { AuthContext } from '../../../store/auth-context';
import { cmsComponents } from './cms-componenst-styles';

export default function CmsMenu({ handleSelected }) {
    const { user, isAuthenticated } = useContext(AuthContext);
    console.log('isauthenticated w cmsnmenu:', isAuthenticated)
    return (
        <div className={cmsComponents.cmsMenu.wrapper}>
            <h2 className={cmsComponents.cmsMenu.h2}>Manage:</h2>
            <ul className={cmsComponents.cmsMenu.ul}>
                <li className={cmsComponents.cmsMenu.li}><button onClick={() => handleSelected('courses')}>Courses</button></li>
                <li className={cmsComponents.cmsMenu.li}><button onClick={() => handleSelected('posts')}>Posts</button></li>
                <li className={cmsComponents.cmsMenu.li}><button onClick={() => handleSelected('projects')}>Projects</button></li>
                <li className={cmsComponents.cmsMenu.li}><button onClick={() => handleSelected('services')}>Services</button></li>
                <li className={cmsComponents.cmsMenu.li}><button onClick={() => handleSelected('skills')}>Skills</button></li>
            </ul>
            {user && user.userName ? (
                <div className={cmsComponents.cmsMenu.userDiv}>
                    <span>User:</span>
                    <span>{user.userName}</span>
                </div>
            ) : (
                <div className={cmsComponents.cmsMenu.userDiv}>
                    <span>User:</span>
                    <span>Guest</span>
                </div>
            )}
        </div>
    );
}
