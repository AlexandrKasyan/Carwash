var Excel = require('exceljs');
const ApiError = require('../error/apiError')


class ClientReport {

    async createReport(req, res, next) {
        try {

            const { clientData } = req.body;
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Sensor Data');

            worksheet.columns = [
                { header: 'id', key: 'id', width: 5 },
                { header: 'Дата регистрации', key: 'createdAt', width: 17, style: { numFmt: 'dd/mm/yyyy' } },
                { header: 'ФИО', key: 'name', width: 30 },
                { header: 'Email', key: 'email', width: 32 },
                { header: 'Телефон', key: 'phoneNumber', width: 17 },
                { header: 'Скидка', key: 'discount', width: 32 },
            ];

            clientData.forEach((client) => {
                worksheet.addRow(client).commit();
            })
            const fileName = Date.now();
            workbook.xlsx.writeFile(`./static/report/${fileName}.xlsx`);

            return res.json(fileName)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async downloadReport(req, res, next) {
        try {
            const { fileName } = req.query
            const file = `C:/Users/Alexandr/Desktop/frontend/react/Carwash/server/static/report/${fileName}.xlsx`;
            
            res.download(file, fileName);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new ClientReport();