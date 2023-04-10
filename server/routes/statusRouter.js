const Router = require('express')
const router = new Router()
const statusController = require('../controllers/statusController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', /*checkRole('ADMIN'),*/ statusController.create)
router.get('/', statusController.getAll)
router.get('/getone', statusController.getOne)
router.post('/remove', checkRole('ADMIN'), statusController.remove)
router.post('/edit', checkRole('ADMIN'), statusController.edit)

module.exports = router