"use client";

import BookFlightForm from "./components/book-flight-form";
import ParticleBackground from "./components/particles";

export default function Home() {
    return (
        <main className="relative flex h-dvh items-center justify-center text-center">
            <ParticleBackground />
            <div className="absolute z-20 space-y-6 px-3 text-200">
                <h1 className="text-5xl font-bold">
                    EXPLORE THE WORLD WITH TRAVELAIR
                </h1>

                <p className="font-semibold">
                    Book your flights and tours easily:
                </p>

                <BookFlightForm />
            </div>
        </main>
    );
}
