import { useState } from "react";

export function useSendRequest() {
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
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Błąd wysyłania danych");
            }

            const result = await response.json();
            setResult(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { sendRequest, result, isLoading, error };
}
