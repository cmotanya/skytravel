"use client";

import React from "react";
import Image from "next/image";
import { SocialLinks } from "./lib/socials";
import { ContactInformation } from "./lib/contact-info";
import { motion } from "framer-motion";

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
            className="absolute left-0 right-0 w-full bg-800 p-2 pt-2 font-poppins-regular md:pt-5"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="flex flex-col justify-between gap-2 md:flex-row"
                variants={containerVariants}
            >
                <motion.div
                    className="w-full space-y-6 rounded-md bg-900 p-3 md:w-[45%] md:space-y-12"
                    variants={itemVariants}
                >
                    {/* Logo and description */}
                    <div className="space-y-6 md:space-y-12">
                        <Image
                            src="/images/connex-logo.png"
                            alt="logo image"
                            width={130}
                            height={130}
                        />
                        <motion.p
                            className="text-balance text-base text-400"
                            variants={itemVariants}
                        >
                            Originally founded in 2013, Connex International is
                            one of the largest logistics company in Ambalalo. We
                            serve a wide range of customers from small to
                            mid-sized businesses.
                        </motion.p>
                    </div>

                    {/* Social links */}
                    <motion.div className="space-x-5" variants={itemVariants}>
                        {SocialLinks.map((link, index) => (
                            <motion.button
                                key={index}
                                aria-label={`Visit our ${link.name} page.`}
                                className="rounded-md bg-750 p-1 transition-all duration-300 hover:bg-850"
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
                    className="w-full rounded-md bg-900 p-2 md:w-[35%]"
                    variants={itemVariants}
                >
                    <h3 className="mb-2 mt-2 uppercase text-primary md:mb-4">
                        Our Services
                    </h3>
                </motion.div>

                {/* Contact information */}
                <motion.div
                    className="w-full rounded-md bg-900 p-2 md:w-[40%]"
                    variants={itemVariants}
                >
                    <h3 className="mb-4 mt-2 uppercase text-primary">
                        contact info
                    </h3>
                    <div className="flex flex-col gap-2 md:gap-4">
                        {ContactInformation.map((info, index) => {
                            return (
                                <motion.button
                                    key={index}
                                    className="flex items-center gap-5 rounded-md p-1 text-400 transition-all duration-300 hover:bg-800 hover:text-200"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="">{info.icon}</span>
                                    <span className="text-start text-base">
                                        {info.content}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Subscribe to our newsletter */}
                <motion.div
                    className="w-full rounded-md bg-900 p-2 md:w-[50%]"
                    variants={itemVariants}
                >
                    <h3 className="mb-4 text-primary md:mb-8">
                        Stay upto date with our news and insight.
                    </h3>

                    <form className="flex flex-col">
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="Enter your email address"
                            className="rounded-md bg-800 p-[0.5rem] transition-all duration-300 placeholder:text-base focus-within:ring-2 focus-within:ring-600"
                        />
                        <motion.button
                            type="submit"
                            className="mt-3 w-fit rounded-full bg-accent px-4 py-[0.45rem] text-base font-semibold uppercase text-black transition-all duration-300 hover:bg-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Subscribe
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>

            <motion.div
                className="mb-2 mt-3 flex flex-col-reverse items-center justify-between gap-3 px-2 text-base text-300 md:mt-6 md:flex-row"
                variants={itemVariants}
            >
                <p className="mx-auto w-full text-start leading-6">
                    &copy;{new Date().getFullYear()} Connex International
                    Limited.All rights reserved
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
