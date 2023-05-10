import React from 'react';
import './App.css';

import Userlist from './components/userList/Userlist';
import Userinfo from './components/userInfo/Userinfo';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {


  return (
    <div className='mainBox'>
      <Header />
      <div className="App ">

        <div className="container">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-12 col-lg-9 mt-lg-0 box border position-relative">
              <Userlist />
              <Userinfo />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
