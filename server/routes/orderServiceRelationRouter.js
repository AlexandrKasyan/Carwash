const Router = require('express')
const router = new Router()
const orderServiceRelationController = require('../controllers/orderServiceRelationController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', /*checkRole('ADMIN'),*/ orderServiceRelationController.create)
router.get('/', orderServiceRelationController.getAll)
router.get('/getone', orderServiceRelationController.getOne)
router.post('/remove', checkRole('ADMIN'), orderServiceRelationController.remove)
router.post('/edit', checkRole('ADMIN'), orderServiceRelationController.edit)

module.exports = router