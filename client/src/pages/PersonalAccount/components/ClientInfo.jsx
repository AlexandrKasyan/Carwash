import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { MdDateRange, MdOutlineLocalCarWash } from 'react-icons/md';
import { Context } from '../../..';
import MyModal from '../../../components/MyModal/MyModal';
import LogOut from '../../../components/UI/buttons/LogOut';
import { getCarWashes } from '../../../http/carWashAPI';
import { changeNameByUser, changePhoneByUser } from '../../../http/clientAPI';
import { editByUserCarWash, editByUserEmail, editByUserPassword } from '../../../http/userAPI';
import ChangeCarWash from './change/ChangeCarWash';
import ChangeEmail from './change/ChangeEmail';
import ChangeName from './change/ChangeName';
import ChangePassword from './change/ChangePassword';
import ChangePhone from './change/ChangePhone';

const ClientInfo = observer(() => {
    const { client } = useContext(Context)
    const { user } = useContext(Context)
    const [washes, setWashes] = useState([])
    const [wash, setWash] = useState({})
    const [modal, setModal] = useState({
        modalForEmail: false,
        modalForName: false,
        modalForPhone: false,
        modalForCarWash: false,
        modalForPassword: false
    });

    useEffect(() => {
        const getWashesList = async () => {
            const data = await getCarWashes();
            setWashes(data.rows)
            if(!wash.name)
            data.rows.forEach((e) => {
                if (e.id === user.user.carWashId)
                    setWash(e)
            })
        }
        getWashesList()// eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])


    const changeEmail = async (email) => {
        setModal({ ...modal, modalForEmail: false })
        user.setUser({ ...user.user, email: email })
        await editByUserEmail(user.user.id, email)
    }

    const changeName = async (name) => {
        setModal({ ...modal, modalForName: false })
        client.setClient({ ...client.client, name: name })
        await changeNameByUser(client.client.id, name)
    }

    const changePhone = async (phone) => {
        setModal({ ...modal, modalForPhone: false })
        client.setClient({ ...client.client, phoneNumber: phone })
        await changePhoneByUser(client.client.id, phone)
    }

    const changeWash = async (id, wash) => {
        setModal({ ...modal, modalForWash: false })
        user.setUser({ ...user.user, carWashId: id })
        await editByUserCarWash(user.user.id, id)
    }

    const changePassword = async (passwords) => {
        setModal({ ...modal, modalForPassword: false })
        await editByUserPassword(user.user.id, passwords.newPassword, passwords.lastPassword)
    }
    return (
        <div className="user-info-wrap">
            <div className='user-info'>
                <div className='user-info-row'  >
                    <AiOutlineUser className='user-info-ico' />
                    {client.client.name}
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
                    {client.client.phoneNumber}
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
                    {wash.name}
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
                    {user.user.email}
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
                    Дата регистрации: {user.user.createdAt.slice(0, 10)}
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
        </div>
    )
})

export default ClientInfo