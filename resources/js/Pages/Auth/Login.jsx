import React, { useState } from "react";
import Auth from "../../Layout/Auth";
import { FaTwitter, FaGithub } from "react-icons/fa";

import { Head, usePage, Link, router } from "@inertiajs/react";

//import Inertia adapter

const Login = () => {
    //destruct props "errors"
    const { errors } = usePage().props;

    //define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //method "storeLogin"
    const storeLogin = async (e) => {
        e.preventDefault();

        router.post("/login", {
            //data
            email: email,
            password: password,
        });
    };

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Auth images="https://i.vgy.me/oGkTPm.jpg">
                <form className="w-full" onSubmit={storeLogin}>
                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Login
                    </h1>
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Email
                        </span>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full mt-2 text-sm form-input "
                            placeholder="example@example.com"
                        />
                    </label>
                    <label className="block mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Password
                        </span>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full mt-2 text-sm form-input "
                            placeholder="***************"
                            type="password"
                        />
                    </label>
                    <input
                        className="hover:cursor-pointer text-white block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        type="submit"
                        value="Log in"
                    />
                    {errors.password && (
                        <p className="dark:text-white pt-4 text-center">
                            Wrong password or email
                        </p>
                    )}
                    <hr className="my-8" />
                    <button
                        disabled
                        aria-disabled
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                    >
                        <FaGithub className="w-4 h-4 mr-2" />
                        Github
                    </button>
                    <button
                        disabled
                        aria-disabled
                        className="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                    >
                        <FaTwitter className="w-4 h-4 mr-2" />
                        Twitter
                    </button>
                    <p className="mt-4">
                        <Link
                            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                            href="./forgot-password.html"
                        >
                            Forgot your password?
                        </Link>
                    </p>
                    <p className="mt-1">
                        <Link
                            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                            href="/register"
                        >
                            Create account
                        </Link>
                    </p>
                </form>
            </Auth>
        </>
    );
};

export default Login;
