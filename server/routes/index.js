const Router = require('express')
const router = new Router()
const carRouter = require('./carRouter')
const carBodyRouter = require('./carBodyRouter')
const carBrandRouter = require('./carBrandRouter')
const carWashRouter = require('./carWashRouter')
const clientRouter = require('./clientRouter')
const clientCarRouter = require('./clientCarRouter')
const discountRouter = require('./discountRouter')
const orderRouter = require('./orderRouter')
const orderServiceRelationsRouter = require('./orderServiceRelationRouter')
const postRouter = require('./postRouter')
const roleRouter = require('./roleRouter')
const staffRouter = require('./staffRouter')
const statusRouter = require('./statusRouter')
const userRouter = require('./userRouter')
const washServiceRouter = require('./washServiceRouter')


router.use('/car', carRouter)
router.use('/carBody', carBodyRouter)
router.use('/carBrand', carBrandRouter)
router.use('/carWash', carWashRouter)
router.use('/client', clientRouter)
router.use('/clientCar', clientCarRouter)
router.use('/discount', discountRouter)
router.use('/order', orderRouter)
router.use('/orderServiceRelations', orderServiceRelationsRouter)
router.use('/post', postRouter)
router.use('/role', roleRouter)
router.use('/staff', staffRouter)
router.use('/status', statusRouter)
router.use('/user', userRouter)
router.use('/washService', washServiceRouter)




module.exports = router