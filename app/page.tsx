"use client";

import BookFlightForm from "./components/book-flight-form";
import ParticleBackground from "./components/particles";

export default function Home() {
    return (
        <main className="relative h-dvh">
            <ParticleBackground />
            <div className="z-20 flex h-full flex-col items-center justify-center gap-16 px-3 text-center md:flex-row">
                <div className="">
                    <h1 className="text-5xl font-bold">
                        EXPLORE THE WORLD WITH TRAVELAIR
                    </h1>
                </div>

                <div className="flex w-full flex-col items-center justify-center">
                    <p className="font-semibold">
                        Book your flights and tours easily:
                    </p>

                    <BookFlightForm />
                </div>
            </div>
        </main>
    );
}
