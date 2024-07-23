import { Input, InputProps } from "@/components/ui/input";

interface InputSearchProps extends InputProps {
    placeholder: string;
    type: string;
    icon?: React.ReactNode;
}
export function InputFlight({ icon, ...props }: InputSearchProps) {
    return (
        <div className="group relative">
            {icon && (
                <div className="group-hover-focus-within:text-gray-800: pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 group-hover:text-gray-800">
                    {icon}
                </div>
            )}
            <Input
                {...props}
                className="focus-visible:ring-primary focus-visible:ring-offset-0"
            />
        </div>
    );
}
