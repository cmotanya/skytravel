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
import { delay, motion, stagger } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const BookFlightForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState<BookFlightSchema | null>(null);
    const [tripType, setTripType] = useState("return");
    const [bookingStatus, setBookingStatus] = useState<
        "success" | "idle" | "error"
    >("idle");

    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const errorMessageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    };

    const confirmContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,

            transition: {
                type: "spring",
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };
    const buttonVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: [0.43, 0.13, 0.23, 0.96],
            transition: {
                type: "spring",
                damping: 8,
                stiffness: 300,
                delay: 0.5,
            },
        },
    };

    const confirmButtonVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: [0.43, 0.13, 0.23, 0.96],
            transition: {
                delay: 2.2,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    };

    const form = useForm<BookFlightSchema>({
        resolver: zodResolver(bookFlightSchema),
        defaultValues: {
            from: "",
            to: "",
            departureDate: new Date(),
            name: "",
            email: "",
            phone: "",
            passengers: 1,
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
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={confirmContainerVariants}
                    className="my-6 text-start"
                >
                    <h2 className="mx-auto my-2 w-fit rounded-md bg-blue-100 p-1 text-base text-blue-800">
                        Confirm Your Booking
                    </h2>

                    <div className="space-y-2 rounded-lg bg-secondary p-4 shadow-md">
                        {[
                            { label: "From", value: formData.from },
                            { label: "To", value: formData.to },
                            {
                                label: "Departure Date",
                                value: formData.departureDate,
                            },
                            { label: "Name", value: formData.name },
                            { label: "Email", value: formData.email },
                            { label: "Phone", value: formData.phone },
                            { label: "Passengers", value: formData.passengers },
                            {
                                label: "Travel Class",
                                value: formData.travelClass,
                            },
                        ].map((item, index) => (
                            <motion.p key={index} variants={childVariants}>
                                <span className="font-semibold">
                                    {item.label}
                                </span>{" "}
                                :{" "}
                                {item.value instanceof Date
                                    ? item.value.toLocaleDateString()
                                    : item.value}
                            </motion.p>
                        ))}
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={confirmButtonVariants}
                        className="mt-4 flex w-full gap-4 sm:w-[20rem]"
                    >
                        <Button
                            onClick={handleConfirm}
                            disabled={isSubmitting}
                            className="flex-1 bg-green-500 font-semibold text-white hover:bg-green-600"
                        >
                            {isSubmitting ? "Confirming..." : "Confirm Booking"}
                        </Button>

                        <Button
                            onClick={handleEdit}
                            className="flex-1 bg-purple-500 text-white hover:bg-purple-600"
                            // variant={"destructive"}
                        >
                            Edit Details
                        </Button>
                    </motion.div>
                </motion.div>
            ) : (
                <Form {...form}>
                    <p
                        className={`mb-3 mt-3 rounded-md bg-blue-100 p-1 text-blue-800 md:mt-2 ${setShowConfirmation} ? 'hidden' ? ''`}
                    >
                        Book your flights with us today.
                    </p>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mx-auto w-full rounded-lg bg-secondary p-6 md:shadow-md"
                    >
                        <div className="mb-4">
                            <RadioGroup
                                defaultValue="return"
                                onValueChange={setTripType}
                                className="flex space-x-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="one-way"
                                        id="one-way"
                                    />
                                    <Label htmlFor="one-way">One Way</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="return"
                                        id="return"
                                    />
                                    <Label htmlFor="return">Return</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={formVariants}
                            className="grid grid-cols-1 gap-2 md:grid-cols-2"
                        >
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
                                                    className="border-gray-300 bg-gray-50 pl-10 text-gray-800 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
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
                                                    className="border-gray-300 bg-gray-50 pl-10 text-gray-800 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
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
                                                    className="border-gray-300 bg-gray-50 pl-10 text-gray-800 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
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
                                                    className="border-gray-300 bg-gray-50 pl-10 text-gray-800 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
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
                                                    className="border-gray-300 bg-gray-50 pl-10 text-gray-800 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
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
                                name="passengers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">
                                            Passengers
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <IconUser
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                    size={18}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Passengers"
                                                    className="border-gray-300 bg-gray-50 pl-10 text-gray-800 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
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
                                                <SelectTrigger className="border-gray-300 bg-gray-50 pl-10 text-gray-800 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0">
                                                    <SelectValue placeholder="Select travel class" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-gray-50 hover:text-gray-50 focus-visible:ring-offset-0">
                                                <SelectItem
                                                    className="text-gray-800"
                                                    value="economy"
                                                >
                                                    Economy
                                                </SelectItem>
                                                <SelectItem
                                                    value="premiumEconomy"
                                                    className="text-gray-800"
                                                >
                                                    Premium Economy
                                                </SelectItem>
                                                <SelectItem
                                                    value="business"
                                                    className="text-gray-800"
                                                >
                                                    Business
                                                </SelectItem>
                                                <SelectItem
                                                    value="first"
                                                    className="text-gray-800"
                                                >
                                                    First
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={buttonVariants}
                        >
                            <Button
                                type="submit"
                                className="mb-6 mt-4 w-full bg-[#e63946] hover:bg-[#e63946]/80 disabled:opacity-50 md:mb-0 md:w-auto"
                                disabled={isSubmitting}
                            >
                                Review Booking
                            </Button>
                        </motion.div>
                    </form>
                </Form>
            )}
        </>
    );
};

export default BookFlightForm;
