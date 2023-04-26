import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import MyModal from '../../../components/MyModal/MyModal'
import { getBodies } from '../../../http/bodyAPI'
import { getBrands } from '../../../http/brandAPI'
import { create as createCar, getCarsByListId, remove as removeCar } from '../../../http/carAPI'
import { create as createClientCar, getClientCars, removeByCarId } from '../../../http/clientCarAPI'
import CarForm from '../../AdminPanel/components/car/CarForm'

const PersonalClientCar = ({ clientId }) => {
    const [cars, setCars] = useState([{}])
    const [modal, setModal] = useState(false)
    const [bodies, setBodies] = useState([{}])
    const [brands, setBrands] = useState([{}])


    useEffect(() => {
        getListClientCar()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const getListClientCar = async () => {
        const clientCars = await getClientCars(clientId)
        let carsId = []
        clientCars.forEach(e => {
            carsId.push(e.carId)
        })

        const carsList = await getListCarByListId(carsId)
        setCars(carsList)

        const bodiesList = await getBodies()
        setBodies(bodiesList.rows)
        const brandsList = await getBrands()
        setBrands(brandsList.rows)

    }

    const getListCarByListId = async (carsListId) => {
        const cars = await getCarsByListId(carsListId)
        return cars
    }

    const removeUserCar = async (carId) => {
        console.log(carId)
        await removeByCarId(carId)
        await removeCar(carId);
        await getListClientCar()
    }

    const createCarByModal = async (car) => {
        const createdCar = await createCar(car.number, car.yearRelease, car.bodyId, car.carBrandId)
        setModal(false)
        await createClientCar(clientId, createdCar.id)
        await getListClientCar()
    }

    return (
        <div>
            {cars.map((car) =>
                <div key={car.id + 1} className='client-car'
                >
                    <div className='col-car-number'>
                        <div className='car-table-number'>
                            <div className='flag-and-country'>
                                <img
                                    src='https://premiumflag.ru/upload/static/986/1.jpg'
                                    alt="belarusian flag"
                                    className='car-flag'
                                />
                                <div className='car-country'>BY</div>
                            </div>
                            <div className="number">{car.number}</div>
                        </div>
                    </div>
                    <div className='car-info'>
                        <div className='car-brand'> {brands.map((brand) =>
                            brand.id === car.carBrandId ?
                                brand.name :
                                ''
                        )}</div>
                        <div className='year-release'> {car.yearRelease}</div>
                        <div className='car-body'>{bodies.map((body) =>
                            body.id === car.bodyId ?
                                body.name :
                                ''
                        )}</div>
                    </div>

                    <Button
                        className='btn car-remove'
                        variant='btn btn-danger'
                        onClick={() => removeUserCar(car.id)}
                    >X</Button>
                </div>
            )}
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <CarForm
                    create={createCarByModal}
                />
            </MyModal>
            <Button
                onClick={() => setModal(true)}
                className=' mt-4'
            >
                Добавить авто
            </Button>
        </div>
    )
}

export default PersonalClientCar