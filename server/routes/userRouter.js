const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/', userController.getAll)
router.get('/getone', checkRole('ADMIN'), userController.getOne)
router.post('/remove', checkRole('ADMIN'), userController.remove)
router.post('/create', checkRole('ADMIN'), userController.create)
router.post('/edit', checkRole('ADMIN'), userController.edit)

module.exports = router