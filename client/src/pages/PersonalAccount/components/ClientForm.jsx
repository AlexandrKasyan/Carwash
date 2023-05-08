import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '../../..'
import { getCarWashes } from '../../../http/carWashAPI'
import { create as createClient } from '../../../http/clientAPI'
import { create as createDiscount } from '../../../http/discountAPI'
import { editByUserCarWash } from '../../../http/userAPI'


const ClientForm = observer(() => {
  const { client } = useContext(Context)
  const { user } = useContext(Context)
  const [washes, setWashes] = useState([])
  const [clientData, setClientData] = useState({ name: '', phoneNumber: '', carWashId: ''})


  useEffect(() => {
    const getWashesList = async () => {
      const data = await getCarWashes();
      setWashes(data.rows)
    }
    getWashesList()
  }, [])



  const createData = async () => {
    const discount = await createDiscount('Отсутствует', 0, 0)
    await createClient(clientData.name, clientData.phoneNumber, user.user.id, discount.id);
    client.setClient({ name: clientData.name, phoneNumber: clientData.phoneNumber, userId: user.user.id, discountId: discount.id })
    await editByUserCarWash(user.user.id, clientData.carWashId)
  }

  return (
    <div className='client-form'>
      <h3 className='mt-3'>Дополните информацию о Вас</h3>
      Ваше имя
      <Form.Control
        type="text"
        placeholder="Имя"
        onChange={e => setClientData({ ...clientData, name: e.target.value })}
        value={clientData.name}
      />
      Ваш номер телефона
      <Form.Control
        type="text"
        placeholder="Номер телефона"
        onChange={e => setClientData({ ...clientData, phoneNumber: e.target.value })}
        value={clientData.phoneNumber}
      />
      Предпочитаемая автомойка
      <Form.Select
        type="text"

        onChange={e => setClientData({ ...clientData, carWashId: e.target.value })}
        value={clientData.carWashId}
      >
        <option disabled value="">Выберите автомойку</option>
        {washes.map(wash =>
          <option
            key={wash.id}
            value={wash.id}>
            {wash.name}
          </option>
        )}
      </Form.Select>

      <Button
        className="mt-3 me-3"
        variant='outline-success'
        onClick={() => createData()}
      >
        Сохранить
      </Button>
    </div>
  )
})

export default ClientForm