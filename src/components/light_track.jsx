import React, { useState, useEffect } from "react";
import "./light_track.css";
import spotlight from "./spot_light.png";
import handle from "./handle.png";
import front from "./front.png";
import back from "./back.png";

const LightTrack = () => {
  const [coords, setCoords] = useState({ x: 460, y: 540 });
  const [angle, setAngle] = useState(-112);
  const [scale, setScale] = useState(1.6797826177346047);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const pageX = event.pageX;
      const pageY = event.pageY;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      console.log(pageX ,"+",pageY)

      const boxCenter = [1291, 115]; // Center of the screen
      const calculatedAngle = Math.atan2(
        pageX - boxCenter[0],
        -(pageY - boxCenter[1])
      ) * (180 / Math.PI);

      setCoords({ x: pageX, y: pageY });
      setAngle(calculatedAngle);
    
    
    
    
    // Calculate distance to the top-right corner
    const distanceToTopRight = Math.sqrt(
      Math.pow(screenWidth - event.clientX, 2) + Math.pow(event.clientY, 2)
    );

    // Normalize the distance to a scale factor between 0.5 and 2
    const maxDistance = Math.sqrt(screenWidth ** 2 + screenHeight ** 2);
    const normalizedScale = Math.max(0.5, 2 - (distanceToTopRight / maxDistance) * 1.5);

    console.log(normalizedScale);
    setScale(normalizedScale);
    
    
    };



    



    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="light-track">
      {/* <h1>
        ( X, Y ): ( {coords.x}, {coords.y} )
      </h1> */}
      <div className="container">
        <div className="text_div">
          <pre className="h1">SPOT LIGHT<br></br>
            EFFECT</pre>
          <h3>By yonas ayele</h3>
        </div>
        <img
          src={spotlight}
          alt="Compass"
          className="image"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <img
          src={handle}
          alt="handle"
          className="img_handle"
        />
        <img
          src={back}
          alt="handle"
          className="back"
          style={{ 
            width: `${5500 / scale}px`, // Dynamically scale the image size
            height: `${5500 / scale}px`,
            top: `${coords.y - ((5500 / scale) / 2) }px`,
            left: `${coords.x - ((5500 / scale) / 2)}px`,}}
        />
      </div>
    </div>
  );
};

export default LightTrack;
