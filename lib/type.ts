import { z } from "zod";

export const sendEmailSchema = z.object({
    from: z.string().min(1, "From location is required"),
    to: z.string().min(1, "To location is required"),
    date: z.string().min(1, "Date is required"),
    passenger: z.string().min(1, "At least one passenger is required"),
});

export type TSendEmailSchema = z.infer<typeof sendEmailSchema>;
