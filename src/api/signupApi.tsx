export const signupUser = async (username: string, email: string, password: string, level: string) =>
{
    try
    {
        const response = await fetch("http://127.0.0.1:5000/signupuser",
        {
            method : "POST",
            headers :
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: username, email, password, level }),
        });

        if (response.ok)
        {
            return { success: true };
        }
        else
        {
            const data = await response.json();
            return { success: false, error: data.error || "Signup failed" };
        }
    }
    catch (error)
    {
        return { success: false, error: "Error" };
    }
};

