const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('USER'), orderController.create)
router.get('/', orderController.getAll)
router.get('/getone', orderController.getOne)
router.get('/clientOrders', checkRole('USER'), orderController.getClientOrders)
router.post('/remove', checkRole('ADMIN'), orderController.remove)
router.post('/edit', checkRole('ADMIN'), orderController.edit)

module.exports = router