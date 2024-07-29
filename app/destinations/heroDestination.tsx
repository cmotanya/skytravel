"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface IHeroDestinationProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    subtitle: string;
    ctaText: string;
    onCtaClick: () => void;
    showSearchForm?: boolean;
}

const HeroSection = ({
    imageSrc,
    imageAlt,
    title,
    subtitle,
    ctaText,
    onCtaClick,
    showSearchForm = false,
}: IHeroDestinationProps) => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [travelers, setTravelers] = useState("1");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log({ destination, startDate, endDate, travelers });
    };

    return (
        <section className="relative w-full bg-background">
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="flex flex-col items-center md:flex-row">
                    {/* Image */}
                    <div className="mb-8 w-full md:mb-0 md:w-1/2">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            width={600}
                            height={400}
                            className="h-[300px] w-full rounded-lg object-cover md:h-[400px]"
                        />
                    </div>

                    {/* Text, CTA, and Search Form */}
                    <div className="w-full md:w-1/2 md:pl-12">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                            {title}
                        </h1>
                        <p className="mb-6 text-xl">{subtitle}</p>
                        <Button
                            onClick={onCtaClick}
                            className="mb-8 px-8 py-3 text-lg"
                        >
                            {ctaText}
                        </Button>

                        {showSearchForm && (
                            <form
                                onSubmit={handleSearch}
                                className="space-y-4 rounded-lg bg-secondary p-4"
                            >
                                <div>
                                    <Label htmlFor="destination">
                                        Destination
                                    </Label>
                                    <Input
                                        id="destination"
                                        placeholder="Where do you want to go?"
                                        value={destination}
                                        onChange={(e) =>
                                            setDestination(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <Label htmlFor="startDate">
                                            Start Date
                                        </Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={startDate}
                                            onChange={(e) =>
                                                setStartDate(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Label htmlFor="endDate">
                                            End Date
                                        </Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            value={endDate}
                                            onChange={(e) =>
                                                setEndDate(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="travelers">Travelers</Label>
                                    <Select
                                        value={travelers}
                                        onValueChange={setTravelers}
                                    >
                                        <SelectTrigger id="travelers">
                                            <SelectValue placeholder="Select number of travelers" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1, 2, 3, 4, 5, "6+"].map(
                                                (num) => (
                                                    <SelectItem
                                                        key={num}
                                                        value={num.toString()}
                                                    >
                                                        {num}{" "}
                                                        {num === 1
                                                            ? "Traveler"
                                                            : "Travelers"}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button type="submit" className="w-full">
                                    Search
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
