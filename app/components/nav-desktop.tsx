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
        <nav className="hidden text-lg md:flex">
            {nav_elements.map((item) => {
                const isActive = activeItem.main === item.href;
                return (
                    <ul
                        key={item.href}
                        className="group relative flex items-center"
                    >
                        <li className="mx-0.5 flex w-[10rem] items-center justify-center rounded-md bg-primary hover:bg-accent">
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex w-full items-center justify-around gap-2 rounded-md p-2 text-200",
                                    isActive
                                        ? "bg-accent"
                                        : "bg-primary hover:bg-accent"
                                )}
                            >
                                {item.name}
                            </Link>
                        </li>
                    </ul>
                );
            })}
        </nav>
    );
};

export default DesktopNav;
