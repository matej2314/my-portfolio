import { useContext } from "react"
import { DataContext } from "../../store/data-context"
import { sectionsClasses } from "./portSections-classes"
import { motion } from "framer-motion"


export default function Interests() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-fit flex flex-col justify-center items-center gap-4 border-dotted border-b-2 border-[#6f963b] border-opacity-40">
            <div className={sectionsClasses.h2.titleWrapper}>
                <h2 className={sectionsClasses.h2.h2}>
                    Interests
                </h2>
            </div>
            <ul
                className="grid grid-rows-auto md:grid-rows-2 gap-2 pb-4 ">
                <motion.li
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ amount: 0.4, once: false }}
                    className={`${sectionsClasses.li.li} text-xl`}
                >IT
                </motion.li>
                <motion.li
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ amount: 0.4, once: false }}
                    className={`${sectionsClasses.li.li} text-xl`}
                >
                    Film
                </motion.li>
                <motion.li
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ amount: 0.4, once: false }}
                    className={`${sectionsClasses.li.li} text-xl`}
                >
                    New technologies
                </motion.li>
                <motion.li
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ amount: 0.4, once: false }}
                    className={`${sectionsClasses.li.li} text-xl`}
                >
                    Gaming
                </motion.li>
            </ul>
        </motion.div>
    )
}