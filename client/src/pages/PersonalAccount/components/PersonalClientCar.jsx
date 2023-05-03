import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap'
import { AiFillCar } from 'react-icons/ai'
import { Context } from '../../..'
import MyModal from '../../../components/MyModal/MyModal'
import { getBodies } from '../../../http/bodyAPI'
import { getBrands } from '../../../http/brandAPI'
import { create as createCar, getCarsByListId, remove as removeCar } from '../../../http/carAPI'
import { create as createClientCar, getClientCars, removeByCarId } from '../../../http/clientCarAPI'
import { fetchClientData } from '../../../utils/account'
import CarForm from '../../AdminPanel/components/car/CarForm'
import ClientForm from './ClientForm'
import ClientInfo from './ClientInfo'
import NavBarAccount from './NavBarAccount'

const PersonalClientCar = observer(() => {
    const [cars, setCars] = useState([{}])
    const [modal, setModal] = useState(false)
    const [bodies, setBodies] = useState([{}])
    const [brands, setBrands] = useState([{}])
    const [loading, setLoading] = useState(true);
    const { client } = useContext(Context)
    const { user } = useContext(Context)


    useEffect(() => {
        const fetchData = async () => {
            if (!client.client.name) {
                const clientData = await fetchClientData(user.user.id)
                if (!clientData) {
                    return (<ClientForm />)
                }
                else {
                    client.setClient(clientData)
                }
            }
        getListClientCar()

        }
        fetchData()

        setLoading(false)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const getListClientCar = async () => {
        const clientCars = await getClientCars(client.client.id)
        let carsId = []
        clientCars.forEach(e => {
            carsId.push(e.carId)
        })

        const carsList = await getListCarByListId(carsId)
        client.setClientCars(carsList)
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
        await createClientCar(client.client.id, createdCar.id)
        await getListClientCar()
    }

    return (

        <Container>
            {loading ? <Spinner animation="border" className='user-info-spiner'>
                <span className="visually-hidden">Loading...</span>
            </Spinner> :
                <div>
                    {
                        client.client.name ?
                            <div className='account' >
                                <ClientInfo />
                                <div>
                                    <NavBarAccount />
                                    <div className='user-account-car'>
                                        <h4><AiFillCar></AiFillCar> Автомобили </h4>
                                        <div>
                                            {cars.map((car) =>
                                                <div key={car.id + 1} className='client-car'
                                                >
                                                    <div className='col-car-number'>
                                                        <div className='car-table-number'>
                                                            <div className='flag-and-country'>
                                                                <img
                                                                    src={process.env.REACT_APP_API_URL + 'flag.jpg'}
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
                                    </div>
                                </div>
                            </div>
                            :
                            <ClientForm />
                    }
                </div>}
        </Container >
    )
})

export default PersonalClientCar