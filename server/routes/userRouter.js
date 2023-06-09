const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/myaccount', userController.account)
router.get('/', userController.getUsers)
router.get('/all', userController.getAll)
router.get('/getone', checkRole('ADMIN'), userController.getOne)
router.post('/remove', checkRole('ADMIN'), userController.remove)
router.post('/create', checkRole('ADMIN'), userController.create)
router.post('/edit', checkRole('ADMIN'), userController.edit)
router.post('/editByUserEmail', checkRole('USER'), userController.editByUserEmail)
router.post('/editByUserCarWash', checkRole('USER'), userController.editByUserCarWash)
router.post('/editPassword', checkRole('USER'), userController.editByUserPassword)

module.exports = router