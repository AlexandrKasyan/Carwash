const Router = require('express')
const router = new Router()
const clientCarController = require('../controllers/clientCarController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), clientCarController.create)
router.get('/', checkRole('ADMIN'), clientCarController.getAll)
router.get('/getone', clientCarController.getOne)
router.post('/remove', checkRole('ADMIN'), clientCarController.remove)
router.post('/edit', checkRole('ADMIN'), clientCarController.edit)

module.exports = router