const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const { v4: uuidv4 } = require('uuid');
const servicesQueries = require('../database/servicesQueries.js');

exports.getAllServices = async (req, res) => {
    
    try {
        const [rows] = await pool.query(servicesQueries.getAllServices);

        if (rows.length <= 0) {
            logger.error('Brak usług w bazie danych');
            return res.status(404).json({ message: 'Brak usług w bazie' });
        };

        return res.status(200).json({ message: 'Usługi pobrane poprawnie', services: rows });
    } catch (error) {
        logger.error('Nie udało się pobrać listy usług', error.message);

        return res.status(500).json({ message: 'Nie udało się pobrać listy usług' });
    };
};

exports.addNewService = async (req, res) => {
    const id = uuidv4();
    const service_name = req.body.serviceName;
    const service_description = req.body.serviceDesc;

    if (!service_name || !service_description) {
        return res.status(400).json({ message: 'Brak wymaganych danych do dodania nowej usługi' });
    }

    try {
        await pool.query(servicesQueries.addNewService, [id, service_name, service_description]);
        logger.info(`Usługa ${service_name} dodana pomyślnie`);
        return res.status(200).json({
            message: `Usługa ${service_name} dodana!`,
            serviceId: id,
            serviceName: service_name,
        });

    } catch (error) {
        logger.error(`Nie udało się dodać usługi ${service_name}`);
        return res.status(500).json({ message: 'Nie udało się dodać nowej usługi' });
    };
};

exports.editService = async (req, res) => {
    const { serviceId, serviceName, serviceDescription } = req.body;

    if (!serviceName || !serviceDescription || serviceName.trim() == '' || serviceDescription.trim() == '') {
        return res.status(400).json({ message: 'Brak danych do edycji usługi' });
    };

    try {
        const [result] = await pool.query(servicesQueries.editService, [serviceName, serviceDescription, serviceId]);
        logger.info(`Usługa ${serviceName} edytowana.`);
        return res.status(200).json({
            message: `Usługa ${serviceName} edytowana poprawnie.`,
            name: serviceName,
            id: serviceId

        });

    } catch (error) {
        logger.error('Nie udało się zaktualizować usługi', error.message);
        return res.status(500).json({ message: 'Nie udało się zaktualizować usługi' });
    };
};

exports.deleteService = async (req, res) => {
    const { serviceId } = req.body;

    if (!serviceId || serviceId === 0) {
        return res.status(400).json({ message: 'Brak wymaganych danych' });
    }

    try {
        const [result] = await pool.query(servicesQueries.deleteService, [serviceId]);

        if (result.affectedRows === 0) {
            logger.info('Usługa nie znaleziona');
            return res.status(404).json({ message: 'Usługa nie znaleziona' });
        };

        return res.status(200).json({
            message: `Usługa usunięta poprawnie`,
            serviceId,
        });

    } catch (error) {
        logger.error('Nie udało się usunąć usługi', error.message);
        return res.status(500).json({ message: 'Nie udało się usunąć usługi' });
    };
};