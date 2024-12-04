import React, { useState } from "react";
import { signupUser } from "../api/signupApi";
import { LoginApi } from "../api/loginApi";
import { useNavigate } from "react-router-dom";

export const SignupPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [level, setLevel] = useState("1");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSignupClick = async () =>
    {
        if (isLoading || isFormSubmitted) return;
        setIsLoading(true);
        setIsFormSubmitted(true);

        const result = await signupUser(username, email, password, level);

        if (result.success) {
            try {
                await LoginApi(username, password);

                const storedValue = JSON.stringify(username);

                if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
                    chrome.storage.local.set({ user: storedValue });
                } else {
                    localStorage.setItem("user", storedValue);
                }

                navigate("/");
                setTimeout(() => {
                  window.location.reload();
                }, 0);
            } catch (err: any) {
                if (err.message === "username") {
                    setErrorMessage("Invalid credentials");
                } else if (err.message === "password") {
                    setErrorMessage("Password not secure enough");
                } else {
                    setErrorMessage("An error occurred, please try again later");
                }

        }
        } else
        {
            setErrorMessage(result.error);
        }

        setIsLoading(false);
        setIsFormSubmitted(false);
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full text-sm border px-4 py-3 rounded-md text-base dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            placeholder="Enter user name"
                        />
                    </div>
                </div>
                <label htmlFor="email" className="text-sm mb-2 block text-center dark:text-white">Email</label>
                <div className="relative flex items-center">
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-sm border px-4 py-3 rounded-md text-base dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        placeholder="Enter email"
                    />
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
                            minLength={6}
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
                <div className="flex justify-center mt-4">
                    <select
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-9/12 py-2 px-4 text-center text-sm font-medium text-gray-500 border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
                        <option value="1">A1 - Beginner</option>
                        <option value="2">A2 - Elementary</option>
                        <option value="3">B1 - Intermediate</option>
                        <option value="4">B2 - Upper Intermediate</option>
                        <option value="5">C1 - Advanced</option>
                        <option value="6">C2 - Proficiency</option>
                    </select>
                </div>
                {errorMessage && <p className="text-red-500 text-sm text-center no-style">{errorMessage}</p>}
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={handleSignupClick}
                        disabled={isLoading || isFormSubmitted}
                        className={`w-full py-3 px-4 text-sm tracking-wide rounded-lg ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} hover:bg-blue-700 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800`}>
                        {isLoading ? "Signing Up..." : "Register"}
                    </button>
                </div>
                <p className="text-sm !mt-4 text-center dark:text-white">
                    Already have an account?
                    <a
                        onClick={() => navigate("/login")}
                        className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold dark:text-blue-400 no-style">
                        Login here
                    </a>
                </p>
            </form>
        </>
    );
};
