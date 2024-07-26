import Image from "next/image";

interface BlurImageOnLoadProps {
    src: string;
}

export const BlurImageOnLoadDesktop: React.FC<BlurImageOnLoadProps> = ({
    src,
}) => {
    return (
        <>
            <div className="absolute -z-10 h-dvh w-full md:bg-gray-900/50"></div>
            <div className="hidden md:block">
                <Image
                    src={src}
                    alt="image"
                    className="absolute -z-50 block h-full w-full object-cover"
                    layout="fill"
                    sizes="(100vw, 100vh)"
                />
            </div>
        </>
    );
};

export const BlurImageOnLoadMobile: React.FC<BlurImageOnLoadProps> = ({
    src,
}) => {
    return (
        <>
            <div className="absolute -z-10 h-dvh w-full bg-gray-900/70 md:bg-transparent"></div>
            <div className="block md:hidden">
                <Image
                    src={src}
                    alt="image"
                    fill
                    sizes="(100vw, 100vh)"
                    // blurDataURL={blurDataURL}
                    // placeholder="blur"
                    className="absolute -z-50 block h-full w-full object-cover"
                    layout="fill"
                />
            </div>
        </>
    );
};
