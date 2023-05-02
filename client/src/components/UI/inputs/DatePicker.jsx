import React from 'react'
import { Form } from 'react-bootstrap'


const DatePicker = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Control type="datetime-local" />
                    </Form.Group>
                </div>
            </div>
        </div>
    )
}

export default DatePicker