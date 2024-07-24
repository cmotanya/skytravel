import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { IconPlane, IconMail, IconPhone, IconUser } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { toast, Toaster } from "sonner";
import { DatePicker } from "./ui/date-picker";
import { BookFlightSchema, bookFlightSchema } from "../types/type";

const BookFlightForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<BookFlightSchema>({
        resolver: zodResolver(bookFlightSchema),
        defaultValues: {
            from: "",
            to: "",
            departureDate: new Date(),
            name: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = async (data: BookFlightSchema) => {
        setIsSubmitting(true);
        try {
            console.log(data);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            form.reset();
            toast.success("Flight booked successfully!");
        } catch (error) {
            console.error("Error booking flight:", error);
            toast.error("An error occurred while booking the flight.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto w-full md:w-[60%]"
                >
                    <div className="grid grid-cols-1 gap-2">
                        <FormField
                            control={form.control}
                            name="from"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        From
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <IconPlane
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                size={18}
                                            />
                                            <Input
                                                className="pl-10 focus-visible:ring-offset-0"
                                                placeholder="Departure Location"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="ml-1 block text-start" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="to"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        To
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <IconPlane
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                size={18}
                                            />
                                            <Input
                                                className="pl-10 focus-visible:ring-offset-0"
                                                placeholder="Arrival Location"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="ml-1 block text-start" />
                                </FormItem>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="departureDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="sr-only">
                                        Departure Date
                                    </FormLabel>
                                    <DatePicker
                                        date={field.value}
                                        setDate={(date) => field.onChange(date)}
                                    />
                                    <FormMessage className="ml-1 block text-start" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <IconUser
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                size={18}
                                            />
                                            <Input
                                                {...field}
                                                className="pl-10 focus-visible:ring-offset-0"
                                                placeholder="Name"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="ml-1 block text-start" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <IconMail
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                size={18}
                                            />
                                            <Input
                                                className="pl-10 focus-visible:ring-offset-0"
                                                placeholder="Email"
                                                type="email"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="ml-1 block text-start" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Phone
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <IconPhone
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                size={18}
                                            />
                                            <Input
                                                className="pl-10 focus-visible:ring-offset-0"
                                                placeholder="Phone Number"
                                                type="tel"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="ml-1 block text-start" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full font-semibold md:w-auto"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Booking..." : "Book Flight"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default BookFlightForm;
