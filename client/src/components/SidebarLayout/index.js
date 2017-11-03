import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar';
import { logout } from '../../interactions/auth';
import { fetchUser } from '../../interactions/user';

const Container = styled.div`
  height: 100%;
  display: flex;
  min-height: 525px;

  flex-direction: row;

  @media (max-width: 700px) {
    min-height: 50px;
    flex-direction: column;
  }
`;

const MainContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


const Main = styled.div`
  background: #ffffff;
  flex-grow: 1;
  margin-left: 25%;

  @media (max-width: 700px) {
    margin: 0;
  }
`;

class SidebarLayout extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    if (this.props.role === 'pending') {
      return (<Redirect to="/verify" />);
    }

    return (
      <Container>
        <Sidebar {...this.props} />
        <Main>
          <MainContainer>
            {this.props.children}
          </MainContainer>
        </Main>
      </Container>
    );
  }
}

SidebarLayout.propTypes = ({
  children: PropTypes.node.isRequired,
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
});

const mapStateToProps = state => ({
  ...state.user,
  role: state.auth.role,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ logout, fetchUser }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLayout);
