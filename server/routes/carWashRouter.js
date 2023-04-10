const Router = require('express')
const router = new Router()
const carWashController = require('../controllers/carWashController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), carWashController.create)
router.get('/', carWashController.getAll)
router.get('/getone', carWashController.getOne)
router.post('/remove', checkRole('ADMIN'), carWashController.remove)
router.post('/edit', checkRole('ADMIN'), carWashController.edit)

module.exports = router