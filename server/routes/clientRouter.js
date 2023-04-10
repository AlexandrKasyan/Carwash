const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('USER'), clientController.create)
router.get('/', checkRole('ADMIN'), clientController.getAll)
router.get('/getone', checkRole('ADMIN'), clientController.getOne)
router.post('/remove', checkRole('ADMIN'), clientController.remove)
router.post('/edit', checkRole('ADMIN'), clientController.edit)
router.post('/removeFromUser', checkRole('ADMIN'), clientController.removeFromUser)

module.exports = router