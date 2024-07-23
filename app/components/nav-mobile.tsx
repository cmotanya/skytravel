"use client";

import { IconPlus } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "../utils/cn";
import { useEffect, useRef, useState } from "react";
import nav_elements from "../lib/navigation";
import HamburgerMenu from "./nav-hamburger-menu";

const MobileNav = () => {
    const [openIndicator, setOpenIndicator] = useState<number | null>(null);
    const [activeLink, setActiveLink] = useState<string | null>(
        nav_elements[0].href
    );
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    // toggles the state of the open indicator based on the provided index
    const handleToggle = (index: number) => {
        setOpenIndicator(openIndicator === index ? null : index);
    };

    // toggles the state of the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Updates the active link and open indicators based on the provided href and index
    const handleLinkClick = (href: string, index: number) => {
        setActiveLink(href);

        if (openIndicator !== index) {
            setOpenIndicator(null);
        }
    };

    const handleSubItemClick = (href: string) => {
        setActiveLink(href);
        setOpenIndicator(null); // Close the sub menu
        toggleMenu(); // Close the entire mobile menu
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isOpen]);

    // Handles click event when it occurs outside of the navRef element
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setOpenIndicator(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Variants for the mobile navigation
    const navVariants = {
        closed: {
            x: "100%",
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        open: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
    };

    const itemVariants = {
        open: {
            x: 0,
            opacity: 1,
        },
        closed: {
            x: 20,
            opacity: 0,
        },
    };

    const subItemVariants = {
        hidden: {
            opacity: 0,
            y: -10,
        },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.3,
            },
        }),
    };

    return (
        <div className="fixed right-5 top-5 z-[1000] block text-300 md:hidden">
            <HamburgerMenu onclick={toggleMenu} isOpen={isOpen} />

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        ref={navRef}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={navVariants}
                        aria-label="Mobile Navigation"
                        className={cn(
                            "fixed -right-0 top-0 flex h-dvh w-full flex-col justify-between overflow-y-auto bg-900 text-xl",
                            isOpen ? "right-0" : "-right-full"
                        )}
                    >
                        <div className="flex h-full w-full flex-col">
                            <motion.ul
                                className="h-1/2 min-h-[60%] w-full flex-grow gap-3 overflow-hidden overflow-y-auto px-2 pb-4 pt-[4rem]"
                                variants={{
                                    open: {
                                        transition: {
                                            staggerChildren: 0.2,
                                            delayChildren: 0.4,
                                        },
                                    },
                                }}
                            >
                                {nav_elements.map((item, index) => {
                                    const isActive = activeLink === item.href;
                                    return (
                                        <motion.div
                                            role="menu"
                                            key={item.href}
                                            variants={itemVariants}
                                            className="relative my-3 w-full px-2"
                                        >
                                            <li className="flex w-full items-center justify-between rounded-md bg-800 hover:bg-700">
                                                <Link
                                                    href={item.href}
                                                    onClick={(e) => {
                                                        handleLinkClick(
                                                            item.href,
                                                            index
                                                        );
                                                    }}
                                                    className={cn(
                                                        "flex w-full items-center justify-between rounded-md p-4",
                                                        isActive
                                                            ? "bg-primary"
                                                            : "bg-800 hover:bg-accent"
                                                    )}
                                                >
                                                    {item.name}

                                                    {/* indicators */}
                                                </Link>
                                            </li>
                                        </motion.div>
                                    );
                                })}
                            </motion.ul>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileNav;
