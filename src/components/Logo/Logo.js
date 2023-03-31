import React from "react";
import Tilt from "react-parallax-tilt";
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0" style={{height: '150px', width: '150px'}}>
            <Tilt>
                <div className="Tilt pa3" style={{ height: '150px', width: '150px'}}>
                    <img src={brain} alt="brain"/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;