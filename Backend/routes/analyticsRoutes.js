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
                    { name: 'engagementRate' },
                ],
                dimensions: [
                    { name: 'eventName' },    // Nazwa zdarzenia (np. pageview)
                    { name: 'pagePath' },     // Ścieżka URL (dla pageview)
                    { name: 'contentId' },    // Identyfikator elementu (dla click)
                    { name: 'deviceCategory' }, // Kategoria urządzenia
                    { name: 'operatingSystem' }, // System operacyjny
                    {name: 'pageReferrer'},
                ],
            },
            auth: jwtClient,
        });

        return res.data;
    } catch (error) {
        logger.error(`Błąd pobierania danych z GA: ${error}`);
        throw error;
    }
};

router.get('/analytics', async (req, res) => {
    try {
        const data = await getAnalyticsData();

        const processedData = data.rows.map(row => {
            const eventName = row.dimensionValues[0].value; // Nazwa zdarzenia (np. pageview, click, submit)
            const baseData = {
                deviceCategory: row.dimensionValues[3]?.value, // Kategoria urządzenia
                operatingSystem: row.dimensionValues[4]?.value, // System operacyjny
            };

            let additionalData = {};
            if (eventName === 'page_view') {
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
                    engagementRate: row.metricValues[3]?.value,
                }
            } else if (eventName === 'scroll_portfolio') {
                additionalData = {
                    eventCount: row.dimensionValues[0]?.value,
                    pagePath: row.dimensionValues[1]?.value,
               }
            } else if (eventName === 'first_visit') {
                additionalData = {
                    eventCount: row.metricValues[0]?.value,  // Liczba zdarzeń first_visit
                    totalUsers: row.metricValues[1]?.value,  // Liczba użytkowników
                    pagePath: row.dimensionValues[1]?.value, // Pierwsza ścieżka odwiedzin
                    pageReferrer: row.dimensionValues[2]?.value || 'direct', // URL strony odsyłającej lub 'direct'
                };
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
