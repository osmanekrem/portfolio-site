import React from "react";
import LoginForm from "../components/login-form";
import { signInWithCredentials } from "@/lib/actions/auth";

export default function LoginPage() {
  return <LoginForm onSubmit={signInWithCredentials} />;
}
