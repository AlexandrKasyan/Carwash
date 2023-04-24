import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../index'
import { Button, Container, Spinner } from 'react-bootstrap'
import { getCarWash, getCarWashes } from '../../http/carWashAPI'
import { editByUserCarWash, editByUserEmail, getMyAccount } from '../../http/userAPI'
import { changeNameByUser, changePhoneByUser, getClientInfoByUserId } from '../../http/clientAPI'
import ClientForm from './ClientForm'
import MyModal from '../../components/MyModal/MyModal'
import ChangeEmail from './ChangeEmail'
import ChangeName from './ChangeName'
import ChangePhone from './ChangePhone'
import { getDiscount } from '../../http/discountAPI'
import ChangeCarWash from './ChangeCarWash'

const Account = () => {
    const { user } = useContext(Context)
    const [userInfo, setUserInfo] = useState({})
    const [clientInfo, setClientInfo] = useState({})
    const [discountInfo, setDiscountInfo] = useState({})
    const [carWash, setCarWash] = useState({})
    const [washes, setWashes] = useState([])
    const [modalForEmail, setModalForEmail] = useState(false);
    const [modalForName, setModalForName] = useState(false);
    const [modalForPhone, setModalForPhone] = useState(false);
    const [modalForCarWash, setModalForCarWash] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getWashesList()
        fetchData()
    }, [])


    async function fetchData() {
        const userData = await getMyAccount()
        if (!userData) {
            setLoading(false)
            return
        }
        setUserInfo(userData)

        const carWashData = await getCarWash(userData.carWashId)
        if (!carWashData) {
            setLoading(false)
            return
        }
        setCarWash(carWashData)

        const clientData = await getClientInfoByUserId(userData.id)
        if (!clientData) {
            setLoading(false)
            return
        }
        setClientInfo(clientData)

        const discountData = await getDiscount(clientData.discountId)
        if (!discountData) {
            setLoading(false)
            return
        }
        setDiscountInfo(discountData)

        setLoading(false)
    }

    const getWashesList = async () => {
        const data = await getCarWashes();
        setWashes(data.rows)
    }

    const addName = async (name) => {
        setClientInfo({ ...clientInfo, name: name })
        await fetchData()
    }

    const changeEmail = async (email) => {
        setModalForEmail(false)
        setUserInfo({ ...userInfo, email: email })
        await editByUserEmail(userInfo.id, email)
        await fetchData()
    }

    const changeName = async (name) => {
        setModalForName(false)
        setClientInfo({ ...clientInfo, name: name })
        await changeNameByUser(clientInfo.id, name)
        await fetchData()
    }

    const changePhone = async (phone) => {
        setModalForPhone(false)
        setClientInfo({ ...clientInfo, phoneNumber: phone })
        await changePhoneByUser(clientInfo.id, phone)
        await fetchData()
    }

    const changeWash = async (id, wash) => {
        setModalForCarWash(false)
        setCarWash({ ...wash, name: wash.name })
        await editByUserCarWash(userInfo.id, id)
        await fetchData()
    }

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <Container>

            {loading ? <Spinner animation="border" className='user-info-spiner'>
                <span className="visually-hidden">Loading...</span>
            </Spinner> :
                <div>
                    {
                        clientInfo.name ?
                            <div>
                                <h3>Ваш личный кабинет</h3>
                                <div className='user-info'>
                                    <li>
                                        Email: {userInfo.email}
                                        <MyModal
                                            visible={modalForEmail}
                                            setVisible={setModalForEmail}
                                        >
                                            <ChangeEmail changeEmail={changeEmail} />
                                        </MyModal>
                                        <Button onClick={() => setModalForEmail(true)}>Изменить</Button>
                                    </li>
                                    <li>Дата регистрации: {userInfo.createdAt}</li>
                                    <li>Выбранная автомойка: {carWash.name}
                                        <MyModal
                                            visible={modalForCarWash}
                                            setVisible={setModalForCarWash}
                                        >
                                            <ChangeCarWash changeWash={changeWash} washes={washes} />
                                        </MyModal>
                                        <Button onClick={() => setModalForCarWash(true)}>Изменить</Button>
                                    </li>
                                    <li>Имя: {clientInfo.name}
                                        <MyModal
                                            visible={modalForName}
                                            setVisible={setModalForName}
                                        >
                                            <ChangeName changeName={changeName} />
                                        </MyModal>
                                        <Button onClick={() => setModalForName(true)}>Изменить</Button>
                                    </li>
                                    <li>Ваш номер телефона: {clientInfo.phoneNumber}
                                        <MyModal
                                            visible={modalForPhone}
                                            setVisible={setModalForPhone}
                                        >
                                            <ChangePhone changePhone={changePhone} />
                                        </MyModal>
                                        <Button onClick={() => setModalForPhone(true)}>Изменить</Button>
                                    </li>
                                    <li>Ваша скидка: {discountInfo.name} Процент скидки: {discountInfo.discountPercentage}</li>
                                </div>


                            </div>

                            :
                            <div>
                                <h3 className='mt-3'>Дополните информацию о Вас</h3>
                                <ClientForm userId={userInfo.id} addName={addName} ></ClientForm>
                            </div>

                    }


                    <Button
                        className='mt-3'
                        onClick={() => logOut()}
                        variant='outline-danger'
                    >Выход
                    </Button>

                </div>}
        </Container>
    )
}

export default Account