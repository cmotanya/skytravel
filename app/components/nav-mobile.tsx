"use client";

import { IconPlus } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import nav_elements from "../lib/navigation";
import HamburgerMenu from "./nav-hamburger-menu";
import { cn } from "@/lib/utils";

const MobileNav = () => {
    const [openIndicator, setOpenIndicator] = useState<number | null>(null);
    const [activeLink, setActiveLink] = useState<string | null>(
        nav_elements[0].href
    );
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    // toggles the state of the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Updates the active link and open indicators based on the provided href and index
    const handleClick = (href: string, index: number) => {
        setActiveLink(href);

        if (openIndicator !== index) {
            setOpenIndicator(null);
        }
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
        <div className="text-300 fixed right-5 top-3 z-[1000] block md:hidden">
            <HamburgerMenu onclick={toggleMenu} isOpen={isOpen} />

            {isOpen && (
                <div
                    className="fixed inset-0 z-[999] bg-gray-800/50 backdrop-blur-sm"
                    onClick={toggleMenu}
                ></div>
            )}
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
                            "fixed -right-2 top-[5.5rem] z-[1000] mr-2 flex h-auto w-3/4 flex-col justify-between overflow-y-auto rounded-lg bg-gray-800 text-xl ring-4 ring-gray-600 ring-offset-2",
                            isOpen ? "right-0" : "-right-full"
                        )}
                    >
                        <div className="flex h-full w-full flex-col">
                            <motion.ul
                                className="h-1/2 min-h-[60%] w-full flex-grow gap-3 overflow-hidden overflow-y-auto px-2 pb-4 pt-[2rem]"
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
                                            <li className="bg-800 hover:bg-700 flex w-full items-center justify-between rounded-md">
                                                <Link
                                                    href={item.href}
                                                    onClick={() => {
                                                        handleClick(
                                                            item.href,
                                                            index
                                                        );
                                                    }}
                                                    className={cn(
                                                        "flex w-full items-center justify-between rounded-md p-4",
                                                        isActive
                                                            ? "bg-primary"
                                                            : "hover:bg-gray-900"
                                                    )}
                                                >
                                                    {item.name}
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
