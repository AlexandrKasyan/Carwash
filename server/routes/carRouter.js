const Router = require('express')
const router = new Router()
const carController = require('../controllers/carController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('USER'), carController.create)
router.get('/', checkRole('ADMIN'), carController.getAll)
router.get('/getone', checkRole('ADMIN'), carController.getOne)
router.post('/remove', checkRole('ADMIN'), carController.remove)
router.post('/edit', checkRole('ADMIN'), carController.edit)
router.post('/getAllCarsByListId', checkRole('USER'), carController.getAllCarsByListId)

module.exports = router