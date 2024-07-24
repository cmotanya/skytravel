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

import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { DatePicker } from "./ui/date-picker";
import { BookFlightSchema, bookFlightSchema } from "../types/type";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const BookFlightForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState<BookFlightSchema | null>(null);
    const [bookingStatus, setBookingStatus] = useState<
        "success" | "idle" | "error"
    >("idle");

    const form = useForm<BookFlightSchema>({
        resolver: zodResolver(bookFlightSchema),
        defaultValues: {
            from: "",
            to: "",
            departureDate: new Date(),
            name: "",
            email: "",
            phone: "",
            travelClass: "economy",
        },
    });

    const onSubmit = (data: BookFlightSchema) => {
        setFormData(data);
        setShowConfirmation(true);
    };

    const handleEdit = () => {
        setFormData(null);
        setShowConfirmation(false);
    };

    const handleConfirm = async () => {
        if (!formData) return;
        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Booking confirm", formData);
            setBookingStatus("success");
            form.reset();
            setShowConfirmation(false);
        } catch (error) {
            console.error("Error booking flight:", error);
            setBookingStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (bookingStatus === "success") {
            toast.success("Flight booked successfully!");
            setBookingStatus("idle");
        } else if (bookingStatus === "error") {
            toast.error("An error occurred while booking the flight.");
            setBookingStatus("idle");
        }
    }, [bookingStatus]);

    return (
        <>
            <Toaster position="top-center" />
            {showConfirmation && formData ? (
                <div className="text-start">
                    <h2 className="my-2 font-semibold uppercase">
                        Confirm Your Booking.
                    </h2>

                    <div className="space-y-2">
                        <p>
                            <strong>From: </strong>
                            {formData.from}
                        </p>
                        <p>
                            <strong>To: </strong>
                            {formData.to}
                        </p>
                        <p>
                            <strong>Departure Date: </strong>
                            {formData.departureDate.toDateString()}
                        </p>
                        <p>
                            <strong>Name: </strong>
                            {formData.name}
                        </p>
                        <p>
                            <strong>Email :</strong>
                            {formData.email}
                        </p>
                        <p>
                            <strong>Phone: </strong>
                            {formData.phone}
                        </p>
                        <p>
                            <strong>Travel Class: </strong>
                            {formData.travelClass}
                        </p>
                    </div>

                    <div className="mt-4 flex gap-6">
                        <Button
                            onClick={handleConfirm}
                            disabled={isSubmitting}
                            className="w-3/4 bg-[#1d3557] font-semibold uppercase md:w-auto"
                        >
                            {isSubmitting ? "Confirming..." : "Confirm Booking"}
                        </Button>

                        <Button
                            onClick={handleEdit}
                            className="w-3/4 md:w-auto"
                            variant={"destructive"}
                        >
                            Edit Details
                        </Button>
                    </div>
                </div>
            ) : (
                <Form {...form}>
                    <p
                        className={`mb-2 font-semibold ${setShowConfirmation} ? 'hidden' ? ''`}
                    >
                        Book your flights with us today.
                    </p>
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
                                            setDate={(date) =>
                                                field.onChange(date)
                                            }
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

                            <FormField
                                control={form.control}
                                name="travelClass"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">
                                            Travel Class
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="focus-visible:ring-offset-0">
                                                    <SelectValue placeholder="Select travel class" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="economy">
                                                    Economy
                                                </SelectItem>
                                                <SelectItem value="premiumEconomy">
                                                    Premium Economy
                                                </SelectItem>
                                                <SelectItem value="business">
                                                    Business
                                                </SelectItem>
                                                <SelectItem value="first">
                                                    First
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full bg-[#e63946] md:w-auto"
                            disabled={isSubmitting}
                        >
                            Review Booking
                        </Button>
                    </form>
                </Form>
            )}
        </>
    );
};

export default BookFlightForm;
