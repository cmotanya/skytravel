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

const fontSans = FontSans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-sans",
});

export default function Home() {
    const heading = "EXPLORE THE WORLD WITH TRAVELAIR";
    const text = `Explore some of the most beautiful and exotic locations around the world. Whether you&apos;re looking for a relaxing beach getaway, an adventurous mountain hike, or a cultural city experience, we have something for everyone. Let us inspire your next journey.`;

    const headingChar = splitStringUsingRegex(heading);
    const textChar = splitStringUsingRegex(text);

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

    return (
        <main className="min-h-dvh">
            <div className="pt-12">
                <div className="grid items-center justify-center px-3 pb-3 text-center md:min-h-dvh md:grid-flow-col md:grid-cols-2">
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
                            className="leading-7 md:font-semibold"
                            initial="hidden"
                            variants={containerVariants}
                            animate="visible"
                        >
                            {textChar.map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={charVariants}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.p>

                        <div className="flex w-3/4 flex-col gap-4 pb-6 pt-10 md:flex-row">
                            <Button
                                asChild
                                variant={"outline"}
                                className="mx-auto flex w-full items-center gap-4 rounded-full py-5 font-semibold uppercase tracking-wide ring-1 ring-[#1d3557] md:w-auto"
                            >
                                <Link href="#form">
                                    Book Your destination{" "}
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-foreground">
                                        <IconLuggage />
                                    </span>
                                </Link>
                            </Button>
                            <Button className="group relative mx-auto flex w-full items-center gap-4 overflow-hidden rounded-full bg-[#1d3557] py-6 font-semibold uppercase tracking-wide text-white">
                                <span className="absolute left-4 z-20 group-hover:text-black">
                                    Contact Us Today
                                </span>
                                <div className="absolute inset-y-0 right-1 top-1/2 flex h-[calc(100%-0.5rem)] w-10 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-primary-foreground pl-1 text-foreground transition-all duration-300 ease-in-out group-hover:w-[calc(100%-0.4rem)] group-hover:bg-gray-200">
                                    <span className="absolute right-2 text-lg">
                                        <IconArrowRight />
                                    </span>
                                </div>
                            </Button>
                        </div>
                    </div>
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
