"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import nav_elements from "../lib/navigation";
import HamburgerMenu from "./nav-hamburger-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IconWorld } from "@tabler/icons-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const MobileNav = () => {
    const [activeLink, setActiveLink] = useState<string | null>(
        nav_elements[0].href
    );
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("english");
    const navRef = useRef<HTMLElement>(null);
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                            "fixed right-0 top-[5rem] z-[1000] flex h-[calc(100vh-5rem)] w-full flex-col overflow-hidden bg-gray-800 text-xl",
                            isOpen ? "right-0" : "-right-full"
                        )}
                    >
                        <div className="flex h-full flex-col overflow-y-auto">
                            <div className="flex-grow">
                                <motion.ul
                                    className="w-full gap-3 px-2 py-4"
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
                                        const isActive =
                                            activeLink === item.href;
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

                            {/* Language selector at the bottom */}
                            <div className="mt-auto border-t border-gray-700 p-4">
                                <div className="flex items-center gap-4 text-sm uppercase">
                                    <span>
                                        <IconWorld />
                                    </span>
                                    <span>supported languages:</span>
                                    <div className="relative z-50">
                                        <Select
                                            defaultValue="english"
                                            onValueChange={setSelectedLanguage}
                                        >
                                            <SelectTrigger className="w-[180px] bg-gray-700 text-gray-200 focus:ring-gray-500">
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent
                                                className="z-[20000] bg-gray-700 text-gray-200"
                                                position="popper"
                                                sideOffset={4}
                                                align="end"
                                            >
                                                <SelectItem value="english">
                                                    English
                                                </SelectItem>
                                                <SelectItem value="spanish">
                                                    Spanish
                                                </SelectItem>
                                                <SelectItem value="french">
                                                    French
                                                </SelectItem>
                                                <SelectItem value="german">
                                                    German
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                {/* Debug output */}
                                <div className="mt-2 text-xs text-gray-400">
                                    Selected: {selectedLanguage}
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileNav;
