import { useState } from "react"
// import { createStore } from "redux"
import { useSelector, useDispatch } from 'react-redux'
import { logOff, logIn } from "../reducers/loginReducer"


const DropMenu = () => {
  const dispatch = useDispatch()
  // const loggedIn = useSelector(state => state.login)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginInfo, setInfo] = useState({ userName: '', password:'' })
  

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
      backgroundColor: 'lightgrey', 
      marginTop: 0,
      selfAlign: 'end'
    },
    input: {
      height: 35,
      margin: '16px 0px',
      border: 'none',
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

  const logIn = () => window.localStorage.setItem('loggedInUser', JSON.stringify(loginInfo)) || setLoggedIn(true)

  const handleClick = () => {
    loggedIn
    ? 
    : window.localStorage.removeItem('loggedInUser')
  }

  return (
    <div style={style.dropmenu}>
      { !loggedIn &&
        <div>
          <input 
            onChange={e => setInfo({ ...loginInfo, userName: e.target.value })}
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
          <button onClick={handleClick} style={style.login}>
            Login
          </button>
        </div>
      }
      { loggedIn &&
        <div>
          <button onClick={handleClick} style={style.login}>
            Log Off
          </button>
        </div>
      }
    </div>
  )
}

export default DropMenu