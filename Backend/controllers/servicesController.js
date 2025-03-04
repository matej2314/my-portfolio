const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const { v4: uuidv4 } = require('uuid');
const servicesQueries = require('../database/servicesQueries.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

exports.getAllServices = async (req, res) => {

    try {
        const [rows] = await pool.query(servicesQueries.getAllServices);

        if (rows.length <= 0) {
            logger.error('No services found.');
            return res.status(statusCode.NOT_FOUND).json({ message: 'No services found.' });
        };

        return res.status(statusCode.OK).json({
            message: 'Services fetched correctly.',
            services: rows
        });
    } catch (error) {
        logger.error('Failed to fetch services list:', error.message);

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to fetch services list.'
        });
    };
};

exports.addNewService = async (req, res) => {
    const id = uuidv4();
    const service_name = req.body.serviceName;
    const service_description = req.body.serviceDesc;

    if (!service_name || !service_description) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'No required data found.'
        });
    }

    try {
        await pool.query(servicesQueries.addNewService, [id, service_name, service_description]);
        logger.info(`Service ${service_name} added correctly`);
        return res.status(statusCode.OK).json({
            message: `Service ${service_name} added!`,
            serviceId: id,
            serviceName: service_name,
        });

    } catch (error) {
        logger.error(`Failed add service: ${service_name}`);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Failed add service.'
        });
    };
};

exports.editService = async (req, res) => {
    const { serviceId, serviceName, serviceDescription } = req.body;

    if (!serviceName || !serviceDescription || serviceName.trim() == '' || serviceDescription.trim() == '') {
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Enter correct service details.' });
    };

    try {
        const [result] = await pool.query(servicesQueries.editService, [serviceName, serviceDescription, serviceId]);
        logger.info(`Service ${serviceName} edited correctly.`);
        return res.status(statusCode.OK).json({
            message: `Service ${serviceName} edited correctly.`,
            name: serviceName,
            id: serviceId

        });

    } catch (error) {
        logger.error('Failed to update service.', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to update service.'
        });
    };
};

exports.deleteService = async (req, res) => {
    const { serviceId } = req.body;

    if (!serviceId || serviceId === 0) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Enter required service details.'
        });
    }

    try {
        const [result] = await pool.query(servicesQueries.deleteService, [serviceId]);

        if (result.affectedRows === 0) {
            logger.info('Service not found');
            return res.status(statusCode.NOT_FOUND).json({ message: 'Service not found.' });
        };

        return res.status(statusCode.OK).json({
            message: `Service deleted correctly.`,
            serviceId,
        });

    } catch (error) {
        logger.error('Failed to delete service', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to delete service'
        });
    };
};