import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap'
import { getCarWashes } from '../../http/carWashAPI'
import { editByUserCarWash, editByUserEmail, editByUserPassword } from '../../http/userAPI'
import { changeNameByUser, changePhoneByUser } from '../../http/clientAPI'
import ClientForm from './ClientForm'
import MyModal from '../../components/MyModal/MyModal'
import ChangeEmail from './components/Change/ChangeEmail'
import ChangeCarWash from './components/Change/ChangeCarWash'
import ChangeName from './components/Change/ChangeName'
import ChangePhone from './components/Change/ChangePhone'
import './components/account.css'
import PersonalClientCar from './components/PersonalClientCar'
import { AiOutlinePhone, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { MdOutlineLocalCarWash, MdDateRange } from "react-icons/md";
import ChangePassword from './components/Change/ChangePassword'
import ClientDiscount from './components/ClientDiscount'
import LogOut from '../../components/UI/buttons/LogOut'
import { fetchClientData } from '../../utils/clientData'
import SelectedService from './components/SelectedService'
import { Context } from '../..'



const Account = () => {
    const [userInfo, setUserInfo] = useState({})
    const [clientInfo, setClientInfo] = useState({})
    const [discountInfo, setDiscountInfo] = useState({})
    const [carWash, setCarWash] = useState({})
    const [washes, setWashes] = useState([])
    const [modal, setModal] = useState({
        modalForEmail: false,
        modalForName: false,
        modalForPhone: false,
        modalForCarWash: false,
        modalForPassword: false
    });
    const [loading, setLoading] = useState(true);
    const { client } = useContext(Context)


    useEffect(() => {
        getWashesList()
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetchClientData()
        setClientInfo(data.clientData)
        setUserInfo(data.userData)
        setCarWash(data.carWashData)
        setDiscountInfo(data.discountData)
        client.setClient(data)
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
        setModal({ ...modal, modalForEmail: false })
        setUserInfo({ ...userInfo, email: email })
        await editByUserEmail(userInfo.id, email)
        await fetchData()
    }

    const changeName = async (name) => {
        setModal({ ...modal, modalForName: false })
        setClientInfo({ ...clientInfo, name: name })
        await changeNameByUser(clientInfo.id, name)
        await fetchData()
    }

    const changePhone = async (phone) => {
        setModal({ ...modal, modalForPhone: false })
        setClientInfo({ ...clientInfo, phoneNumber: phone })
        await changePhoneByUser(clientInfo.id, phone)
        await fetchData()
    }

    const changeWash = async (id, wash) => {
        setModal({ ...modal, modalForWash: false })
        setCarWash({ ...wash, name: wash.name })
        await editByUserCarWash(userInfo.id, id)
        await fetchData()
    }

    const changePassword = async (passwords) => {
        setModal({ ...modal, modalForPassword: false })
        await editByUserPassword(userInfo.id, passwords.newPassword, passwords.lastPassword)
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
                                <div className='account'>
                                    <div className='user-info'>
                                        <div className='user-info-row'  >
                                            <AiOutlineUser className='user-info-ico' />
                                            {clientInfo.name}
                                            <MyModal
                                                visible={modal.modalForName}
                                                setVisible={setModal}
                                            >
                                                <ChangeName changeName={changeName} />
                                            </MyModal>
                                            <BiEdit
                                                className='edit-ico'
                                                onClick={() => setModal({ modalForName: true })}
                                            ></BiEdit>
                                        </div>
                                        <div className='user-info-row'>
                                            <AiOutlinePhone className='user-info-ico' />
                                            {clientInfo.phoneNumber}
                                            <MyModal
                                                visible={modal.modalForPhone}
                                                setVisible={setModal}
                                            >
                                                <ChangePhone changePhone={changePhone} />
                                            </MyModal>
                                            <BiEdit onClick={() => setModal({ modalForPhone: true })}>Изменить</BiEdit>
                                        </div>
                                        <div className='user-info-row'>
                                            <MdOutlineLocalCarWash className='user-info-ico' />
                                            {carWash.name}
                                            <MyModal
                                                visible={modal.modalForCarWash}
                                                setVisible={setModal}
                                            >
                                                <ChangeCarWash changeWash={changeWash} washes={washes} />
                                            </MyModal>
                                            <BiEdit onClick={() => setModal({ modalForCarWash: true })}>Изменить</BiEdit>
                                        </div>
                                        <div className='user-info-row'>
                                            <AiOutlineMail className='user-info-ico' />
                                            {userInfo.email}
                                            <MyModal
                                                visible={modal.modalForEmail}
                                                setVisible={setModal}
                                            >
                                                <ChangeEmail changeEmail={changeEmail} />
                                            </MyModal>
                                            <BiEdit onClick={() => setModal({ modalForEmail: true })}>Изменить</BiEdit>
                                        </div>
                                        <div className='user-info-row'>
                                            <MdDateRange className='user-info-ico' />
                                            Дата регистрации: {userInfo.createdAt.slice(0, 10)}
                                        </div>

                                        <div className='button-password-exit'>
                                            <div>
                                                <MyModal
                                                    visible={modal.modalForPassword}
                                                    setVisible={setModal}
                                                >
                                                    <ChangePassword changePassword={changePassword} />
                                                </MyModal>
                                                <Button
                                                    onClick={() => setModal({ modalForPassword: true })}
                                                >
                                                    Сменить пароль
                                                </Button>
                                            </div>
                                            <LogOut />
                                        </div>
                                    </div>
                                    <ClientDiscount discountInfo={discountInfo}/>
                                    <PersonalClientCar clientId={clientInfo.id}/>
                                    <SelectedService/>
                                </div>
                            </div>
                            :
                            <ClientForm userId={userInfo.id} addName={addName} ></ClientForm>
                    }
                </div>}
        </Container >
    )
}

export default Account