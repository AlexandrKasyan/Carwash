const Router = require('express')
const router = new Router()
const discountController = require('../controllers/discountController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('USER'), discountController.create)
router.get('/', checkRole('ADMIN'), discountController.getAll)
router.get('/getDiscount', checkRole('USER'), discountController.getDiscount)
router.post('/remove', checkRole('ADMIN'), discountController.remove)
router.post('/edit', checkRole('ADMIN'), discountController.edit)

module.exports = router