"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopNav from "./components/nav-desktop";
import MobileNav from "./components/nav-mobile";
import { cn } from "@/lib/utils";

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
                "duration-400 fixed z-[9999] flex h-20 w-full items-center justify-between px-5 transition-colors",
                hasScrolled
                    ? "bg-[#457b9d] shadow-2xl"
                    : "bg-[#1d3557] text-gray-50"
            )}
        >
            <Link href="/">TravelAir</Link>

            <DesktopNav />

            <MobileNav />
        </header>
    );
};

export default Header;
