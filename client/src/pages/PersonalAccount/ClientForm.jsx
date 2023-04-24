import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { getCarWashes } from '../../http/carWashAPI'
import { create as createClient } from '../../http/clientAPI'
import { create as createDiscount } from '../../http/discountAPI'


const ClientForm = observer(({ userId, addName }) => {

  const [user, setUser] = useState({ name: '', phone: '', washes: '' })
  const [washes, setWashes] = useState([])


  useEffect(() => {
    const getWashesList = async () => {
      const data = await getCarWashes();
      setWashes(data.rows)
    }
    getWashesList()
  }, [])

  const createData = async (user) => {
    const discount = await createDiscount('Отсутствует', 0, 0)
    await createClient(user.name, user.phone, userId, discount.id);
    addName(user.name)
  }

  return (
    <div className='client-form'>
      Ваше имя
      <Form.Control
        type="text"
        placeholder="Имя"
        onChange={e => setUser({ ...user, name: e.target.value })}
        value={user.name}
      />
      Ваш номер телефона
      <Form.Control
        type="text"
        placeholder="Номер телефона"
        onChange={e => setUser({ ...user, phone: e.target.value })}
        value={user.phone}
      />
      Предпочитаемая автомойка
      <Form.Select
        type="text"
        onChange={e => setUser({ ...user, washes: e.target.value })}
        value={user.washes}
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
        onClick={() => createData(user)}
      >
        Сохранить
      </Button>

    </div>
  )
})

export default ClientForm