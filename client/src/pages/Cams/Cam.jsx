import React from 'react'
import VideoFeed from "./VideoFeed";
import './style.css'
import { Container } from "react-bootstrap";


const Cam = () => {

    const listIpCamSrc = [
        'http://127.0.0.1:8083/stream/ipcam/channel/0/hls/live/index.m3u8',
        'http://127.0.0.1:8083/stream/ipcam/channel/1/hls/live/index.m3u8',
        'http://127.0.0.1:8083/stream/ipcam/channel/2/hls/live/index.m3u8',
        'http://127.0.0.1:8083/stream/ipcam/channel/3/hls/live/index.m3u8'
    ]


    return (
        <div className='cam-warap'
            style={{
                backgroundImage: 'url(krasivo-foto-19.jpg)'
            }}>
            <Container className='ip-cam-container' >
                <h2 style={{
                    textAlign: 'center',
                    margin: '0rem 0 2rem',
                    color: "#fff",
                    paddingTop: "2rem"
                }}>Онлайн трансляции</h2>
                <div className='ip-cam-list'>
                    {
                        listIpCamSrc.map((src, index) =>
                            <div
                                key={index}
                                className='ip-cam-box'>
                                <VideoFeed className='ip-cam' src={src} />
                                <h4 className='mt-2' style={{ textAlign: 'center' }}>Camera {index + 1}</h4>
                            </div>
                        )
                    }
                </div>
            </Container >
        </div>
    )
}

export default Cam