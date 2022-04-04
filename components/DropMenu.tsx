import { userInfo } from "os"
import { useEffect, useState } from "react"
// import { createStore } from "redux"
import { useSelector, useDispatch } from 'react-redux'
import { logOff, logIn } from "../reducers/loginReducer"


const DropMenu = ({ closeMenu }) => {
  const dispatch = useDispatch()
  // const loggedIn = useSelector(state => state.login)
  const [signUp,setSignUp] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const [loginInfo, setInfo] = useState({ username: '', password:'' })
  

  const style = {
    dropmenu: {
      fontFamily: "'Oswald', sans-serif",
      left: '80%',
      position: 'absolute',
      zIndex: 2,
      margin: 16,
      float: 'right',
      padding: 16,
      width: 250,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#444950', 
      color: 'white',
      marginTop: 0,
      selfAlign: 'end'
    },
    input: {
      height: 35,
      margin: '16px 0px',
      border: 'none',
      color: 'white',
      backgroundColor: 'inherit',
      borderBottom: 'solid black 2px'
    },
    login: {
      cursor: 'pointer',
      marginTop: 8,
      border: 'solid black 1px',
      textAlign: 'center'
    }
  }

  const logIn = async () => {
      const user = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      })
      if(user.ok) {
        setLoggedIn(true)
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        closeMenu()  
      } else {
        setError('wrong credentials')
        setTimeout(() => {
          setError('')
        }, 5000)
      }
  }

  const checkUser = () => {
    if (window.localStorage.loggedInUser) {
       setLoggedIn(true)
    }
  }
  useEffect(checkUser, [])

  const logOff = () => {
    setLoggedIn(false)
    window.localStorage.removeItem('loggedInUser')
  }

  const sendSignUp = async () => {
    const passwordCheck = document.getElementById('passwordCheck').value

    if(loginInfo.password === passwordCheck) {
      const user = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      })
    }
  }
    
  const handleClick = () => {
    return signUp ? sendSignUp()
    : !loggedIn ? logIn()
    : logOff();
  }

  const disableButton = () => {
    
  }

  return (
    <div style={style.dropmenu}>
      { !loggedIn &&
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{ signUp ? "Sign up" : "Login"}</h2>
            <button onClick={() => setSignUp(!signUp)}>
              { !signUp ? "Sign Up" : "Login" }
            </button>
          </div>
          <input 
            onChange={e => setInfo({ ...loginInfo, username: e.target.value })}
            id="username" 
            placeholder="Username" 
            style={style.input} 
            type="text" 
          />
          <input 
            onChange={e => setInfo({ ...loginInfo, password: e.target.value })}
            placeholder="Password" 
            style={style.input} 
            type="password" 
          />
          { signUp &&
            <input 
              id="passwordCheck"
              placeholder="Re-enter password" 
              style={style.input} 
              type="password" 
            />
          }
        </div>
      }
      { error && 
        <small>{ error }</small> 
      }
      <button onClick={handleClick} style={style.login}>
        { 
        signUp ? 'Sign up' 
        : !loggedIn ? 'Login' 
        : 'Log off' }
      </button>
    </div>
  )
}

export default DropMenu