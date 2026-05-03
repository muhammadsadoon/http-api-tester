import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import { theme } from "./them";
import { TabProvider } from "./context/tab-context";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "API Platform | Professional REST API Client & HTTP Tester",
  description: "The ultimate API Platform for developers. Test REST APIs, build HTTP requests, manage environments, and organize collections with our fast, secure, and beautiful online HTTP client. Featuring visual HTML response preview and dark mode.",
  keywords: "API Testing, HTTP Client, REST API, API Debugging, Postman Alternative, Web API, API Developer Tools, Online API Tester",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
      </head>
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        <MantineProvider theme={theme} defaultColorScheme="light">
          <TabProvider>
            {children}
          </TabProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
