import React, { Component } from 'react';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			loading: false,
			userMsg: '',
		};
	}

	onNameChange = (event) => {
		this.setState({ name: event.target.value });
	};

	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
	};

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value });
	};

	onSubmitSignIn = () => {
		if (this.state.name === '') {
			return this.setState({ userMsg: 'Provide Name' });
		}
		if (this.state.email === '') {
			return this.setState({ userMsg: 'Provide Email' });
		}
		if (this.state.password === '') {
			return this.setState({ userMsg: 'Provide Password' });
		}


		this.setState({ isLoading: true, userMsg: '' });
		fetch('https://smart-brain-api-99vq.onrender.com/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				} else {
					this.setState({ userMsg: 'Email already used' });
				}
				this.setState({ isLoading: false });
			});
	};

	render() {
		return (
			<article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center '>
				<main className='pa4 black-80'>
					<div className='measure'>
						<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
							<legend className='f1 fw6 ph0 mh0'>Register</legend>

							<div className='mv3'>
								<label className='db fw6 lh-copy f4' htmlFor='name'>
									Name
								</label>
								<input
									className='pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100'
									type='text'
									name='name'
									id='name'
									onChange={this.onNameChange}
								/>
							</div>
							<div className='mv3'>
								<label className='db fw6 lh-copy f4' htmlFor='email-address'>
									Email
								</label>
								<input
									className='pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100'
									type='email'
									name='email-address'
									id='email-address'
									onChange={this.onEmailChange}
								/>
							</div>
							<div className='mv3'>
								<label className='db fw6 lh-copy f4' htmlFor='password'>
									Password
								</label>
								<input
									className='b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100'
									type='password'
									name='password'
									id='password'
									onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						{this.state.userMsg && (
							<div>
								<div className='red b'>{this.state.userMsg}</div>
								<br></br>
							</div>
						)}
						<div className=''>
							<input
								className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
								type='submit'
								value={this.state.isLoading ? 'Loading...' : 'Register'}
								onClick={this.onSubmitSignIn}
							/>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Register;
