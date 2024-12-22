import { useState } from "react";

export default function useSendRequest() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const sendRequest = async ({ url, data, method = "POST", header }) => {
        try {
            setIsLoading(true);
            setError(null);
            setResult(null);

            const requestOptions = {
                method,
                credentials: "include",
            };

            if (method !== "GET") {
                if (data instanceof FormData) {
                    requestOptions.body = data;
                } else {

                    requestOptions.headers = {
                        'Content-Type': 'application/json',
                    };
                    requestOptions.body = JSON.stringify(data);
                }
            }

            if (header) {
                requestOptions.headers = { ...requestOptions.headers, ...header };
            }

            const response = await fetch(url, requestOptions);

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
