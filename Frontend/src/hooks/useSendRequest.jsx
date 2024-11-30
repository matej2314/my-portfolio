import { useState } from "react";

export default function useSendRequest() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const sendRequest = async ({ url, data }) => {
        try {
            setIsLoading(true);
            setError(null);  // Resetujemy błąd przed nową próbą
            setResult(null);  // Resetujemy wynik przed nową próbą

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Błąd serwera");
            }

            const data = await response.json();
            setResult(data);
            return data;
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { sendRequest, result, isLoading, error };
}
