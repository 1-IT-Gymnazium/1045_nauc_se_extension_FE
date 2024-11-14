import React, { useEffect } from "react";

interface LoginApiProps
{
    username : string;
    password : string;
}

export const LoginApi : React.FC<LoginApiProps> = ({ username, password }) =>
{
    const checkUser = async () =>
    {
        try
        {
            const response = await fetch("http://127.0.0.1:5000/loginuser",
            {
                method : "POST",
                headers :
                {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(
                {
                    name : username,
                    password : password,
                }),
            });

        if (!response.ok)
        {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data = await response.json();
        alert("Login successful!");
        }
        catch (err: any)
        {
            console.error(err.message);
        }
  };

    useEffect(() =>
    {
        if (username && password)
        {
            checkUser();
        }
    }, [username, password]);

  return <></>;
};
