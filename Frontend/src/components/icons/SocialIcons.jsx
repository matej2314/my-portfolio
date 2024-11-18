import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";
import { socialURLS } from "../../../url";
import { iconsClasses } from './iconsClasses';


export default function SocialIcons({ mailSize, iconsSize }) {
    return (
        <div className={iconsClasses.socialIcons.iconsWrapper}>
            <a className={iconsClasses.socialIcons.hoverState} href={socialURLS.facebook} target="_blank" rel="noreferrer">
                <FaFacebook color={iconsClasses.socialIcons.facebookColor} size={iconsSize} />
            </a>
            <a className={iconsClasses.socialIcons.hoverState} href={socialURLS.github} target="_blank" rel="noreferrer" >
                <FaGithub color={iconsClasses.socialIcons.githubColor} size={iconsSize} />
            </a>
            <a className={iconsClasses.socialIcons.hoverState} href={socialURLS.linkedIn} target="_blank" rel="noreferrer">
                <FaLinkedin color={iconsClasses.socialIcons.linkedinColor} size={iconsSize} />
            </a>
            <Link to="/contact" className={iconsClasses.socialIcons.mailIcon}><MdOutlineMail size={mailSize} /></Link>
        </div>
    )
}