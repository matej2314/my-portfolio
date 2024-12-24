const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const logger = require('../logger');
const credentials = require('../google/myPortfolio-f6f80beac2cd.json');

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
        const authClient = await jwtClient.authorize();

        const response = await analytics.properties.runReport({
            property: 'properties/470992576',
            requestBody: {
                dateRanges: [{ startDate: '2024-01-01', endDate: '2024-12-31' }],
                metrics: [{ name: 'eventCount' }],
                dimensions: [
                    { name: 'eventName' },
                    { name: 'event_params.key' },
                    { name: 'event_params.value' },
                    { name: 'pagePath' }
                ],
                dimensionFilter: {
                    filter: {
                        fieldName: 'eventName',
                        inListFilter: {
                            values: ['submit', 'pageview', 'time_on_page', 'download_cv']
                        }
                    }
                }
            },
            auth: authClient,
        });

        if (!response || !response.data) {
            throw new Error('Brak danych z Google Analytics');
        }

        return response.data;
    } catch (error) {
        logger.error(`Błąd pobierania danych Google Analytics: ${error.message}`, {
            stack: error.stack,
        });
        throw error;
    }
};

router.get('/analytics', async (req, res) => {
    try {
        const data = await getAnalyticsData();
        return res.status(200).json(data);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Błąd pobierania danych z GA: ${error}` });
    }
});

module.exports = router;
