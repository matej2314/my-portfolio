import { createContext, useEffect, useState } from "react";
import { dataCollectionUrl } from '../url.js';

export const DataContext = createContext({
    data: {},
    isLoading: true,
    error: null,
    refreshData: () => { },
});

const DataProvider = ({ children }) => {
    const [fetchedData, setFetchedData] = useState({ data: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(dataCollectionUrl);

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

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = () => {
        fetchData();
    };

    return (
        <DataContext.Provider value={{ fetchedData, isLoading, error, refreshData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
