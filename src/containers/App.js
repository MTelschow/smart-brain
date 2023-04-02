import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImgLinkForm from '../components/ImgLinkForm/ImgLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import './App.css';

const returnClarifyRequestOptions = (imgUrl) => {
	// Your PAT (Personal Access Token) can be found in the portal under Authentification
	const PAT = 'ac3d35e0d8dc4d1bbee253f30514c1c6';
	// Specify the correct user_id/app_id pairings
	// Since you're making inferences outside your app's scope
	const USER_ID = '3d9fh02tmmr6';
	const APP_ID = 'facedetectionbrain';
	// Change these to whatever model and image URL you want to use
	// const MODEL_ID = 'face-detection';
	const IMAGE_URL = imgUrl;

	const raw = JSON.stringify({
		user_app_id: {
			user_id: USER_ID,
			app_id: APP_ID,
		},
		inputs: [
			{
				data: {
					image: {
						url: IMAGE_URL,
					},
				},
			},
		],
	});

	const requestOptions = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: 'Key ' + PAT,
		},
		body: raw,
	};

	return requestOptions;
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imgUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
		};
	}

	calculateFaceLocation = (data) => {
		const clarifyFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const imgage = document.getElementById('inputimage');
		const width = Number(imgage.width);
		const height = Number(imgage.height);
		return {
			leftCol: clarifyFace.left_col * width,
			topRow: clarifyFace.top_row * height,
			rightCol: width - clarifyFace.right_col * width,
			bottomRow: height - clarifyFace.bottom_row * height,
		};
	};

	displayFaceBox = (box) => {
		console.log('box', box);
		this.setState({ box: box });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imgUrl: this.state.input });

		fetch(
			'https://api.clarifai.com/v2/models/face-detection/outputs',
			returnClarifyRequestOptions(this.state.input)
		)
			.then((response) => response.json())
			.then((response) =>
				this.displayFaceBox(this.calculateFaceLocation(response))
			)
			.catch((error) => console.log(error));
	};

	onRouteChange = (route) => {
		if (route === 'home') {
			this.setState({ isSignedIn: true });
		} else if (route === 'signout') {
			this.setState({ isSignedIn: false });
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, imgUrl, route, box } = this.state;
		return (
			<div className='App'>
				<Navigation
					onRouteChange={this.onRouteChange}
					isSignedIn={isSignedIn}
				/>
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank />
						<ImgLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition box={box} imgUrl={imgUrl} />
						<ParticlesBg
							type='lines'
							bg={{ position: 'fixed', zIndex: -1, top: 0, left: 0 }}
						/>
					</div>
				) : route === 'signin' || route === 'signout' ? (
					<div>
						<SignIn onRouteChange={this.onRouteChange} />
						<ParticlesBg
							type='cobweb'
							bg={{ position: 'fixed', zIndex: -1, top: 0, left: 0 }}
						/>
					</div>
				) : (
					<div>
						<Register onRouteChange={this.onRouteChange} />
						<ParticlesBg
							type='cobweb'
							bg={{ position: 'fixed', zIndex: -1, top: 0, left: 0 }}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default App;
