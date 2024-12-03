import { cmsComponents } from './cms-componenst-styles';

export default function CmsMenu({ handleSelected }) {

    return (
        <div className={cmsComponents.cmsMenu.wrapper}>
            <h2>Manage:</h2>
            <ul className={cmsComponents.cmsMenu.ul}>
                <li><button onClick={() => handleSelected('courses')}>Courses</button></li>
                <li><button onClick={() => handleSelected('posts')}>Posts</button></li>
                <li><button onClick={() => handleSelected('projects')}>Projects</button></li>
                <li><button onClick={() => handleSelected('services')}>Services</button></li>
                <li><button onClick={() => handleSelected('skills')}>Skills</button></li>
            </ul>
        </div>
    )
}