import type { Metadata } from "next";
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
  icons: {
    icon: "/icon.png", // /public path
  },
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
        {session && children}
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

  // return (
  //   <html lang="en">
  //     <body className={inter.className}>{children}</body>
  //   </html>
  // );
}
