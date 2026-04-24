import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark"> {/* FORCE DARK FOR NOW */}
      <body className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        {children}
      </body>
    </html>
  );
}