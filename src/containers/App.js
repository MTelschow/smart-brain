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
		this.setState({ imgUrl: this.state.input });

		fetch('https://smart-brain-api-99vq.onrender.com/imageurl', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				input: this.state.input,
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
