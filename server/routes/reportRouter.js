const Router = require('express')
const report = require('../services/report')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/createReport', checkRole('USER'), report.createReport)
router.get('/downloadReport', report.downloadReport)

module.exports = router