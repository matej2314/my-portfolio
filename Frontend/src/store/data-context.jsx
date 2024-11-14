import { createContext, useEffect, useState } from "react";
import {backendUrl} from '../../url.js';

export const DataContext = createContext({
    data: {},
    loading: true,
    error: null,
});

const DataProvider = ({children}) => {

    const [fetchedData, setFetchedData] = useState({
        data: []
    });

    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();


    useEffect(() => {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const response = await fetch(backendUrl);
    
                    if (!response.ok) {
                        throw new Error('Błąd pobierania danych');
                        
                    }
                    const data = await response.json();
                    setFetchedData((prevdata) => data);
    
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

export default DataProvider;