import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { AiOutlinePercentage } from 'react-icons/ai'
import { Context } from '../../..'
import { getClientDiscount } from '../../../http/discountAPI'

const ClientDiscount = observer(() => {
    const { client } = useContext(Context)
    const { selectedServices } = useContext(Context)
    const { discount } = useContext(Context)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getDiscount = async () => {
            setLoading(true)

            discount.setDiscount(await getClientDiscount(client.client.discountId))
            setLoading(false)
        }
        getDiscount()
    }, [client, discount])

    const applyDiscount = async () => {
        selectedServices.setGeneralPrice(selectedServices.generalPrice - selectedServices.generalPrice * discount.discount.discountPercentage / 100)
        discount.setDiscount({ ...discount.discount, discountPercentage: 0 })
        document.getElementById('applyDiscountButton').setAttribute("disabled", "disabled");
    }

    return (
        <div className='user-account-discount mb-3'>
            {loading || !discount.discount.name ?
                <Spinner /> :
                <div className='discount-info'>
                    <div className="name-discount">
                        Ваша скидка: {discount.discount.name}
                    </div>
                    <div className="discount-precentage">
                        {discount.discount.discountPercentage}
                        <AiOutlinePercentage />
                    </div>
                    <div className="number-visits">
                        Количество посещений: {discount.discount.numberVisits}
                    </div>
                    <Button
                        id='applyDiscountButton'
                        className='confirm-order'
                        onClick={() => applyDiscount()}
                    >
                        Применить скидку
                    </Button>
                </div>
            }
        </div >
    )
})

export default ClientDiscount