import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { compare, hash } from "bcrypt";

type LoginFnType = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Promise<User | null>;

export const login: LoginFnType = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user && (await compare(password, user.password))) {
    console.log("User Found!");
    // Remove password from being returned to UI
    user.password = "";
    return user;
  } else {
    console.error("User Not Found!");
    return null;
  }
};

export const register: LoginFnType = async ({ email, password }) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    console.error("User already exists!");
    return null;
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    });

    return user;
  }
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        authFlowType: {},
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        console.log("Authorize!");
        console.log({ credentials });

        if (!credentials?.email || !credentials?.password) return null;

        try {
          if (credentials.authFlowType === "register") {
            const user = await register({
              email: credentials.email as string,
              password: credentials.password as string,
            });
            return user;
          }

          const user = await login({
            email: credentials.email as string,
            password: credentials.password as string,
          });
          // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
          return user;
        } catch (e) {
          console.error(e);
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/login-page",
  },
});
