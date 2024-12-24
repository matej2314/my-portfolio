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

// Funkcja do pobierania danych z Google Analytics
const getAnalyticsData = async () => {
    try {
        // Autoryzacja
        await jwtClient.authorize(); // JWT client authorization

        // Wywołanie API Google Analytics Data
        const res = await analytics.properties.runReport({
            property: 'properties/470992576',  // Podaj właściwy propertyId
            requestBody: {
                dateRanges: [
                    {
                        startDate: '2024-01-01',
                        endDate: '2024-12-31',
                    },
                ],
                metrics: [
                    { name: "eventCount" },
                ],
                dimensions: [
                    { name: 'eventName' },
                    { name: 'pagePath' },
                ],
                dimensionFilter: {
                    filter: {
                        fieldName: 'eventName',
                        inListFilter: {
                            values: ["submit", "pageview", "time_on_page", "download_cv"],
                        },
                    },
                },
            },
            auth: jwtClient,
        });

        return res.data;
    } catch (error) {
        logger.error(`Błąd pobierania danych z GA: ${error}`);
        throw error;
    }
};

// Endpoint do zwracania danych z GA
router.get('/analytics', async (req, res) => {
    try {
        const data = await getAnalyticsData();
        return res.status(200).json(data);
    } catch (error) {
        logger.error(`Błąd pobierania danych z GA: ${error}`);
        return res.status(500).json({ message: 'Błąd pobierania danych Google Analytics!' });
    }
});

module.exports = router;
