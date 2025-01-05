const getAnalyticsData = async (jwtClient, analytics) => {
    try {
        await jwtClient.authorize();

        const res = await analytics.properties.runReport({
            property: 'properties/470992576', 
            requestBody: {
                dateRanges: [
                    {
                        startDate: '2024-01-01',
                        endDate: '2024-12-31',
                    },
                ],
                metrics: [
                    { name: 'eventCount' },  // Liczba wystąpień zdarzeń
                    { name: 'totalUsers' },  // Całkowita liczba użytkowników
                    { name: 'averageSessionDuration' }, // Średni czas sesji
                    { name: 'engagementRate' },
                ],
                dimensions: [
                    { name: 'eventName' },    // Nazwa zdarzenia (np. pageview)
                    { name: 'pagePath' },     // Ścieżka URL (dla pageview)
                    { name: 'contentId' },    // Identyfikator elementu (dla click)
                    { name: 'deviceCategory' }, // Kategoria urządzenia
                    { name: 'operatingSystem' }, // System operacyjny
                    { name: 'pageReferrer' },
                    { name: 'date' },
                    {name: 'country'}
                ],
                // limit: 30,
            },
            auth: jwtClient,
        });
        return res.data;
    } catch (error) {
        logger.error(`Błąd pobierania danych z GA: ${error}`);
        throw error;
    }
};

module.exports = { getAnalyticsData };