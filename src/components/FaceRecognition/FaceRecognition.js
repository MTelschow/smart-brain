import React from 'react';
import './FaceRecognition.css';
import BoundingBoxes from '../Bounding-Boxes/Bounding-Box';

const FaceRecognition = ({ imgUrl, box }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img alt='' id='inputimage' src={imgUrl} />
				{/* <div
					className='bounding-box'
					style={{
						top: box.topRow,
						right: box.rightCol,
						bottom: box.bottomRow,
						left: box.leftCol,
					}}
				></div> */}
				<BoundingBoxes boxes={box}/>

			</div>
		</div>
	);
};

export default FaceRecognition;
