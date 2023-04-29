import React, { useContext } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { Context } from '../../..'

const SelectedService = () => {
  const { selectedServices } = useContext(Context)



  return (
    <div>
      {selectedServices.selectedServices.map((services) =>
        <div key={services.id + 1}>
          <div>{services.name}</div>
          <div>{services.cost}</div>
          <Button></Button>
          {/* <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type =>
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
      )}
    </div>
  )
}

export default SelectedService