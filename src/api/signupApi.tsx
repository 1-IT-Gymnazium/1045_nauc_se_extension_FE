import React, { useEffect } from "react";

interface SignupApiProps
{
    username : string;
    email : string;
    password : string;
}

export const SignupApi: React.FC<SignupApiProps> = ({ username, email, password }) => {
    const addUser = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/signupuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`); // Show error from the backend
                return;
            }

            const data = await response.json();
            alert("User added!");
        } catch (err: any) {
            console.error("Error during signup:", err.message);
            alert(`Error: ${err.message}`);
        }
    };

    useEffect(() => {
        if (username && email && password) {
            addUser();
        }
    }, [username, email, password]);

    return <></>;
};
