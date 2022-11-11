import './App.css';
import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup_Signin from './components/signup_signin'; 
import Profile from './components/profile/profile_index';
import Forgot_Password from'./components/forgot_password/forgot_index';
import PageNotFound from './components/page_not_found';

class App extends Component {


  render() {
    return (
      <div>    
     <BrowserRouter>
          <Routes>
              <Route exact path="/forgotpassword" element={  <Forgot_Password/> }/>
              <Route exact path="/" element={  <Signup_Signin/> }/>
              <Route exact path="/profile" element={ <Profile/> }/>
              <Route exact path="*" element={ <PageNotFound/> }/>

          </Routes>
      </BrowserRouter>
    </div>
    );
  }
}
export default App;


