import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


const ChangeCarWash = ({ changeWash, washes }) => {
  const [carWashId, setCarWashId] = useState('')


  const change = () => {
    let wash 
    washes.forEach(e => {
      if(e.id === Number(carWashId) )
        wash = e
    });
    changeWash(carWashId, wash)
  }


  return (
    <div>
      Предпочитаемая автомойка
      <Form.Select
        type="select"
        onChange={e => setCarWashId(e.target.value)}
        value={carWashId}
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
        onClick={() => change()}
      >
        Сохранить
      </Button>
    </div>
  )
}

export default ChangeCarWash