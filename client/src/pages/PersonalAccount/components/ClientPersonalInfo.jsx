import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import ChangeEmail from './Change/ChangeEmail'
import ChangeName from './Change/ChangeName'
import ChangePhone from './Change/ChangePhone'
import ChangeCarWash from './Change/ChangeCarWash'
import { getCarWash, getCarWashes } from '../../http/carWashAPI'
import { editByUserCarWash, editByUserEmail, getMyAccount } from '../../http/userAPI'
import { changeNameByUser, changePhoneByUser, getClientInfoByUserId } from '../../http/clientAPI'


import MyModal from '../../../components/MyModal/MyModal'

const ClientPersonalInfo = ({}) => {
    const [modalForEmail, setModalForEmail] = useState(false);
    const [modalForName, setModalForName] = useState(false);
    const [modalForPhone, setModalForPhone] = useState(false);
    const [modalForCarWash, setModalForCarWash] = useState(false);
    const [carWash, setCarWash] = useState({})
    const [washes, setWashes] = useState([])
    const { user } = useContext(Context)
    const [clientInfo, setClientInfo] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getWashesList()
        fetchData()
    }, [])

    
    useEffect(() => {
        fetchData()
    }, [])


    async function fetchData() {

    }

    async function fetchData() {
        const userData = await getMyAccount()
        if (!userData) {
            setLoading(false)
            return
        }
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

        const carWashData = await getCarWash(userData.carWashId)
        if (!carWashData) {
            setLoading(false)
            return
        }
        setCarWash(carWashData)
        setLoading(false)
    }

    const getWashesList = async () => {
        const data = await getCarWashes();
        setWashes(data.rows)
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

    return (
        <div className='user-info'>
            <div>
                Email: {userInfo.email}
                <MyModal
                    visible={modalForEmail}
                    setVisible={setModalForEmail}
                >
                    <ChangeEmail changeEmail={changeEmail} />
                </MyModal>
                <Button onClick={() => setModalForEmail(true)}>Изменить</Button>
            </div>
            <div>Дата регистрации: {userInfo.createdAt}</div>
            <div>Выбранная автомойка: {carWash.name}
                <MyModal
                    visible={modalForCarWash}
                    setVisible={setModalForCarWash}
                >
                    <ChangeCarWash changeWash={changeWash} washes={washes} />
                </MyModal>
                <Button onClick={() => setModalForCarWash(true)}>Изменить</Button>
            </div>
            <div>Имя: {clientInfo.name}
                <MyModal
                    visible={modalForName}
                    setVisible={setModalForName}
                >
                    <ChangeName changeName={changeName} />
                </MyModal>
                <Button onClick={() => setModalForName(true)}>Изменить</Button>
            </div>
            <div>Ваш номер телефона: {clientInfo.phoneNumber}
                <MyModal
                    visible={modalForPhone}
                    setVisible={setModalForPhone}
                >
                    <ChangePhone changePhone={changePhone} />
                </MyModal>
                <Button onClick={() => setModalForPhone(true)}>Изменить</Button>
            </div>
        </div>
    )
}

export default ClientPersonalInfo