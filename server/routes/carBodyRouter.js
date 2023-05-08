const Router = require('express')
const router = new Router()
const carBodyController = require('../controllers/carBodyController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('USER'), carBodyController.create)
router.get('/', carBodyController.getAll)
router.get('/getBody', carBodyController.getOne)
router.post('/remove', checkRole('ADMIN'), carBodyController.remove)
router.post('/edit', checkRole('ADMIN'), carBodyController.edit)

module.exports = router