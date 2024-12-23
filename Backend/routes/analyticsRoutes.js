const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const logger = require('../logger');
const credentials = require('../google/myPortfolio-f6f80beac2cd.json');

// Google Analytics API
const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
const jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    SCOPES,
);

const analytics = google.analyticsdata('v1beta');

const getAnalyticsData = async () => {
    try {
        await jwtClient.authorize();

        // Pobranie danych z GA4
        const res = await analytics.properties.runReport({
            property: 'properties/470992576', // Twój identyfikator właściwości GA4
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
                    { name: 'userEngagementDuration' },
                    { name: 'engaged_time_msec'} // czas zaangażowania użytkownika w milisekundach
                ],
                dimensions: [
                    { name: 'eventName' },    // Nazwa zdarzenia (np. pageview)
                    { name: 'pagePath' },     // Ścieżka URL (dla pageview)
                    { name: 'contentId' },    // Identyfikator elementu (dla click)
                    { name: 'deviceCategory' }, // Kategoria urządzenia
                    { name: 'operatingSystem' }, // System operacyjny
                ],
                dimensionFilter: {
                    filter: {
                        fieldName: 'eventName',
                        inListFilter: {
                            values: ['pageview', 'submit', 'click', 'user_engagement'],  // Tylko wybrane zdarzenia
                        },
                    },
                },
            },
            auth: jwtClient,
        });

        // Zwrócenie wyników
        return res.data;
    } catch (error) {
        logger.error(`Błąd pobierania danych z GA: ${error}`);
        throw error;
    }
};

router.get('/analytics', async (req, res) => {
    try {
        const data = await getAnalyticsData();

        // Przetwarzanie wyników, rozróżnienie typów danych dla różnych zdarzeń
        const processedData = data.rows.map(row => {
            const eventName = row.dimensionValues[0].value; // Nazwa zdarzenia (np. pageview, click, submit)
            const baseData = {
                deviceCategory: row.dimensionValues[3]?.value, // Kategoria urządzenia
                operatingSystem: row.dimensionValues[4]?.value, // System operacyjny
            };

            let additionalData = {};
            if (eventName === 'pageview') {
                additionalData = {
                    pagePath: row.dimensionValues[1]?.value,  // Ścieżka URL
                    eventCount: row.metricValues[0]?.value,   // Liczba odwiedzin
                    totalUsers: row.metricValues[1]?.value,   // Liczba użytkowników
                };
            } else if (eventName === 'submit') {
                additionalData = {
                    eventCount: row.metricValues[0]?.value,   // Liczba submitów
                    totalUsers: row.metricValues[1]?.value,   // Liczba użytkowników
                };
            } else if (eventName === 'click') {
                additionalData = {
                    elementId: row.dimensionValues[2]?.value, // Identyfikator klikniętego elementu
                    eventCount: row.metricValues[0]?.value,   // Liczba kliknięć
                    totalUsers: row.metricValues[1]?.value,   // Liczba użytkowników
                };
            } else if (eventName === 'user_engagement') {
                additionalData = {
                    engagementTime: row.metricValues[5].value,
                }
            }

            return {
                eventName,
                ...baseData,
                ...additionalData,
            };
        });

        // Zwrócenie przetworzonych danych
        return res.status(200).json(processedData);
    } catch (error) {
        logger.error(`Błąd pobierania danych z GA: ${error}`);
        return res.status(500).json({ message: `Błąd pobierania danych Google Analytics: ${error}` });
    }
});

module.exports = router;
