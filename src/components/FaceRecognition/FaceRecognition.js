import React from 'react';
import './FaceRecognition.css';
import BoundingBoxes from '../BoundingBoxes/BoundingBoxes';

const FaceRecognition = ({ imgUrl, boxes }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img alt='' id='inputimage' src={imgUrl} />
				<BoundingBoxes boxes={boxes}/>

			</div>
		</div>
	);
};

export default FaceRecognition;
