import "./globals.css";

export const metadata = {
    title: "Chat App",
    description: "Chat With Everyone",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
