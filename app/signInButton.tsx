"use client";

import { signIn, signOut } from "next-auth/react";

export default function Signin() {
  return <button onClick={() => signIn("credentials")}>Sign in</button>;
}
