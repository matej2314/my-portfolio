import { createContext, useEffect, useState } from "react";

export const DataContext = createContext({
    data: {},
    loading: true,
    error: null,
});

export const DataProvider = () => {

    const [fetchedData, setFetchedData] = useState();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('');

                if (!response.ok) {
                    throw new Error('Błąd pobierania danych');
                }
                const data = await response.json();
                setFetchedData(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ fetchedData, isLoading, error }}>
            {children}
        </DataContext.Provider>
    );
};

