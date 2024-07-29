"use client";

import React from "react";
import HeroSection from "./heroDestination";

const Destinations = () => {
    return (
        <main>
            <HeroSection
                imageSrc="https://images.unsplash.com/photo-1496644256288-2bb0a65f32f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imageAlt="Beautiful travel destination"
                title="Explore the World with TravelAir"
                subtitle="Discover amazing destinations and create unforgettable memories"
                ctaText="Start Your Journey"
                onCtaClick={() => {
                    /* Handle CTA click */
                }}
                showSearchForm={true}
            />
            {/* Rest of your page content */}
        </main>
    );
};

export default Destinations;
