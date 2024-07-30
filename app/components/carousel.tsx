import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { images } from "../lib/carouselImages";

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
            className="mt-20 h-full w-full scale-0 transform overflow-hidden transition duration-300 md:mt-10"
        >
            <Suspense>
                {images.map((item, index) => (
                    /* Slides */
                    <div
                        key={item.src}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentIndex
                                ? "translate-x-0 opacity-100"
                                : index < currentIndex
                                  ? "-translate-x-full opacity-0"
                                  : "translate-x-full opacity-0"
                        }`}
                    >
                        <div className="relative h-full w-full">
                            <Image
                                src={item.src}
                                alt=""
                                priority={index === currentIndex ? true : false}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="rounded-md object-cover object-center"
                            />

                            {/* Dots */}
                            <div className="absolute bottom-2 left-1/2 z-[10] flex -translate-x-1/2 items-center">
                                {dots.map((dot) => (
                                    <button
                                        key={dot}
                                        className={`mx-1 size-4 rounded-full transition-colors duration-300 ${currentIndex === dot ? "scale-125 bg-primary" : "bg-primary/50 hover:bg-primary/75"}`}
                                        onClick={() => goToSlide(dot)}
                                        aria-label={`(Go to slide) ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Suspense>
        </div>
    );
};

export default Carousel;
