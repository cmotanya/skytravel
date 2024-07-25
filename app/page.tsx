"use client";

import { Button } from "@/components/ui/button";
import BookFlightForm from "./components/book-flight-form";
import { IconArrowRight, IconLuggage } from "@tabler/icons-react";
import Image from "next/image";
import { heroImages } from "./lib/hero-images";
import Link from "next/link";
import { Merienda as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { splitStringUsingRegex } from "@/lib/splitStringUsingRegex";
import { motion } from "framer-motion";
import { useState } from "react";

const fontSans = FontSans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-sans",
});

export default function Home() {
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const heading = "EXPLORE THE WORLD WITH TRAVELAIR";

    const headingChar = splitStringUsingRegex(heading);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: i * 0.03,
            },
        }),
    };

    const charVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 50,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    };

    const buttonContainerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };
    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
            },
        },
    };

    const getTransformStyle = (isMouseEntered: boolean, index: number) => ({
        transform: `translateY(${isMouseEntered ? "-100%" : "0%"})`,
        transition: `transform 0.3s ease ${index * 0.03}s`,
    });

    return (
        <main className="min-h-dvh">
            <div className="pt-12">
                <div className="grid items-center justify-center px-3 pb-14 text-center md:min-h-dvh md:grid-flow-col md:grid-cols-2 md:pb-3">
                    <div className="flex h-dvh w-screen flex-col items-center justify-center space-y-8 text-balance md:h-auto md:w-full">
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className={cn(
                                "font-sans text-4xl font-bold md:text-5xl",
                                fontSans.variable
                            )}
                        >
                            {headingChar.map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={charVariants}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h1>
                        <motion.p
                            className="leading-7"
                            initial="hidden"
                            animate="visible"
                            variants={charVariants}
                        >
                            Explore some of the most beautiful and exotic
                            locations around the world. Whether you&apos;re
                            looking for a relaxing beach getaway, an adventurous
                            mountain hike, or a cultural city experience, we
                            have something for everyone. Let us inspire your
                            next journey.
                        </motion.p>

                        {/* Button Component */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={buttonContainerVariants}
                            className="flex w-3/4 flex-col gap-4 pb-6 pt-10 md:flex-row"
                        >
                            <motion.div variants={buttonVariants}>
                                <Button
                                    asChild
                                    variant={"outline"}
                                    onMouseEnter={() => setIsMouseEntered(true)}
                                    onMouseLeave={() =>
                                        setIsMouseEntered(false)
                                    }
                                    className="mx-auto flex h-[48px] w-full items-center gap-4 rounded-full font-semibold uppercase tracking-wide ring-1 ring-[#1d3557] md:w-auto"
                                >
                                    <Link href="#form">
                                        <span className="relative overflow-hidden">
                                            {splitStringUsingRegex(
                                                "Book Your destination"
                                            ).map((char, index) => (
                                                <span
                                                    key={index}
                                                    className="relative overflow-hidden"
                                                >
                                                    <span
                                                        style={getTransformStyle(
                                                            isMouseEntered,
                                                            index
                                                        )}
                                                        className="relative whitespace-pre"
                                                    >
                                                        {char}
                                                    </span>
                                                    <span
                                                        style={getTransformStyle(
                                                            isMouseEntered,
                                                            index
                                                        )}
                                                        className="absolute left-0 top-full"
                                                    >
                                                        {char}
                                                    </span>
                                                </span>
                                            ))}{" "}
                                        </span>
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-foreground">
                                            <IconLuggage />
                                        </span>
                                    </Link>
                                </Button>
                            </motion.div>
                            <motion.div
                                variants={buttonVariants}
                                className="w-full"
                            >
                                <Button className="group relative mx-auto w-full overflow-hidden rounded-full !bg-[#2135f1] py-6 font-semibold uppercase tracking-wide !text-background md:w-[225px]">
                                    <Link
                                        href="/contact"
                                        className="flex w-full items-center"
                                    >
                                        <span className="absolute left-8 z-20 group-active:text-black md:left-3 md:group-hover:text-black">
                                            Contact Us Today
                                        </span>
                                        <div className="absolute inset-y-0 right-1 top-1/2 flex h-[calc(100%-0.5rem)] w-10 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-primary-foreground pl-1 text-foreground transition-all duration-200 ease-in-out group-hover:bg-gray-200 group-active:w-[calc(100%-0.45rem)] md:group-hover:w-[calc(100%-0.45rem)]">
                                            <span className="absolute right-2 text-lg">
                                                <IconArrowRight />
                                            </span>
                                        </div>
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Form */}
                    <div
                        id="form"
                        className="flex w-full flex-col items-center justify-center px-2 md:px-0"
                    >
                        <BookFlightForm />
                    </div>
                </div>

                <div className="space-y-3 bg-[#e9c46a] p-2 md:mt-0">
                    <h2 className="pl-3 text-3xl font-semibold">
                        Discover our Featured Destinations.
                    </h2>
                    <p className="text-balance pl-3">
                        Explore some of the most beautiful and exotic locations
                        around the world. Whether you&apos;re looking for a
                        relaxing beach getaway, an adventurous mountain hike, or
                        a cultural city experience, we have something for
                        everyone. Let us inspire your next journey.
                    </p>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                        {heroImages.map((image) => (
                            <Image
                                key={image.src}
                                src={image.src}
                                alt={image.alt || "Featured destination image"}
                                width={400}
                                height={400}
                                className="h-[14rem] w-full rounded-md object-cover object-center"
                            />
                        ))}
                    </div>

                    <Button className="w-3/4 bg-[#1d3557] font-semibold uppercase md:w-auto">
                        Explore All Destinations
                    </Button>
                </div>
            </div>
        </main>
    );
}
