const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const logger = require('../configs/logger.js');
const credentials = require('../google/myPortfolio-f6f80beac2cd.json');
const { getAnalyticsData } = require('../utils/analytics/getAnalyticsData.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
const jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    SCOPES,
);

const analytics = google.analyticsdata('v1beta');

router.get('/analytics', async (req, res) => {
    try {
        const data = await getAnalyticsData(jwtClient, analytics);

        const processedData = data.rows.map(row => {
            const eventName = row.dimensionValues[0].value; // Nazwa zdarzenia (np. pageview, click, submit)
            const eventDate = row.dimensionValues[6]?.value;
            const baseData = {
                date: eventDate,
                deviceCategory: row.dimensionValues[3]?.value, // Kategoria urządzenia
                operatingSystem: row.dimensionValues[4]?.value, // System operacyjny
                country: row.dimensionValues[7]?.value,
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

        return res.status(statusCode.OK).json(processedData);
    } catch (error) {
        logger.error(`Błąd pobierania danych z GA: ${error}`);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: `Błąd pobierania danych Google Analytics: ${error}`
        });
    }
});

module.exports = router;
