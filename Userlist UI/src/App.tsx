import React from 'react';
import './App.css';

import Userlist from './components/userList/Userlist';
import Userinfo from './components/userInfo/Userinfo';
import { useSelector } from 'react-redux';
import { IRootState } from './interface';

function App() {
  const userProfileData = useSelector((state: IRootState) => state.userProfile);
  return (
    <div className="App d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row  ">
          <div className="col-12 col-md-10 box border overflow-auto ">
            <Userlist />
          </div>
          <div className="col-2">
            {userProfileData.length !== 0 ? <Userinfo user = {userProfileData[0].user}/> : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
