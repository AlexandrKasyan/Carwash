import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { GrUserWorker } from 'react-icons/gr'
import { MdOutlineAlternateEmail, MdOutlineDateRange } from 'react-icons/md'
import { Context } from '../..'
import LogOut from '../../components/UI/buttons/LogOut'
import { getPost } from '../../http/postAPI'
import { getEmployee } from '../../http/staffAPI'

const EmployeeInformation = () => {
    const { employee } = useContext(Context)
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getEmployeeInfo = async () => {
            if (!employee.employee.name) {
                let employeeFetchData = await getEmployee(user.user.id)
                const postFetchData = await getPost(employeeFetchData.postId)
                employeeFetchData = {
                    ...employeeFetchData,
                    post: postFetchData.name,
                    duties: postFetchData.duties
                }
                employee.setEmployee(employeeFetchData)
                setLoading(false)
            } else
                setLoading(false)

        }
        getEmployeeInfo()
    }, [employee, user])


    return (
        <div className=' mt-5 employee-info'>
            {loading ?
                <Spinner animation="border" className='user-info-spiner'>
                    <span className="visually-hidden">Loading...</span>
                </Spinner> :

                employee.employee.name ?
                    <div >
                        <h5 style={{textAlign: 'center'}}>Сотрудник</h5>
                        <div> <GrUserWorker/> {employee.employee.post}</div>
                        <div><AiOutlineUser/>{employee.employee.name}</div>
                        <div><AiOutlinePhone/>{employee.employee.phoneNumber}</div>
                        <div><MdOutlineAlternateEmail/>{user.user.email}</div>
                        <div><MdOutlineDateRange/> Дата регистрации: {employee.employee.createdAt.slice(0, 10)}</div>
                    </div> :
                    <></>

            }
            < LogOut />
        </div>
    )
}

export default EmployeeInformation