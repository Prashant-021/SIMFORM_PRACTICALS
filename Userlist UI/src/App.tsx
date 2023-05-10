import React from 'react';
import './App.css';

import Userlist from './components/userList/Userlist';
import Userinfo from './components/userInfo/Userinfo';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  

  return (
    <>
      <Header/>
      <div className="App d-flex justify-content-center align-items-center">

        <div className="container">
          <div className="row  ">
            <div className="col-12 col-lg-10 mt-5 mt-lg-0 box border overflow-auto ">
              <Userlist />
            </div>
            <div >
               <Userinfo />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default App;
