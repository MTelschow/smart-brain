import React from "react";
import './ImgLinkForm.css'

const ImgLinkForm = () => {
    return (
        <div>
            <p className="f3 white ">
                {'This Smart Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className="pa3 br3 shadow-5 center form">
                <input className="f4 pa2 w-70 center" type='text' />
                <button className="w-30 grow f4 lnk ph3 pv2 dib black bg-green">Detect</button>
            </div>
        </div>
    );
};

export default ImgLinkForm;
