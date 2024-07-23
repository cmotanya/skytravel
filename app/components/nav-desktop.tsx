"use client";

import Link from "next/link";
import { cn } from "../utils/cn";
import { useState } from "react";
import nav_elements from "../lib/navigation";

const DesktopNav = () => {
    const [activeItem, setActiveItem] = useState<{
        [key: string]: string | null;
    }>({});

    const handleLinkClick = (main: string) => {
        setActiveItem((prev) => ({ ...prev, main }));
    };

    return (
        <nav className="hidden overflow-hidden rounded-full text-lg ring-2 ring-gray-800 md:flex">
            <ul className="flex items-center gap-2">
                {nav_elements.map((item) => {
                    return (
                        <li
                            key={item.href}
                            className="flex w-full items-center justify-center rounded-md"
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    "hover:bg-primary-foreground flex w-full items-center justify-around rounded-full px-4 py-2 text-base font-semibold hover:text-primary"
                                )}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default DesktopNav;
