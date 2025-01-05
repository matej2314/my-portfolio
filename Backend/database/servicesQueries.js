module.exports = {
    getAllServices: 'SELECT * FROM services ORDER BY id',
    addNewService: 'INSERT INTO services (id, serviceName, serviceDescription) VALUES (?, ?, ?)',
    editService: 'UPDATE services SET serviceName=?, serviceDescription=? WHERE id=?',
    deleteService: 'DELETE FROM services WHERE id=?',
}