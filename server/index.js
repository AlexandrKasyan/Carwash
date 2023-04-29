require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const fileUpLoad = require('express-fileupload');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')


const app = express();
app.use(cors()); // Использование модуля CORS
app.use(express.json()) 
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpLoad({})) 
app.use('/api', router)
app.use(errorHandler)
 
//Запуск сервера
const start = async () => {
    try {
        await sequelize.authenticate();//подключение к BD
        await sequelize.sync();//Синхронизация модели с базой данных 
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start()