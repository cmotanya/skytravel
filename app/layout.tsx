import type { Metadata } from "next";
import "./globals.css";
import { Poppins as FontSans } from "next/font/google";
import Header from "./header";
import Footer from "./footer";
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "SkyTicket - Your trusted travel partner",
    description:
        "Book your next flight with TravelAir, a reliable and secure online travel agency with a wide range of destinations and travel options.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
