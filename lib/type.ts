import { z } from "zod";

export const bookFlightSchema = z.object({
    from: z.string().min(1, "Departure location is required"),
    to: z.string().min(1, "Arrival location is required"),
    departureDate: z.date({
        required_error: "Departure date is required",
    }),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\+?\d+$/, "Please enter a valid number!"),
});

export type BookFlightSchema = z.infer<typeof bookFlightSchema>;
