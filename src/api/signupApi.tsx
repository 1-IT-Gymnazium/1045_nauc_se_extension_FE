import React, { useState } from "react";

interface SignupApiProps {
  username: string;
  email: string;
  password: string;
  level: string;  // Keeping this as string to match form input type
}

export const SignupApi: React.FC<SignupApiProps> = ({ username, email, password, level }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/signupuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password, level }),
      });

      if (response.ok) {
        setSuccess(true);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    }
  };

  React.useEffect(() => {
    if (username && email && password && level) {
      handleSignup();
    }
  }, [username, email, password, level]);

  return (
    <div>
      {success && <p className="text-green-600">Signup successful!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};
