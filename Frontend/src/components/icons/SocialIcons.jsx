import { Icon } from '@iconify/react';
import { delay, motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { socialURLS } from "../../url";
import { iconsClasses } from './iconsClasses';

export default function SocialIcons({ mailSize, iconsSize }) {

    const containerVariants = {
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        },
        initial: {
            opacity: 0
        }
    };

    const linkVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        whileHover: { scale: 1.5, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className={iconsClasses.socialIcons.iconsWrapper}
        >
            <motion.a
                href={socialURLS.facebook}
                variants={linkVariants}
                whileHover={{ scale: 1.5 }}
                target="_blank"
                rel="noreferrer">
                <Icon icon="ic:baseline-facebook" color={iconsClasses.socialIcons.facebookColor} width={iconsSize} height={iconsSize} />
            </motion.a>
            <motion.a
                href={socialURLS.github}
                variants={linkVariants}
                whileHover={{ scale: 1.5 }}
                target="_blank"
                rel="noreferrer"

            >
                <Icon icon="mdi:github" color={iconsClasses.socialIcons.githubColor} width={iconsSize} height={iconsSize} />
            </motion.a>
            <motion.a
                href={socialURLS.linkedIn}
                variants={linkVariants}
                whileHover={{ scale: 1.5 }}
                target="_blank"
                rel="noreferrer"
            >
                <Icon icon="mdi:linkedin" color={iconsClasses.socialIcons.linkedinColor} width={iconsSize} height={iconsSize} />
            </motion.a>
            <motion.div
                variants={linkVariants}
            >
                <Link
                    to="/contact"
                    className={iconsClasses.socialIcons.mailIcon}
                >
                    <Icon icon="mdi:email-outline" width={mailSize} height={mailSize} />
                </Link>
            </motion.div>
        </motion.div>
    );
}
