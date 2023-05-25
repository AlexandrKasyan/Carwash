import React from 'react'
import { Container } from 'react-bootstrap'
import ListServices from './ListServices'
import './styleService.css'

const Services = () => {
    return (
        <div
            className='services-wrap'
            style={{
                backgroundImage: 'url(background2.jpg)',
            }}
        >
            <Container>
                <h2 style={{
                    textAlign: 'center',
                    margin: '2rem 0 1rem',
                    color: "#fff",
                    paddingTop: "2rem"
                }}>Виды услуг</h2>
                <ListServices />
            </Container>
        </div>

    )
}

export default Services