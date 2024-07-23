import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

const HamburgerMenu = ({
    onclick,
    isOpen,
}: {
    onclick: () => void;
    isOpen: boolean;
}) => {
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
        <button
            onClick={onclick}
            aria-label={cn(isOpen ? "Close Menu" : "Open Menu")}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className={cn(
                "relative z-[1010] flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full transition-colors duration-300",
                hasScrolled && isOpen
                    ? "bg-primary"
                    : hasScrolled
                      ? "bg-900"
                      : isOpen
                        ? "bg-primary"
                        : "bg-800"
            )}
        >
            <div className="relative h-6 w-6">
                <span
                    className={cn(
                        "absolute left-0 h-0.5 w-full transform transition duration-300",
                        isOpen
                            ? "top-3 -rotate-45 bg-300"
                            : "top-0.5 skew-y-12 bg-primary"
                    )}
                ></span>
                <span
                    className={cn(
                        "absolute left-0 top-3 h-0.5 w-full transform transition duration-300",
                        isOpen ? "opacity-0" : "skew-y-12 bg-primary"
                    )}
                ></span>
                <span
                    className={cn(
                        "absolute left-0 h-0.5 w-full transform transition duration-300",
                        isOpen
                            ? "top-3 rotate-45 bg-300"
                            : "top-[1.35rem] skew-y-12 bg-primary"
                    )}
                ></span>
            </div>
        </button>
    );
};

export default HamburgerMenu;
