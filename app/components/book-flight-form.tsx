import { sendEmailSchema, TSendEmailSchema } from "@/lib/type";
import { InputDate } from "./ui/date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputFlight } from "./ui/input-email";
import { IconMapPin } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const BookFlightForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        reset,
    } = useForm<TSendEmailSchema>({
        resolver: zodResolver(sendEmailSchema),
        defaultValues: {
            from: "",
            to: "",
            date: "",
            passenger: "",
        },
    });

    const onSubmit: SubmitHandler<TSendEmailSchema> = async (data) => {
        const formData = new FormData();
    };

    return (
        <form
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mx-auto max-w-2xl"
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="block">
                    <InputFlight
                        {...register("from")}
                        type="text"
                        placeholder="From"
                        name="from"
                        autoComplete="from"
                        icon={<IconMapPin size={18} />}
                    />
                    {errors.from && (
                        <span
                            role="alert"
                            className="-pt-4 block text-start text-sm font-semibold text-red-500"
                        >{`${errors.from.message}`}</span>
                    )}
                </div>

                <div className="block">
                    <InputFlight
                        {...register("to")}
                        type="text"
                        name="to"
                        placeholder="To"
                        autoComplete="to"
                        icon={<IconMapPin size={18} />}
                    />
                    {errors.to && (
                        <span
                            role="alert"
                            className="-pt-4 block text-start text-sm font-semibold text-red-500"
                        >{`${errors.to.message}`}</span>
                    )}
                </div>

                <InputDate />

                <div className="block">
                    <InputFlight
                        {...register("passenger")}
                        type="number"
                        name="passenger"
                        placeholder="Passengers"
                        className="group"
                    />
                    {errors.passenger && (
                        <span
                            role="alert"
                            className="-pt-4 block text-start text-sm font-semibold text-red-500"
                        >{`${errors.passenger.message}`}</span>
                    )}
                </div>
            </div>

            <Button
                disabled={isSubmitting}
                className={`mt-6 w-full md:w-auto ${Object.keys(errors).length > 0 ? "cursor-not-allowed bg-gray-600" : ""}`}
            >
                Search Flight
            </Button>
        </form>
    );
};

export default BookFlightForm;
