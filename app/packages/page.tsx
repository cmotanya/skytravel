"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { images } from "../lib/carouselImages";

const Carousel = () => {
    const testimonialRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const interval = 3000;

    /* Function that changes the slide to the next one. */
    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    /* Automatically change the slide every 3 seconds */
    useEffect(() => {
        const timer = setInterval(() => {
            goToNext();
        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, goToNext, interval]);

    useEffect(() => {
        const testimonialRefCurrent = testimonialRef.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove(
                        "opacity-0",
                        "scale-0",
                        "invisible"
                    );
                    entry.target.classList.add("scale-100");
                }
            });
        });

        if (testimonialRefCurrent) observer.observe(testimonialRefCurrent);

        return () => {
            if (testimonialRefCurrent)
                observer.unobserve(testimonialRefCurrent);
        };
    }, []);

    return (
        <>
            {" "}
            {/* <div className="absolute -z-10 h-dvh w-full bg-gray-900/70 md:bg-transparent"></div> */}
            <div
                ref={testimonialRef}
                className="absolute -z-50 block h-full w-full scale-0 transform overflow-hidden transition duration-300 md:hidden"
            >
                <Suspense>
                    {images.map((item, index) => (
                        /* Slides */
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentIndex
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                            {/* Testimonial-content */}
                            <Image
                                src={item.src}
                                alt=""
                                priority
                                fill
                                sizes="(100vw, 100vh)"
                                className="object-cover object-center"
                            />
                        </div>
                    ))}
                </Suspense>
            </div>
        </>
    );
};

export default Carousel;
