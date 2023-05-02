import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '../../..'
import { getCarWashes } from '../../../http/carWashAPI'
import { create as createClient } from '../../../http/clientAPI'
import { create as createDiscount } from '../../../http/discountAPI'


const ClientForm = observer(() => {
  const { client } = useContext(Context)
  const { user } = useContext(Context)
  const [washes, setWashes] = useState([])
  


  useEffect(() => {
    const getWashesList = async () => {
      const data = await getCarWashes();
      setWashes(data.rows)
    }
    getWashesList()
  }, [])



  const createData = async () => {
    const discount = await createDiscount('Отсутствует', 0, 0)
    await createClient(client.client.name, client.client.phone, user.user.id, discount.id);
  }

  return (
    <div className='client-form'>
      <h3 className='mt-3'>Дополните информацию о Вас</h3>
      Ваше имя
      <Form.Control
        type="text"
        placeholder="Имя"
        onChange={e => client.setClinet({ ...client.client, name: e.target.value })}
        value={client.client.name}
      />
      Ваш номер телефона
      <Form.Control
        type="text"
        placeholder="Номер телефона"
        onChange={e => client.setClinet({ ...client.client, phoneNumber: e.target.value })}
        value={client.client.phoneNumber}
      />
      Предпочитаемая автомойка
      <Form.Select
        type="text"
        onChange={e => user.setUser({ ...user.user, carWashId: e.target.value })}
        value={user.user.carWashId}
      >
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
        onClick={() => createData(user.user)}
      >
        Сохранить
      </Button>
    </div>
  )
})

export default ClientForm