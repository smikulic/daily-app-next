import type { Metadata } from "next";
import Link from "next/link";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Slide, ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import { auth } from "./auth";
import SignInPage from "./login-page/page";
import "react-toastify/dist/ReactToastify.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily App",
  description: "Track your billable hours",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log("RootLayout: ", { session });

  return (
    <html lang="en">
      <body className={inter.className}>
        {session === null && <SignInPage session={session} />}

        {session && (
          <ThemeRegistry>
            <div className="flex">
              <div className="relative flex flex-col h-screen w-60 bg-stone-100">
                <div className="h-16 flex items-center px-6 py-4 font-medium text-stone-900 bg-stone-100">
                  {/* <svg
                    className="w-5 h-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg> */}
                  <div className="truncate w-32">{session?.user?.email}</div>
                </div>

                <hr className="border-stone-50" />

                <div className="flex items-center px-6 py-4 font-medium text-stone-900 bg-stone-100 hover:bg-stone-300 hover:bg-opacity-10 hover:text-violet-500 cursor-pointer">
                  <svg
                    className="w-5 h-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <Link href="/">Tracker</Link>
                </div>

                <div className="flex items-center px-6 py-4 font-medium text-stone-900 bg-stone-100 hover:bg-stone-300 hover:bg-opacity-10 hover:text-violet-500 cursor-pointer">
                  <svg
                    className="w-5 h-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                  <Link href="/projects">Projects</Link>
                </div>

                <div className="flex items-center px-6 py-4 font-medium text-stone-900 bg-stone-100 hover:bg-stone-300 hover:bg-opacity-10 hover:text-violet-500 cursor-pointer">
                  <svg
                    className="w-5 h-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                  <Link href="/reports">Reports</Link>
                </div>

                <div className="absolute bottom-0 w-full flex items-center px-6 py-4 font-medium text-stone-900 bg-stone-100 hover:bg-stone-300 hover:bg-opacity-10 hover:text-violet-500 cursor-pointer">
                  <svg
                    className="w-5 h-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  <Link href="/api/auth/signout">Sign out</Link>
                </div>
              </div>

              <div className="flex flex-col items-center w-full bg-stone-50">{children}</div>
            </div>
          </ThemeRegistry>
        )}
        <ToastContainer
          transition={Slide}
          position="bottom-center"
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          closeButton={false}
          icon={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </body>
    </html>
  );
}
