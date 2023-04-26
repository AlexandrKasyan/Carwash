import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../index'
import { Button, Container, Spinner } from 'react-bootstrap'
import { getCarWash, getCarWashes } from '../../http/carWashAPI'
import { editByUserCarWash, editByUserEmail, getMyAccount } from '../../http/userAPI'
import { changeNameByUser, changePhoneByUser, getClientInfoByUserId } from '../../http/clientAPI'
import ClientForm from './ClientForm'
import MyModal from '../../components/MyModal/MyModal'
import { getDiscount } from '../../http/discountAPI'
import ChangeEmail from './components/Change/ChangeEmail'
import ChangeCarWash from './components/Change/ChangeCarWash'
import ChangeName from './components/Change/ChangeName'
import ChangePhone from './components/Change/ChangePhone'
import './components/account.css'
import PersonalClientCar from './components/PersonalClientCar'
import { AiFillCar, AiFillPhone, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";


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
                            <div >
                                <h3 style={{ textAlign: 'center' }}>Ваш личный кабинет</h3>
                                <div className='account'>
                                    <div className='user-info'>
                                        <div className='user-info-row'  >
                                            <AiOutlineUser />
                                            {clientInfo.name}
                                            <MyModal
                                                visible={modalForName}
                                                setVisible={setModalForName}
                                            >
                                                <ChangeName changeName={changeName} />
                                            </MyModal>
                                            <BiEdit
                                                className='edit-ico'
                                                onClick={() => setModalForName(true)}
                                            ></BiEdit>
                                        </div>
                                        <div className='user-info-row'>
                                            <AiFillPhone />
                                            {clientInfo.phoneNumber}
                                            <MyModal
                                                visible={modalForPhone}
                                                setVisible={setModalForPhone}
                                            >
                                                <ChangePhone changePhone={changePhone} />
                                            </MyModal>
                                            <BiEdit onClick={() => setModalForPhone(true)}>Изменить</BiEdit>
                                        </div>
                                        <div className='user-info-row'>
                                            Автомойка: {carWash.name}
                                            <MyModal
                                                visible={modalForCarWash}
                                                setVisible={setModalForCarWash}
                                            >
                                                <ChangeCarWash changeWash={changeWash} washes={washes} />
                                            </MyModal>
                                            <BiEdit onClick={() => setModalForCarWash(true)}>Изменить</BiEdit>
                                        </div>
                                        <div className='user-info-row'>
                                            <AiOutlineMail />
                                            {userInfo.email}
                                            <MyModal
                                                visible={modalForEmail}
                                                setVisible={setModalForEmail}
                                            >
                                                <ChangeEmail changeEmail={changeEmail} />
                                            </MyModal>
                                            <BiEdit onClick={() => setModalForEmail(true)}>Изменить</BiEdit>
                                        </div>
                                        <div className='user-info-row'>
                                            Дата регистрации: {userInfo.createdAt.slice(0, 10)}
                                        </div>
                                    </div>
                                    <div className='user-account-discount'>
                                        <div className="name-discount">
                                            Ваша скидка: {discountInfo.name}
                                        </div>
                                        <div className="discount-precentage">
                                            Процент скидки: {discountInfo.discountPercentage}
                                        </div>
                                        <div className="number-visits">
                                            Количество посещений: {discountInfo.numberVisits}
                                        </div>
                                    </div>

                                    <div className='user-account-car'>
                                        <h4><AiFillCar></AiFillCar> Автомобили </h4>
                                        <PersonalClientCar
                                            clientId={clientInfo.id}
                                        />
                                    </div>
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