const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('USER'), orderController.create)
router.get('/', orderController.getAll)
router.get('/getone', orderController.getOne)
router.get('/getbydate', orderController.getByDate)
router.get('/clientOrders', checkRole('USER'), orderController.getClientOrders)
router.post('/remove', checkRole('ADMIN'), orderController.remove)
router.post('/edit', checkRole('ADMIN'), orderController.edit)
router.post('/changeStatus', checkRole('USER'), orderController.changeStatus)

module.exports = router