import React from 'react';

const BoundingBoxes = ({ boxes }) => (
	<div>
		{boxes.map((box) => (
			<div
				className='bounding-box'
				style={{
					top: box.topRow,
					right: box.rightCol,
					bottom: box.bottomRow,
					left: box.leftCol,
				}}
			></div>
		))}
	</div>
);

export default BoundingBoxes;
