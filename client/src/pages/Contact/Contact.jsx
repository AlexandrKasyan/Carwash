import React from 'react'
import { Container } from "react-bootstrap";

import './contact.css'

const Contact = () => {
  return (
    <div 
    className='contact-wrap'
    style={{backgroundImage: 'url(background3.jpg)'}}>
      <Container className='mt-5'>
        <div
          className='contact-page'
        >
          <div className='contact-left-part animation-left'>
            <h4>Контакты</h4>
            <h5>+375447977070</h5>
            <h6>г. Мозырь, ул. Интернациональная 121</h6>
            <div>ЧПТУП "Авеню Голд" <br />
              УНП: 192554282</div>
          </div>
          <div className='contact-map-right-part animation-right'>
            <iframe
              className='google-map'
              src="https://yandex.by/map-widget/v1/?ll=29.249837%2C52.026910&mode=poi&poi%5Bpoint%5D=29.249900%2C52.026931&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D49631155148&z=20.63"
              frameBorder={1}
              title='map'
              allowFullScreen={true}>
            </iframe>
          </div>
        </div>
      </Container>
    </div>

  )
}

export default Contact