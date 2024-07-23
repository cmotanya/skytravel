import { z } from "zod";

export const sendEmailSchema = z.object({
    from: z.string().min(1, "Location is required!"),

    to: z.string().trim().toLowerCase().min(1, "Location is required!"),

    date: z.string().trim().min(1, "Date is required!"),

    passenger: z
        .string()
        .trim()
        .regex(/^\+?\d+$/, "Please enter a valid number!")
        .min(1, { message: "Number is!" }),
});

export type TSendEmailSchema = z.infer<typeof sendEmailSchema>;
