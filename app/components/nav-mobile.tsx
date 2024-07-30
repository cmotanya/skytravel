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
        <div className="fixed right-5 top-3 z-[1000] block md:hidden">
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
                            "fixed inset-y-0 right-0 z-[1000] flex w-full flex-col overflow-hidden bg-gray-900 text-xl",
                            isOpen ? "right-0" : "-right-full"
                        )}
                    >
                        <div className="flex h-full flex-col overflow-y-auto">
                            <div className="flex-grow pt-20">
                                <motion.ul
                                    className="w-full gap-3 px-4 py-4"
                                    variants={{
                                        open: {
                                            transition: {
                                                staggerChildren: 0.1,
                                                delayChildren: 0.2,
                                            },
                                        },
                                    }}
                                >
                                    {nav_elements.map((item, index) => {
                                        const isActive =
                                            activeLink === item.href;
                                        return (
                                            <motion.li
                                                key={index}
                                                variants={itemVariants}
                                                className="my-2"
                                            >
                                                <Link
                                                    href={item.href}
                                                    onClick={() =>
                                                        handleClick(
                                                            item.href,
                                                            index
                                                        )
                                                    }
                                                    className={cn(
                                                        "block w-full rounded-md p-4 transition-colors",
                                                        isActive
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            </motion.li>
                                        );
                                    })}
                                </motion.ul>
                            </div>

                            <div className="mt-auto border-t border-gray-700 bg-gray-800 p-4">
                                <div className="flex items-center gap-4 text-sm uppercase text-gray-200">
                                    <IconWorld className="text-blue-400" />
                                    <span>supported languages:</span>
                                    <div className="relative z-50">
                                        <Select
                                            defaultValue="english"
                                            onValueChange={setSelectedLanguage}
                                        >
                                            <SelectTrigger className="w-[180px] border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500">
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent
                                                className="z-[9999] border-gray-600 bg-gray-700 text-gray-200"
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
