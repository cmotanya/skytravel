"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const TopArrowButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    window.addEventListener("scroll", toggleVisibility);

    const scrollToTop = () => {
        window.scroll({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-5 right-5 z-40 block rounded-full bg-primary p-3 text-background transition-opacity duration-300 md:hidden md:p-2",
                isVisible ? "opacity-100" : "opacity-0"
            )}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
            </svg>
        </button>
    );
};
export default TopArrowButton;
