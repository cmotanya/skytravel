import { IconDeviceMobile, IconMail, IconMap } from "@tabler/icons-react";

export const ContactInformation = [
    {
        icon: <IconMap size={30} />,
        title: "Location",
        content: "2nd Floor Jubilee Arcade Moi Avenue Mombasa",
        href: "/",
    },
    {
        icon: <IconMail size={30} />,
        title: "Mail Us",
        content: "info.connexinternational@gmail.com",
        href: "mailto:info.connexinternational@gmail.com",
    },
    {
        icon: <IconDeviceMobile size={30} />,
        title: "Call Us",
        content: "(+254) 72222222",
        href: "tel:+25472222222",
    },
];
