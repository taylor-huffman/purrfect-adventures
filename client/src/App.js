import './App.css';
import React, { useContext } from 'react'
import Account from './components/Account'
import Adventures from './components/Adventures'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './context/user';
import { Bars } from 'react-loader-spinner'

function App() {

  const { isAuth, isLoading, authErrors, setAuthErrors } = useContext(UserContext)

  const spinner = <div style={{ width: '100%', height: '100%' }}>
    <div style={{ position: 'absolute', top: '40%', left: 'calc(50% - 30px)' }}>
      <Bars
        height="50"
        width="50"
        color="#000000"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  </div>

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Routes>
        <Route path='/' element={
          isLoading ? spinner : isAuth ? (
            <Adventures />
          ) : (
            <Login authErrors={authErrors} setAuthErrors={setAuthErrors} />
            // <Navigate to="/login" authErrors={authErrors} setAuthErrors={setAuthErrors} />
          )
        }/>
        <Route path='/adventures' element={
          isLoading ? spinner : isAuth ? (
            <Adventures />
          ) : (
            <Login authErrors={authErrors} setAuthErrors={setAuthErrors} />
            // <Navigate to="/login" authErrors={authErrors} setAuthErrors={setAuthErrors} />
          )
        }/>
        <Route path='/account' element={
          isLoading ? spinner : isAuth ? (
            <Account />
          ) : (
            <Login authErrors={authErrors} setAuthErrors={setAuthErrors} />
            // <Navigate to="/login" authErrors={authErrors} setAuthErrors={setAuthErrors} />
          )
        }/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
