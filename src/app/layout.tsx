import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

import { Source_Code_Pro, Nunito_Sans, Fustat } from "next/font/google";
import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'], // Add subsets as needed
  weight: ['400', '700'], // Specify weights
  display: 'swap', // Set the display behavior
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
});

const fustat = Fustat({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
    title: "ether.net",
    description: "ether.net, a social network about cables",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={`${fustat.variable} antialiased`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                    <div className="min-h-screen">
                        <Navbar />

                        <main className="py-8">
                            {/* container to center the content */}
                            <div className="max-w-7xl mx-auto px-4">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    <div className="hidden lg:block lg:col-span-3">
                                        <Sidebar />
                                    </div>
                                    <div className="lg:col-span-9">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
