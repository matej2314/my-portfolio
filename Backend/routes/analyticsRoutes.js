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
            property: 'properties/470992576',
            requestBody: {
                dateRanges: [
                    {
                        startDate: '2024-01-01',
                        endDate: '2024-12-31',
                    },
                ],
                metrics: [
                    { name: "eventCount" },
                    { name: 'totalUsers' },
                    { name: 'averageSessionDuration' },
                    {name: 'pageview'}
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

router.get('/realtime', async (req, res) => {
    try {
        await jwtClient.authorize();
        
       
        const response = await analytics.properties.runRealtimeReport({
            property: 'properties/470992576',
            requestBody: {
                metrics: [{ name: 'activeUsers' }],
                dimensions: [{ name: 'pagePath' }],
            },
            auth: jwtClient,
        });

        res.status(200).json(response.data);
    } catch (error) {
        logger.error('Błąd pobierania danych w czasie rzeczywistym:', error);
        res.status(500).json({ message: 'Błąd pobierania danych w czasie rzeczywistym!' });
    }
});


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
