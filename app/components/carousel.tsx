import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { images } from "../lib/carouselImages";
import { AnimatePresence, motion } from "framer-motion";
import { carouselImages } from "../lib/hero-images";

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const carouselRef = useRef(null);
    const interval = 3000;

    /* Create an array of dots with the same length as images */
    const dots = Array.from({ length: images.length }, (_, index) => index);

    /* Function that changes the slide to the next one. */
    const goToSlide = useCallback(
        (index: number) => {
            setCurrentIndex(index);
            if (isTransitioning) return;
            setIsTransitioning(true);
            setCurrentIndex(index);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 500);
        },
        [isTransitioning]
    );

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
    }, [currentIndex, goToNext]);

    useEffect(() => {
        const testimonialRefCurrent = carouselRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove(
                            "opacity-0",
                            "scale-0",
                            "invisible"
                        );
                        entry.target.classList.add("opacity-100", "scale-100");
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        if (testimonialRefCurrent) observer.observe(testimonialRefCurrent);

        return () => {
            if (testimonialRefCurrent)
                observer.unobserve(testimonialRefCurrent);
        };
    }, []);

    return (
        <div
            ref={carouselRef}
            className="relative mt-3 h-full w-full scale-0 transform overflow-hidden rounded-sm bg-blue-200 pb-6 transition duration-300 md:mt-10"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    whileHover={{ scale: 1.05 }}
                    className="bg-blue-200 text-sm font-semibold text-primary"
                >
                    <Image
                        src={carouselImages[currentIndex].src}
                        alt={carouselImages[currentIndex].alt || ""}
                        width={400}
                        height={400}
                        className="h-[13rem] w-full object-cover object-center"
                    />
                    <div className="flex flex-col justify-between px-4 py-2">
                        <h4 className="pb-1">{carouselImages[currentIndex].destination}</h4>
                        <p className="pb-3 font-normal">
                            {carouselImages[currentIndex].description}
                        </p>
                        <>
                            {carouselImages[currentIndex].discountedPrice ? (
                                <span className="flex justify-start gap-4 pr-1 md:justify-between">
                                    <span className="w-fit rounded-md bg-gray-800 px-1 py-0.5 font-normal text-background">
                                        {`$${carouselImages[currentIndex].discountedPrice}`}
                                    </span>
                                    <span className="w-fit rounded-md bg-destructive px-1 py-0.5 font-normal text-background line-through">
                                        {`$${carouselImages[currentIndex].price}`}
                                    </span>
                                </span>
                            ) : (
                                <span className="w-fit rounded-md bg-gray-800 px-1 py-0.5 font-normal text-background">
                                    {`$${carouselImages[currentIndex].price}`}
                                </span>
                            )}
                        </>
                    </div>
                    {/* Dots */}
                    <div className="absolute bottom-2 left-1/2 z-[10] flex -translate-x-1/2 items-center">
                        {dots.map((dot) => (
                            <button
                                key={dot}
                                className={`mx-1 size-2 rounded-full transition-colors duration-300 ${currentIndex === dot ? "scale-150 bg-primary" : "bg-primary/50 hover:bg-primary/75"}`}
                                onClick={() => goToSlide(dot)}
                                aria-label={`(Go to slide) ${currentIndex + 1}`}
                            ></button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Carousel;
