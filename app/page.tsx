// import prisma from "@/lib/prisma";
// import { signIn, signOut } from "next-auth/react";
import { auth } from "./auth";

export default async function HomePage() {
  // const users = await prisma.user.findMany();
  // console.log({ users });

  const session = await auth();
  console.log("HomePage: ", { session });
  // console.log(session?.user);

  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="font-bold text-2xl">
            Home page - {session?.user?.email}
          </h1>
        </div>
      </div>
    </div>
  );
}
