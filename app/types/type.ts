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
        .min(10, "Please enter a valid phone number!")
        .regex(/^\+?\d+$/, "Please enter a valid number!"),
    travelClass: z.enum(["economy", "premiumEconomy", "business", "first"]),
    passengers: z
        .number()
        .refine(
            (val) => val === undefined || val > 0,
            "Number of passengers must be positive"
        ),
});

export type BookFlightSchema = z.infer<typeof bookFlightSchema>;
