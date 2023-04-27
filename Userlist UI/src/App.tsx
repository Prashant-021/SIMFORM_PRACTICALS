import React from 'react';
import './App.css';

import Userlist from './components/userList/Userlist';
import Userinfo from './components/userInfo/Userinfo';
import Header from './components/Header/Header';

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
      <footer className='bg-light position-absolute w-100 bottom-0'>
        This is footer
      </footer>
    </>
  );
}

export default App;
