import type { Metadata } from "next";
import Link from "next/link";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Slide, ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import { auth } from "./auth";
import SignInPage from "./login-page/page";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import "react-toastify/dist/ReactToastify.min.css";
import "./globals.css";

const drawerWidth = 200;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily App",
  description: "Track your billable hours",
  // icons: {
  //   icon: "/icon.png", // /public path
  // },
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
            <Box sx={{ display: "flex" }}>
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                variant="permanent"
                anchor="left"
              >
                <Box sx={{ padding: "18px 8px 18px 40px" }}>
                  {session?.user?.email}
                </Box>
                <Divider />

                <Box
                  sx={{
                    padding: "12px 8px 12px 40px",
                    textDecoration: "none",
                    "& a:hover": {
                      color: "secondary.main",
                    },
                  }}
                >
                  <Link href="/">Tracker</Link>
                </Box>
                <Box
                  sx={{
                    padding: "12px 8px 12px 40px",
                    "& a:hover": {
                      color: "secondary.main",
                    },
                  }}
                >
                  <Link href="/projects">Projects</Link>
                </Box>
                <Box
                  sx={{
                    padding: "12px 8px 12px 40px",
                    "& a:hover": {
                      color: "secondary.main",
                    },
                  }}
                >
                  <Link href="/reports">Reports</Link>
                </Box>

                <Box sx={{ position: "absolute", bottom: "0", width: "100%" }}>
                  <Divider />
                  <Box
                    sx={{
                      padding: "18px 8px 18px 40px",
                      "& a:hover": {
                        color: "secondary.main",
                      },
                    }}
                  >
                    <Link href="/api/auth/signout">Sign out</Link>
                  </Box>
                </Box>
              </Drawer>

              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Box
                  component="main"
                  sx={{ flexGrow: 1, bgcolor: "background.default", p: 0 }}
                >
                  {children}
                </Box>
              </Box>
            </Box>
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

  // return (
  //   <html lang="en">
  //     <body className={inter.className}>{children}</body>
  //   </html>
  // );
}
