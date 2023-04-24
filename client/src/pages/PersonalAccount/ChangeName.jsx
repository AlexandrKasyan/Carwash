import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


const ChangeName = ({ changeName }) => {
  const [name, setName] = useState('')

  return (
    <div>
      Новое имя
      <Form.Control
        type="имя"
        placeholder="имя"
        onChange={e => setName(e.target.value)}
        value={name}
      />

      <Button
        className="mt-3 me-3"
        variant='outline-success'
        onClick={() => changeName(name)}
      >
        Сохранить
      </Button>
    </div>
  )
}

export default ChangeName