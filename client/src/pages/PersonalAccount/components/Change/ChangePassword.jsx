import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


const ChangePassword = ({ changePassword }) => {
  const [passwords, setPasswords] = useState({ newPassword: '', lastPassword: '' })

  return (
    <div>
      Старый пароль
      <Form.Control
        type="text"
        placeholder="Старый пароль"
        onChange={e => setPasswords({...passwords, lastPassword: e.target.value})}
        value={passwords.lastPassword}
      />

      Новый пароль
      <Form.Control
        type="text"
        placeholder="Новый пароль"
        onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
        value={passwords.newPassword}
      />

      <Button
        className="mt-3 me-3"
        variant='outline-success'
        onClick={() => changePassword(passwords)}
      >
        Сохранить
      </Button>
    </div>
  )
}

export default ChangePassword