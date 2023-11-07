"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Signin from "../signInButton";
import "./page.css";
import { Session } from "next-auth";

export default function SignInPage({ session }: { session: Session | null }) {
  const [formState, setFormState] = useState({
    login: true,
    passwordReset: false,
    email: "",
    password: "",
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const loginAction = () => {
    signIn("credentials", {
      email: formState.email,
      password: formState.password,
    });
  };

  const signupAction = () => {
    signIn("credentials", {
      email: formState.email,
      password: formState.password,
      authFlowType: "register",
    });

    // fetch("/api/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: formState.email,
    //     password: formState.password,
    //   }),
    // }).then(async (res) => {
    //   if (res.status === 200) {
    //     console.log("Account created!");
    //     // setTimeout(() => {
    //     //   router.push("/login");
    //     // }, 2000);
    //   } else {
    //     const { error } = await res.json();
    //     toast.error(error);
    //   }
    // });
  };

  console.log("SignInPage: ", { session });

  return (
    <div className="loginPage">
      <h1 className="title">{formState.login ? "Login" : "Sign Up"}</h1>
      <div className="form">
        <div className="formField">
          <label>Email address</label>
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <div className="formField">
          <label>Password</label>
          <input
            value={formState.password}
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
            type="password"
            placeholder={
              formState.login ? "Enter your password" : "Choose a safe password"
            }
          />
        </div>
        <div className="actions">
          <button
            onClick={formState.login ? () => loginAction() : signupAction}
          >
            {formState.login ? "Login" : "Register"}
          </button>

          <br />
          {formState.login && (
            <div onClick={(e) => setFormState({ ...formState, login: false })}>
              need to create an account? register{" "}
              <span className="link">here</span>
            </div>
          )}
          {!formState.login && (
            <div onClick={(e) => setFormState({ ...formState, login: true })}>
              already have an account? login <span className="link">here</span>
            </div>
          )}

          <br />
          <div>
            Forgot your password? reset{" "}
            <span
              className="link"
              onClick={() =>
                setFormState({ ...formState, passwordReset: true })
              }
            >
              here
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="flex h-screen">
  //     <div className="w-screen h-screen flex flex-col justify-center items-center">
  //       <div className="text-center max-w-screen-sm mb-10">
  //         <h1 className="font-bold text-2xl">Sign in page</h1>
  //         <Signin />
  //       </div>
  //     </div>
  //   </div>
  // );
}
