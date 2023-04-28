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

const initialState = {
	input: '',
	imgUrl: '',
	boxes: [{}],
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: '',
	},
};

const randomImages = [
	'https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
	'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
	'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
	'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
	'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
];

const getRandomImage = () => {
	return randomImages[Math.floor(Math.random() * randomImages.length)]
}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined,
			},
		});
	};

	calculateFaceLocation = (data) => {
		const clarifyFaces = data.outputs[0].data.regions.map((region) => {
			return region.region_info.bounding_box;
		});

		const imgage = document.getElementById('inputimage');
		const width = Number(imgage.width);
		const height = Number(imgage.height);

		return clarifyFaces.map((face) => {
			return {
				leftCol: face.left_col * width,
				topRow: face.top_row * height,
				rightCol: width - face.right_col * width,
				bottomRow: height - face.bottom_row * height,
			};
		});
	};

	displayFaceBox = (boxes) => {
		this.setState({ boxes: boxes });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		const inputImage = (this.state.input !== '' ? this.state.input : getRandomImage())
		this.setState({ imgUrl: inputImage });

		fetch('https://smart-brain-api-99vq.onrender.com/imageurl', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				input: inputImage,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					fetch('https://smart-brain-api-99vq.onrender.com/image', {
						method: 'put',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							id: this.state.user.id,
						}),
					})
						.then((response) => response.json())
						.then((count) => {
							this.setState(Object.assign(this.state.user, { entries: count }));
						})
						.catch(console.log);
				}
				this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch((error) => console.log(error));
	};

	onRouteChange = (route) => {
		if (route === 'home') {
			this.setState({ isSignedIn: true });
		} else if (route === 'signout') {
			this.setState(initialState);
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, imgUrl, route, boxes } = this.state;
		return (
			<div className='App'>
				<Navigation
					onRouteChange={this.onRouteChange}
					isSignedIn={isSignedIn}
				/>
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank
							name={this.state.user.name}
							entries={this.state.user.entries}
						/>
						<ImgLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition boxes={boxes} imgUrl={imgUrl} />
						<ParticlesBg
							type='lines'
							bg={{ position: 'fixed', zIndex: -1, top: 0, left: 0 }}
						/>
					</div>
				) : route === 'signin' || route === 'signout' ? (
					<div>
						<SignIn
							loadUser={this.loadUser}
							onRouteChange={this.onRouteChange}
						/>
						<ParticlesBg
							type='cobweb'
							bg={{ position: 'fixed', zIndex: -1, top: 0, left: 0 }}
						/>
					</div>
				) : (
					<div>
						<Register
							loadUser={this.loadUser}
							onRouteChange={this.onRouteChange}
						/>
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
