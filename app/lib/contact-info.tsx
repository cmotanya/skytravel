import { IconDeviceMobile, IconMail, IconMap } from "@tabler/icons-react";

export const ContactInformation = [
    {
        icon: <IconMap size={22} />,
        title: "Location",
        content: "Nairobi, Kenya",
        href: "/",
    },
    {
        icon: <IconMail size={22} />,
        title: "Mail Us",
        content: "travelair@gmail.com",
        href: "mailto:info.travelair@gmail.com",
    },
    {
        icon: <IconDeviceMobile size={22} />,
        title: "Call Us",
        content: "(+254) 712909475",
        href: "tel:+254712909475",
    },
];
