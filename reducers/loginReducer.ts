import { createStore } from 'redux'

type Action = {
    type: 'LOGIN' | 'LOGOFF',
    data: {
        user: any,
    }
}

type Login = {
  login: string | '',
}

const loginReducer = (state:Login = { login: '' }, action:Action) => {
    if (action.type === 'LOGIN') {
      return {...state, login: action.data.user }
    } 
    if (action.type === 'LOGOFF') {
      return {...state, login: ''} 
    } 
  
    return state
  }

export const logIn = user => {
  return {
    type: 'LOGIN',
    data: {
      user
    }
  }
}

export const logOff = () => {
  return {
    type: 'LOGOFF',
  }
}
  
export default loginReducer