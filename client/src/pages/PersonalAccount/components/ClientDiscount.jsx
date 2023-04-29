import React from 'react'
import { AiOutlinePercentage } from 'react-icons/ai'

const ClientDiscount = ({discountInfo}) => {
    return (
        <div className='user-account-discount'>
            <div className="name-discount">
                Ваша скидка: {discountInfo.name}
            </div>
            <div className="discount-precentage">
                {discountInfo.discountPercentage}
                <AiOutlinePercentage />
            </div>
            <div className="number-visits">
                Количество посещений: {discountInfo.numberVisits}
            </div>
        </div>
    )
}

export default ClientDiscount