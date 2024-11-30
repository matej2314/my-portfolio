import { useState } from "react";

export default function useSendRequest() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const sendRequest = async ({ url, data }) => {
        try {
            setIsLoading(true);
            setError(null);
            setResult(null);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Błąd serwera");
            }

            const userData = await response.json();
            setResult(userData);

            return userData;
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { sendRequest, result, isLoading, error };
}
