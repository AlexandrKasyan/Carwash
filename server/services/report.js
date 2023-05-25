var Excel = require('exceljs');
const ApiError = require('../error/apiError')


class Report {

    async createReport(req, res, next) {
        try {

            const { arrayPosts, columns, nameReport, user } = req.body;
            const lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Sensor Data');

            worksheet.columns = columns

            worksheet.insertRow(1, [nameReport]).alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.mergeCells('A1:' + lettersArray[columns.length - 1] + 1)

            arrayPosts.forEach((post) => {
                worksheet.addRow(post).commit();
            })

            const dateNowISO = new Date().toISOString();

            const fileName = nameReport + dateNowISO.slice(0, 10)

            worksheet.addRow().commit();
            worksheet.addRow(["Дата формирования отчёта: " + dateNowISO.replace('T', ' ').slice(0, 16)]).commit();
            worksheet.addRow(["Подготовил отчёт: " + user.name + '      Номер телефона:' + user.phoneNumber + '        Подпись: ']).commit();

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

module.exports = new Report();