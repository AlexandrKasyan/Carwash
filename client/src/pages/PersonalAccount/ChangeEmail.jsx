import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


const ChangeEmail = ({ changeEmail }) => {
  const [email, setEmail] = useState('')

  return (
    <div>
      Новый email
      <Form.Control
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />

      <Button
        className="mt-3 me-3"
        variant='outline-success'
        onClick={() => changeEmail(email)}
      >
        Сохранить
      </Button>
    </div>
  )
}

export default ChangeEmail