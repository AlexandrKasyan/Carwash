import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Context } from '../..'

const SelectServiceButton = ({ service }) => {
    const { selectedServices } = useContext(Context)

    const select = (selectService) => {
        let services = selectedServices.selectedServices
        services.push(selectService)
        selectedServices.setSelectedServices(services)
        console.log(services)
    }


    return (
        <Button onClick={() => select(service)}>Выбрать</Button>
    )
}

export default SelectServiceButton