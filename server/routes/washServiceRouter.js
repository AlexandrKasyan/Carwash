const Router = require('express')
const router = new Router()
const washServiceController = require('../controllers/washServiceController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', /*checkRole('ADMIN'),*/ washServiceController.create)
router.get('/', washServiceController.getAll)
router.get('/getone', washServiceController.getOne)
router.post('/remove', checkRole('ADMIN'), washServiceController.remove)
router.post('/edit', checkRole('ADMIN'), washServiceController.edit)

module.exports = router