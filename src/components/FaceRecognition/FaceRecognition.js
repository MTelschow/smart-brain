import React from 'react';
import './FaceRecognition.css';
import BoundingBoxes from '../BoundingBoxes/BoundingBoxes';

const FaceRecognition = ({ imgUrl, box }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img alt='' id='inputimage' src={imgUrl} />
				<BoundingBoxes boxes={box}/>

			</div>
		</div>
	);
};

export default FaceRecognition;
