import React from 'react';
import './BoundingBoxes.css'

const BoundingBoxes = ({ boxes }) => (
	<div>
		{boxes.map((box, index) => (
			<div
				className='bounding-box'
				style={{
					top: box.topRow,
					right: box.rightCol,
					bottom: box.bottomRow,
					left: box.leftCol,
				}}
				key={`bounding-box${index}`}
			></div>
		))}
	</div>
);

export default BoundingBoxes;
