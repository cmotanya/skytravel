"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import AvailableSoonIcon from "../public/images/available-soon-icon.svg";
import { Button } from "@/components/ui/button";

function AvailableSoon() {
    const [isExiting, setIsExiting] = useState(false);
    const router = useRouter();

    const handleButtonClick = () => {
        setIsExiting(true);
        // Delay the actual navigation by 1 second to allow for exit animation
        setTimeout(() => {
            router.back();
        }, 500);
    };

    return (
        <div className="flex flex-col items-center justify-center overflow-hidden px-2 text-center md:px-0">
            <AnimatePresence>
                {!isExiting && (
                    <>
                        <motion.div
                            className="flex md:-mt-[2rem]"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <AvailableSoonIcon />
                        </motion.div>
                        <motion.div
                            className="-mt-[8rem]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <p className="text-balance text-base font-semibold">
                                Sorry, this page has not yet been populated with
                                data.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="w-[14rem]"
                        >
                            <Button
                                onClick={handleButtonClick}
                                className="group relative mx-auto mt-8 flex w-full items-center gap-4 overflow-hidden rounded-full !bg-[#2135f1] py-6 font-semibold uppercase tracking-wide !text-background md:w-[225px]"
                            >
                                <span className="absolute right-6 z-20 group-active:text-black md:group-hover:text-black">
                                    go back to home
                                </span>
                                <div className="absolute inset-y-0 left-1 top-1/2 flex h-[calc(100%-0.5rem)] w-10 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-primary-foreground pl-1 text-foreground transition-all duration-200 ease-in-out group-hover:bg-gray-200 group-active:w-[calc(100%-0.45rem)] md:group-hover:w-[calc(100%-0.45rem)]">
                                    <span className="absolute left-2 text-lg">
                                        <IconArrowLeft />
                                    </span>
                                </div>
                            </Button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AvailableSoon;
