const Router = require('express')
const router = new Router()
const staffController = require('../controllers/staffController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', /*checkRole('ADMIN'),*/ staffController.create)
router.get('/', staffController.getAll)
router.get('/getone', staffController.getOne)
router.post('/remove', checkRole('ADMIN'), staffController.remove)
router.post('/edit', checkRole('ADMIN'), staffController.edit)

module.exports = router