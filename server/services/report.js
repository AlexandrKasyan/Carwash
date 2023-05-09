var Excel = require('exceljs');
const ApiError = require('../error/apiError')


class Report {

    async createReport(req, res, next) {
        try {

            const { arrayPosts, columns } = req.body;
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Sensor Data');

            worksheet.columns = columns

            arrayPosts.forEach((post) => {
                worksheet.addRow(post).commit();
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

module.exports = new Report();