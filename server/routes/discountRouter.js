const Router = require('express')
const router = new Router()
const discountController = require('../controllers/discountController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', /*checkRole('ADMIN'),*/ discountController.create)
router.get('/', discountController.getAll)
router.get('/getone', discountController.getOne)
router.post('/remove', checkRole('ADMIN'), discountController.remove)
router.post('/edit', checkRole('ADMIN'), discountController.edit)

module.exports = router