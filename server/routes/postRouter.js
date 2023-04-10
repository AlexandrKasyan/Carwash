const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController.js')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', /*checkRole('ADMIN'),*/ postController.create)
router.get('/', postController.getAll)
router.get('/getone', postController.getOne)
router.post('/remove', checkRole('ADMIN'), postController.remove)
router.post('/edit', checkRole('ADMIN'), postController.edit)

module.exports = router