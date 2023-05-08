const Router = require('express')
const router = new Router()
const carBrandController = require('../controllers/carBrandController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('USER'), carBrandController.create)
router.get('/', carBrandController.getAll)
router.get('/getBrand', carBrandController.getOne)
router.post('/remove', checkRole('ADMIN'), carBrandController.remove)
router.post('/edit', checkRole('ADMIN'), carBrandController.edit)

module.exports = router