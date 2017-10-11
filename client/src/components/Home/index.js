import React from 'react';
import { Header, Layout, Background, Copy, Logo, CopyBox, ImgBox } from './styles';
import logo from '../../assets/imgs/badge.png';


const Home = () => (
  <Background>
    <Layout>
      <ImgBox>
        <div className="container">
          <div className="row">
            <ImgBox className="col-md-6">
              <Logo src={logo} alt="logo" />
            </ImgBox>
          </div>
        </div>
      </ImgBox>
      <CopyBox>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-6">
              <Header>Who we are</Header>
              <Copy>
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
              </Copy>
              <Copy>Coming Soon...</Copy>
            </div>
          </div>
        </div>
      </CopyBox>
    </Layout>
  </Background>
);

export default Home;
