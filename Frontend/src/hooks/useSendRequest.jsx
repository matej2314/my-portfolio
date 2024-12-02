import { useState } from "react";

export default function useSendRequest() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const sendRequest = async ({ url, data, method }) => {
        try {
            setIsLoading(true);
            setError(null);
            setResult(null);
            const response = await fetch(url, {
                method: method ? method : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: method !== "GET" ? JSON.stringify(data) : null,
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Błąd serwera");
            }

            const fetchedData = await response.json();
            setResult(fetchedData);

            return fetchedData;
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { sendRequest, result, isLoading, error };
}
