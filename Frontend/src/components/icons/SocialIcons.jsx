import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import { socialURLS } from "../../url";
import { iconsClasses } from './iconsClasses';

export default function SocialIcons({ mailSize, iconsSize }) {
    return (
        <div className={iconsClasses.socialIcons.iconsWrapper}>
            <a className={iconsClasses.socialIcons.hoverState} href={socialURLS.facebook} target="_blank" rel="noreferrer">
                <Icon icon="ic:baseline-facebook" color={iconsClasses.socialIcons.facebookColor} width={iconsSize} height={iconsSize} />
            </a>
            <a className={iconsClasses.socialIcons.hoverState} href={socialURLS.github} target="_blank" rel="noreferrer">
                <Icon icon="mdi:github" color={iconsClasses.socialIcons.githubColor} width={iconsSize} height={iconsSize} />
            </a>
            <a className={iconsClasses.socialIcons.hoverState} href={socialURLS.linkedIn} target="_blank" rel="noreferrer">
                <Icon icon="mdi:linkedin" color={iconsClasses.socialIcons.linkedinColor} width={iconsSize} height={iconsSize} />
            </a>
            <Link to="/contact" className={iconsClasses.socialIcons.mailIcon}>
                <Icon icon="mdi:email-outline" width={mailSize} height={mailSize} />
            </Link>
        </div>
    );
}
