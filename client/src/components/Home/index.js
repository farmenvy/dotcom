import React from 'react';
import { styles } from './styles';
import logo from '../../assets/imgs/badge.png';

const Home = () => (
  <div className="homeBackground" style={styles.background}>
    <div className="container" style={styles.layout}>
      <div className="row">
        <div className="col-md-6">
          <img src={logo} alt="logo" style={styles.logo} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-6">
          <h3 style={styles.header}>Who we are</h3>
          <p style={styles.copy}>
            Farm Envy is a new program that allows you to easily manage all the
            details of your CSA so that your customers are happy and you have more
            time for farming. Farm Envy allows your customers to sign up for your
            CSA online, it will automatically manage payments, organize each pick up
            day and drop off, and allow you to communicate easily with your members.
            Your CSA members will love it because your CSA will run smoothly with
            less mistakes and they can manage most things themselves online!
            It makes it easy for members to sign up, make changes, pay, and even
            let you know about special requests. We are farmers so we know
            how difficult these things are. Farm Envy makes it easy!
          </p>
          <p style={styles.copy}>Coming Soon...</p>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
