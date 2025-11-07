import { useState } from 'react'
// import { BrowseRouter, Routes, Route, Link } from 'react-router-dom'

import React from 'react'
import Header from './Header.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import './style/App.css'

export default function App() {

  const [hasAccount, setHasAccount] = useState(true)

  function changeHasAccount() {
    setHasAccount(hasAccount => !hasAccount)
  }

  return (
    <>
      <div>
        <Header />
        {
        (hasAccount) ? 
          <div id='login'>
            <Login 
              changeHasAccount = {changeHasAccount}
            /> 
          </div> : 
          <div id="signup">
            <Signup 
              changeHasAccount = {changeHasAccount}
            />
          </div>
        }
      </div>
    </>
  )

    // return(
    //   <BrowseRouter>
    //     <Routes>
    //       <Route path="/" element={<Login />} />
    //     </Routes>
    //   </BrowseRouter>
    // )
}
