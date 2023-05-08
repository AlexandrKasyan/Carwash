const Router = require('express')
const router = new Router()
const clientCarController = require('../controllers/clientCarController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('USER'), clientCarController.create)
router.get('/', checkRole('ADMIN'), clientCarController.getAll)
router.get('/getone', clientCarController.getOne)
router.get('/getClientCars', clientCarController.getClientCars)
router.post('/remove', checkRole('USER'), clientCarController.remove)
router.post('/removeByCarId', checkRole('USER'), clientCarController.removeByCarId)
router.post('/edit', checkRole('USER'), clientCarController.edit)

module.exports = router