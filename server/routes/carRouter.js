const Router = require('express')
const router = new Router()
const carController = require('../controllers/carController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', /*checkRole('ADMIN'),*/ carController.create)
router.get('/', carController.getAll)
router.get('/getone', carController.getOne)
router.post('/remove', checkRole('ADMIN'), carController.remove)
router.post('/edit', checkRole('ADMIN'), carController.edit)

module.exports = router