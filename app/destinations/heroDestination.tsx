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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface HeroSectionProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    subtitle: string;
    ctaText: string;
    onCtaClick: () => void;
    showSearchForm: boolean;
}

const HeroSection = ({
    imageSrc,
    imageAlt,
    title,
    subtitle,
    ctaText,
    onCtaClick,
    showSearchForm = false,
}: HeroSectionProps) => {
    const [destination, setDestination] = useState("");
    const [tripType, setTripType] = useState("return");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [travelers, setTravelers] = useState("1");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ destination, tripType, startDate, endDate, travelers });
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
                                className="rounded-lg bg-secondary p-4"
                            >
                                <div className="mb-4">
                                    <RadioGroup
                                        defaultValue="return"
                                        onValueChange={setTripType}
                                        className="flex space-x-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="one-way"
                                                id="one-way"
                                            />
                                            <Label htmlFor="one-way">
                                                One Way
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="return"
                                                id="return"
                                            />
                                            <Label htmlFor="return">
                                                Return
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="destination"
                                            className="sr-only"
                                        >
                                            Destination
                                        </Label>
                                        <Input
                                            id="destination"
                                            placeholder="Destination"
                                            value={destination}
                                            onChange={(e) =>
                                                setDestination(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <Label
                                            htmlFor="startDate"
                                            className="sr-only"
                                        >
                                            Departure Date
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

                                    {tripType === "return" && (
                                        <div className="flex-1">
                                            <Label
                                                htmlFor="endDate"
                                                className="sr-only"
                                            >
                                                Return Date
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
                                    )}

                                    <div className="flex-1">
                                        <Label
                                            htmlFor="travelers"
                                            className="sr-only"
                                        >
                                            Travelers
                                        </Label>
                                        <Select
                                            value={travelers}
                                            onValueChange={setTravelers}
                                        >
                                            <SelectTrigger id="travelers">
                                                <SelectValue placeholder="Travelers" />
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

                                    <Button type="submit" className="flex-1">
                                        Search
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
