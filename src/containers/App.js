import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImgLinkForm from '../components/ImgLinkForm/ImgLinkForm';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImgLinkForm />
        {/* <FaceRecognition /> */}
        <ParticlesBg type="lines" bg={true} />
      </div>
    );
  }
}

export default App;
