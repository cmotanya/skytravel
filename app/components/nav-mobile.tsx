"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import nav_elements from "../lib/navigation";
import HamburgerMenu from "./nav-hamburger-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const MobileNav = () => {
    const [activeLink, setActiveLink] = useState<string | null>(
        nav_elements[0].href
    );
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const router = useRouter();

    // toggles the state of the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Updates the active link and open indicators based on the provided href and index
    const handleClick = (href: string, index: number) => {
        setActiveLink(href);
        setIsOpen(false);
        router.push(href);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isOpen]);

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
                            "fixed -right-2 top-[5.5rem] z-[1000] mr-2 flex h-auto w-[90%] flex-col justify-between overflow-y-auto rounded-lg bg-gray-800 text-xl ring-4 ring-gray-600 ring-offset-2",
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
                                            key={index}
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
                        <div className="text-sm uppercase p-3">
                            supported languages: english
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileNav;
