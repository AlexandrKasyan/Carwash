import React, { useContext, useEffect, useState } from 'react'
import { getWashServices } from '../../http/washServiceAPI'
import { Spinner } from 'react-bootstrap'
import SelectServiceButton from './SelectServiceButton';
import { Context } from '../..';


const ListServices = () => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([])
    const { user } = useContext(Context)


    useEffect(() => {
        viewListServices()
    }, [])

    const viewListServices = async () => {
        setLoading(true)
        const data = await getWashServices();
        setServices(data.rows)
        setLoading(false)
    }

    return (
        <div className='service-list'
        >
            {
                loading ?
                    <Spinner animation="border" className='user-info-spiner' />
                    :
                    services.map((service, index) =>
                        <div
                            className={
                                index % 2 === 0 ?
                                    'service-box animation-left' :
                                    'service-box animation-right'
                            }

                            key={service.id + 1}>

                            <div className='service-img' style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + service.img})` }}>
                                <div className='service-description'>{service.description}</div>
                            </div>
                            <div className='service-name'>{service.name}</div>
                            <div className='service-cost'>От {service.cost}р.</div>
                            {user.isAuth && user.user.role === 'USER' ?
                                <SelectServiceButton service={service}>Выбрать</SelectServiceButton> : ''
                            }

                        </div>
                    )
            }
        </div>
    )
}

export default ListServices