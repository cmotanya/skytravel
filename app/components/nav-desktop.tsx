"use client";

import Link from "next/link";
import { useState } from "react";
import nav_elements from "../lib/navigation";
import { cn } from "@/lib/utils";

const DesktopNav = () => {
    const [activeItem, setActiveItem] = useState<{
        [key: string]: string | null;
    }>({});

    const handleLinkClick = (main: string) => {
        setActiveItem((prev) => ({ ...prev, main }));
    };

    return (
        <nav className="hidden overflow-hidden rounded-full text-lg ring-0 md:flex">
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
                                    "flex w-full items-center justify-around rounded-full px-4 py-2 text-base hover:bg-primary-foreground hover:text-primary"
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
