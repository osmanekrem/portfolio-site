import React, {Suspense} from "react";
import LoginForm from "../components/login-form";
import {signInWithCredentials} from "@/lib/actions/auth";

export default function LoginPage() {

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-4xl font-bold mb-6">Login</h1>
            <Suspense fallback={null}>
                <LoginForm onSubmit={signInWithCredentials}/>
            </Suspense>
        </div>
    )
}
