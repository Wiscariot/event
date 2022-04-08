import Link from "next/link"
import { useState } from "react";
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { logOff } from "../reducers/loginReducer";

const Header = ({ logOff }) => {

  const style = {
    header: {
      position:'sticky',
      top: 0,
      display: 'flex',
      padding: '0 15px',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#303338', 
      marginTop: 0 
    },
    login: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      color: '#e2c74c',
      height: 50,
      width: 50,
      fontSize: '150%',
      backgroundColor: 'inherit',
      border: 'solid #e2c74c 2px',
    }
  }

    return (
      < >
      <div style={style.header}>
        <h1 style={{ color: '#e2c74c' }}>
          <Link href="/">
            Event.
          </Link>
        </h1>

        <div onClick={logOff} style={style.login}>
          <RiLogoutBoxRLine  />
        </div>
      </div>
      </>
    )
}

export default Header