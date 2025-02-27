import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';
import { NavLink, useLocation } from "react-router-dom";

import SelectCvVersionBtns from "./portfolio-sections/internal-components/SelectCvVersionBtns";
import { compClasses } from "./components-classes";

export default function Menu() {
    const [hoveredItem, setHoveredItem] = useState(null);
    const location = useLocation();

    const transitionConfig = { duration: 0.2, type: "spring", stiffness: 200, damping: 30 };
    const iconColor = "#b8c785";
    const initialDiv = { opacity: 0, x: -10 };
    const initialSpan = { opacity: 0, x: 10 };
    const animate = { opacity: 1, x: 0 };
    const iconSize = 26;

    const activeItem = location.pathname.replace("/", "");

    return (
        <menu className={`${compClasses.menu.menu} z-20`}>
            <nav>
                <ul className={compClasses.menu.ul}>
                    <li
                        onMouseEnter={() => setHoveredItem("home")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <NavLink to="/" className={compClasses.menu.link}>
                            <AnimatePresence mode="wait" initial={false}>
                                {activeItem === "home" || hoveredItem === "home" ? (
                                    <motion.div
                                        key="home-icon"
                                        initial={initialDiv}
                                        animate={animate}
                                        exit={initialDiv}
                                        transition={transitionConfig}
                                    >
                                        <Icon icon="carbon:home" color={iconColor} width={iconSize} height={iconSize} />
                                    </motion.div>
                                ) : (
                                    <motion.span
                                        key="home-text"
                                        initial={initialSpan}
                                        animate={animate}
                                        exit={initialSpan}
                                        transition={transitionConfig}
                                    >
                                        Home
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    </li>
                    <li
                        onMouseEnter={() => setHoveredItem("portfolio")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <NavLink to="/portfolio" className={compClasses.menu.link}>
                            <AnimatePresence mode="wait" initial={false}>
                                {activeItem === "portfolio" || hoveredItem === "portfolio" ? (
                                    <motion.div
                                        key="portfolio-icon"
                                        initial={initialDiv}
                                        animate={animate}
                                        exit={initialDiv}
                                        transition={transitionConfig}
                                    >
                                        <Icon icon="mdi:briefcase-variant-outline" color={iconColor} width={iconSize} height={iconSize} />
                                    </motion.div>
                                ) : (
                                    <motion.span
                                        key="portfolio-text"
                                        initial={initialSpan}
                                        animate={animate}
                                        exit={initialSpan}
                                        transition={transitionConfig}
                                    >
                                        Portfolio
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    </li>
                    <li
                        onMouseEnter={() => setHoveredItem("contact")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <NavLink to="/contact" className={compClasses.menu.link}>
                            <AnimatePresence mode="wait" initial={false}>
                                {activeItem === "contact" || hoveredItem === "contact" ? (
                                    <motion.div
                                        key="contact-icon"
                                        initial={initialDiv}
                                        animate={animate}
                                        exit={initialDiv}
                                        transition={transitionConfig}
                                    >
                                        <Icon icon="ic:baseline-email" color={iconColor} width={iconSize} height={iconSize} />
                                    </motion.div>
                                ) : (
                                    <motion.span
                                        key="contact-text"
                                        initial={initialSpan}
                                        animate={animate}
                                        exit={initialSpan}
                                        transition={transitionConfig}
                                    >
                                        Contact
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    </li>
                    <li
                        onMouseEnter={() => setHoveredItem("download")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <a
                            className={compClasses.menu.link}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {activeItem === "download" || hoveredItem === "download" ? (
                                    <motion.div
                                        key="download-icon"
                                        initial={initialDiv}
                                        animate={animate}
                                        exit={initialDiv}
                                        transition={transitionConfig}
                                    >
                                        <Icon icon="material-symbols:download" color={iconColor} width={iconSize} height={iconSize} />
                                    </motion.div>
                                ) : (
                                    <motion.span
                                        key="download-text"
                                        initial={initialSpan}
                                        animate={animate}
                                        exit={initialSpan}
                                        transition={transitionConfig}
                                    >
                                        Download CV
                                    </motion.span>
                                )}
                                {hoveredItem === 'download' && (
                                    <motion.div
                                        key='context-menu'
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{
                                            duration: 0.2,
                                            ease: 'easeInOut',
                                            damping: 28
                                        }}
                                        className="w-fit h-fit bg-neutral-900/85 absolute left-[12rem] bottom-[15rem] flex justify-center items-center p-3 z-10 rounded-tr-md rounded-br-md"
                                    >
                                        <div className="w-full h-full flex justify-center items-center gap-3  text-gray-600">
                                            <SelectCvVersionBtns />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </a>
                    </li>
                    <li
                        onMouseEnter={() => setHoveredItem("blog")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <NavLink to="/blog" className={compClasses.menu.link}>
                            <AnimatePresence mode="wait" initial={false}>
                                {activeItem === "blog" || hoveredItem === "blog" ? (
                                    <motion.div
                                        key="blog-icon"
                                        initial={initialDiv}
                                        animate={animate}
                                        exit={initialDiv}
                                        transition={transitionConfig}
                                    >
                                        <Icon icon="material-symbols:article" color={iconColor} width={iconSize} height={iconSize} />
                                    </motion.div>
                                ) : (
                                    <motion.span
                                        key="blog-text"
                                        initial={initialSpan}
                                        animate={animate}
                                        exit={initialSpan}
                                        transition={transitionConfig}
                                    >
                                        Blog
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </menu>
    );
}
