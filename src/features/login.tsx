import React, { useState } from "react";
import { LoginApi } from "../api/loginApi";

interface LoginPageProps {
    setPage : (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setPage }) =>
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempted, setLoginAttempted] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleLoginClick = () =>
    {
        setLoginAttempted(true);
    };

    return (
        <>
            <form className="mt-8 space-y-4 m-3">
                <div>
                    <label className="text-sm mb-2 block text-center dark:text-white">Username</label>
                    <div className="relative flex items-center">
                        <input
                            name="username"
                            type="text"
                            value={ username }
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full text-sm border px-4 py-3 rounded-md text-base dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            placeholder="Enter user name"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm mb-2 block text-center dark:text-white">Password</label>
                    <div className="relative flex items-center">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            placeholder="Enter password"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#bbb"
                            stroke="#bbb"
                            className="w-4 h-4 absolute right-4 cursor-pointer"
                            viewBox="0 0 128 128"
                            onClick={togglePasswordVisibility}>
                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"/>
                        </svg>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-500"
                        />
                        <label htmlFor="remember-me" className="ml-3 block text-sm dark:text-white">
                            Remember me
                        </label>
                    </div>
                    <div className="text-sm">
                        <a
                            href=""
                            className="text-blue-600 hover:underline font-semibold dark:text-blue-400 no-style">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div className="!mt-8">
                    <button
                        onClick={handleLoginClick}
                        type="button"
                        className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800">
                        Sign in
                    </button>
                </div>
                <p className="text-sm !mt-8 text-center dark:text-white">
                    Don't have an account?
                    <a
                        onClick={() => setPage("/signup")}
                        className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold dark:text-blue-400 no-style">
                        Register here
                    </a>
                </p>
            </form>
            {loginAttempted && username && password && <LoginApi username={username} password={password} />}
        </>
    );
};
