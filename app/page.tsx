"use client";

import { Button } from "@/components/ui/button";
import BookFlightForm from "./components/book-flight-form";
import { IconArrowRight, IconLuggage } from "@tabler/icons-react";
import Image from "next/image";
import { heroImages } from "./lib/hero-images";
import Link from "next/link";
import { Merienda as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-sans",
});

export default function Home() {
    return (
        <main className="relative min-h-dvh">
            {/* <ParticleBackground /> */}
            <div className="pt-12">
                <div className="z-20 flex flex-col items-center justify-center px-3 text-center md:h-dvh md:flex-row">
                    <div className="flex h-dvh flex-col items-center justify-center space-y-8 text-balance md:h-auto">
                        <h1
                            className={cn(
                                "font-sans text-4xl font-bold md:text-5xl",
                                fontSans.variable
                            )}
                        >
                            EXPLORE THE WORLD WITH TRAVELAIR
                        </h1>
                        <p className="leading-7 md:font-semibold">
                            Explore some of the most beautiful and exotic
                            locations around the world. Whether you&apos;re
                            looking for a relaxing beach getaway, an adventurous
                            mountain hike, or a cultural city experience, we
                            have something for everyone. Let us inspire your
                            next journey.
                        </p>

                        <div className="flex flex-col gap-4 pb-6 md:flex-row">
                            <Button
                                asChild
                                variant={"outline"}
                                className="mx-auto flex w-full items-center gap-4 font-semibold uppercase tracking-wide ring-1 ring-[#1d3557] md:w-auto"
                            >
                                <Link href="#form">
                                    Book Your destination{" "}
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-foreground">
                                        <IconLuggage />
                                    </span>
                                </Link>
                            </Button>
                            <Button className="mx-auto flex w-full items-center gap-4 bg-[#1d3557] font-semibold uppercase tracking-wide md:w-auto">
                                Contact Us Today{" "}
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-foreground">
                                    <IconArrowRight />
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div
                        id="form"
                        className="flex w-full flex-col items-center justify-center"
                    >
                        <p className="mb-2 font-semibold">
                            Book your flights with us today.
                        </p>
                        <BookFlightForm />
                    </div>
                </div>

                <div className="mt-10 space-y-3 bg-[#e9c46a] p-2 md:mt-0">
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
