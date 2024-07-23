"use client";

import { Button } from "@/components/ui/button";
import BookFlightForm from "./components/book-flight-form";
import ParticleBackground from "./components/particles";
import { IconArrowRight } from "@tabler/icons-react";

export default function Home() {
    return (
        <main className="relative h-dvh">
            {/* <ParticleBackground /> */}
            <div className="pt-32">
                <div className="z-20 flex h-full flex-col items-center justify-center gap-8 px-3 text-center md:flex-row">
                    <div className="space-y-8 text-balance">
                        <h1 className="text-4xl font-bold md:text-5xl">
                            EXPLORE THE WORLD WITH TRAVELAIR
                        </h1>
                        <p className="leading-7">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Earum reprehenderit amet repudiandae
                            laudantium officia, suscipit excepturi fugit cum
                            voluptate repellendus? Nulla tempora necessitatibus
                            cumque quas dolor fugit eum illo accusamus?
                        </p>

                        <Button
                            className="mx-auto flex items-center gap-4 font-bold uppercase"
                            // variant="secondary"
                        >
                            Contact Us Today{" "}
                            <span className="bg-primary-foreground text-foreground flex h-8 w-8 items-center justify-center rounded-full">
                                <IconArrowRight />
                            </span>
                        </Button>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center">
                        <p className="mb-2 font-semibold">
                            Book your flights with us today.
                        </p>
                        <BookFlightForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
