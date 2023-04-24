import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


const ChangePhone = ({ changePhone }) => {
  const [phone, setPhone] = useState('')

  return (
    <div>
      Новый телефон
      <Form.Control
        type="phone"
        placeholder="Телефон"
        onChange={e => setPhone(e.target.value)}
        value={phone}
      />

      <Button
        className="mt-3 me-3"
        variant='outline-success'
        onClick={() => changePhone(phone)}
      >
        Сохранить
      </Button>
    </div>
  )
}

export default ChangePhone