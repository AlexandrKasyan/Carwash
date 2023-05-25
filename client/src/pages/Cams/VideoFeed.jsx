import React from "react";
import { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoFeed = ({ src }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState();

  useEffect(() => {
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      setPlayer(
        videojs(videoElement, {}, () => {
          console.log("player is ready");
        })
      );
    }

  }, [videoRef, player]);

  useEffect(() => {
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [player]);

  return (
    <div>
      <video className="video-js" ref={videoRef} controls>
        <source className='test' src={src} type="application/x-mpegURL" />
      </video>
    </div>
  );
};


export default VideoFeed;
