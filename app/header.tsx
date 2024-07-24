"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "./utils/cn";
import DesktopNav from "./components/nav-desktop";
import MobileNav from "./components/nav-mobile";

const Header = () => {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 0) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={cn(
                "duration-400 fixed z-[9999] flex h-20 w-full items-center justify-between border-b-2 border-gray-900 bg-transparent px-5 transition-colors",
                hasScrolled ? "bg-gray-900 shadow-2xl" : ""
            )}
        >
            <Link href="/">TravelAir</Link>

            <DesktopNav />

            <MobileNav />
        </header>
    );
};

export default Header;
