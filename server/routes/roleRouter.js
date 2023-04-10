const Router = require('express')
const router = new Router()
const roleController = require('../controllers/roleController.js')

router.get('/', roleController.getAll)
router.get('/getone', roleController.getOne)
router.post('/create', roleController.create)
router.post('/edit', roleController.edit)
router.post('/remove', roleController.remove)


module.exports = router