"use client";

import React from "react";
import Image from "next/image";
import { SocialLinks } from "./lib/socials";
import { ContactInformation } from "./lib/contact-info";
import { motion } from "framer-motion";
import { InputFlight } from "./components/ui/input-email";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <motion.footer
            className="absolute left-0 right-0 w-full bg-gray-300 p-2 pt-4 md:pt-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="flex flex-col justify-between gap-2 md:flex-row"
                variants={containerVariants}
            >
                <motion.div
                    className="bg-900 w-full space-y-6 rounded-md p-3 md:w-[45%] md:space-y-12"
                    variants={itemVariants}
                >
                    {/* Logo and description */}
                    <div className="space-y-2 md:space-y-6">
                        <span className="text-2xl font-semibold">
                            TravelAir
                        </span>
                        <motion.p
                            className="text-400 text-balance text-sm"
                            variants={itemVariants}
                        >
                            At TravelAir, we are committed to making your travel
                            dreams a reality. Our mission is to offer
                            exceptional customer service and competitive prices,
                            ensuring you have a hassle-free and enjoyable
                            journey.
                        </motion.p>
                    </div>

                    {/* Social links */}
                    <motion.div className="space-x-5" variants={itemVariants}>
                        {SocialLinks.map((link, index) => (
                            <motion.button
                                key={index}
                                aria-label={`Visit our ${link.name} page.`}
                                className="bg-750 hover:bg-850 rounded-md p-1 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.icon}
                            </motion.button>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Navigation links */}
                <motion.div
                    className="bg-900 w-full rounded-md p-2 md:w-[35%]"
                    variants={itemVariants}
                >
                    <div>
                        <h3 className="mb-2 mt-2 text-2xl font-semibold md:mb-4">
                            Information
                        </h3>
                        <div className="flex flex-col gap-1 text-sm">
                            <Link href={"/"}>Home</Link>
                            <Link href={"/"}>Destination</Link>
                            <Link href={"/"}>Packages</Link>
                            <Link href={"/"}>Travel Guide</Link>
                            <Link href={"/"}>Manage Your Booking</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 mt-4 text-2xl font-semibold">
                            Quick Guide
                        </h3>
                        <div className="flex flex-col gap-1 text-sm">
                            <Link href={"/"}>FAQ</Link>
                            <Link href={"/"}>How To</Link>
                            <Link href={"/"}>Features</Link>
                            <Link href={"/"}>Our Community</Link>
                        </div>
                    </div>
                </motion.div>

                {/* Contact information */}
                <motion.div
                    className="bg-900 w-full rounded-md p-2 md:w-[40%]"
                    variants={itemVariants}
                >
                    {/* Subscribe to newsletter */}
                    <motion.div
                        className="bg-900 w-full rounded-md p-2"
                        variants={itemVariants}
                    >
                        <h3 className="mb-4 text-center text-2xl font-semibold uppercase text-primary md:mb-6">
                            Subscribe to our newsletter & get latest news
                        </h3>

                        <form className="flex flex-col gap-3">
                            <InputFlight
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                            <Button type="submit" className="w-fit">
                                Subscribe
                            </Button>
                        </form>
                    </motion.div>
                    <div className="mt-2 flex flex-col">
                        {ContactInformation.map((info, index) => {
                            return (
                                <motion.button
                                    key={index}
                                    className="hover:bg-800 hover:text-200 flex items-center gap-3 rounded-md p-1 text-primary transition-all duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="rounded-full bg-gray-400 p-1">
                                        {info.icon}
                                    </span>
                                    <span className="rounded-md bg-gray-400 p-1 text-start text-sm font-semibold">
                                        {info.content}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="text-300 mb-2 mt-3 flex flex-col-reverse items-center justify-between gap-1 px-2 text-sm font-semibold md:mt-6 md:flex-row"
                variants={itemVariants}
            >
                <p className="w-full text-center leading-6 md:text-start">
                    &copy;{new Date().getFullYear()} TravelAir Limited.All
                    rights reserved
                </p>

                <div className="flex gap-4 whitespace-nowrap md:justify-between">
                    <motion.button whileHover={{ scale: 1.05 }}>
                        Privacy Policy
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }}>
                        Terms and Conditions
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }}>
                        Sitemap
                    </motion.button>
                </div>
            </motion.div>
        </motion.footer>
    );
};

export default Footer;
