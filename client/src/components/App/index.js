import React from 'react';
import SideBar from '../SideBar';
import Header from '../Header';
import Main from '../Main';

import './style.css';

const App = () => (
  <div className="App">
    <SideBar>
      <Header />
      <Main />
    </SideBar>
  </div>
);

export default App;
