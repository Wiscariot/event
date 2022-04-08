// import { userInfo } from "os"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
// import { createStore } from "redux"
import { useSelector, useDispatch } from 'react-redux'
// import { logOff, logIn } from "../reducers/loginReducer"
// import background from '../misc/pablo-heimplatz-ZODcBkEohk8-unsplash.jpg'


const DropMenu = ({ closeMenu }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  // const loggedIn = useSelector(state => state.login)
  const [signUp,setSignUp] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const [loginInfo, setInfo] = useState({ username: '', password:'' })
  
  

  const logIn = async () => {
      
    const user = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      })
      .then((res) => res.json())
      .then((data) => {
        return data
      })
      console.log(user);

      if(user._id) {
        console.log(user);
        setLoggedIn(true)
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        router.push('/')
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
    
  const handleClick = () => signUp ? sendSignUp() : logIn()

  const disableButton = () => {
    
  }

  const style = {
    body:{
      display: ','
    },
    form: {
      fontFamily: "'Oswald', sans-serif",
      padding: 32,
      width: '30%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#444950', 
      color: 'white',
      justifyContent: 'center',
      // selfAlign: 'end'
    },
    input: {
      height: 35,
      width: 350,
      margin: '16px 0px',
      border: 'none',
      color: 'white',
      backgroundColor: 'inherit',
      borderBottom: 'solid grey 2px'
    },
    image: {
      width: '25%'
    },
    loginCard: {
      marginLeft: '25%',
      marginTop: '5%',
      display: 'flex',
      height: 700,
      width: '100%',
    },
    textButton: {
      fontSize: 20,
      marginRight: 10,
      opacity: .5,
    },
    button: {
      cursor: 'pointer',
      backgroundColor: '#e2c74c',
      marginTop: 32,
      height: 35,
      width: 350,
      fontWeight: 'bold',
    },
  }

  return (
    <div style={style.body}>
      <div style={style.loginCard}>
        <div id="hero" className="hero" style={style.image}>
          <h1 style={{ color: '#e2c74c', fontSize: '500%' }}>
            Event.
          </h1>
        </div>
        <div style={style.form}>
          <div>
            <div style={{ display: 'flex' }}>
              <span 
                onClick={() => setSignUp(false)}
                style={{
                  ...style.textButton, 
                  cursor: 'pointer', 
                  opacity: signUp ? .5 : 1,
                  transition: 'ease-in-out .35s'
              }}>
                Login
              </span>
              <span style={style.textButton}>
                or
              </span>
              <span 
                onClick={() => setSignUp(true)}
                style={{
                  ...style.textButton, 
                  cursor: 'pointer',
                  opacity: !signUp ? .5 : 1
              }}>
                Sign up
              </span>
            </div>
            <h2 style={{ color: '#e2c74c' }}>{ signUp ? "Sign up" : "Login"}</h2>
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
          <input 
            id="passwordCheck"
            placeholder="Re-enter password" 
            style={{...style.input, visibility: !signUp ? 'hidden' : ''}} 
            type="password" 
          />
          { error && 
            <small>{ error }</small> 
          }
          <button onClick={handleClick} style={style.button}>
            { 
            signUp 
              ? 'SIGN UP' 
              : 'LOGIN' 
            }
          </button>
          <p 
            className="hover"          
            onClick={() => setSignUp(!signUp)}
            style={{ 
              cursor: 'pointer', 
              color: '#e2c74c',
            }}  
          >
            { 
              signUp  
              ? 'I already have an account'
              : 'Create an account'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default DropMenu