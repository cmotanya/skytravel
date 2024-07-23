import React from "react";

interface InputSearchProps {
    placeholder: string;
    type: string;
    value: string;
    icon?: React.ReactNode;
}

const InputSearch = ({ type, placeholder, value, icon }: InputSearchProps) => {
    return (
        <div className="relative">
            {icon && (
                <div className="pointer-events-none absolute inset-y-0 right-5 text-500 flex items-center">
                    {icon}
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                className={`rounded-lg bg-750 p-[0.65rem] placeholder-600 ring-2 ring-input focus-within:outline-none w-full focus-within:ring-2 focus-within:ring-600 focus-within:transition-colors ${icon ? "pr-10" : ""}`}
            />
        </div>
    );
};
export default InputSearch;
