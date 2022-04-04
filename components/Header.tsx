import Link from "next/link"
import { useState } from "react";
import { ImMenu } from 'react-icons/im'
import DropMenu from "./DropMenu"

const Header = () => {

  const [showMenu, setMenu] = useState(false);

  const style = {
    header: {
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
      color: '#1df199',
      height: 50,
      width: 50,
      fontSize: '150%',
      backgroundColor: 'inherit',
      border: 'solid #1df199 2px',
    }
  }

    return (
      < >
      <div style={style.header}>
        <h1 style={{ color: '#1df199' }}>
          <Link href="/">
            EVENT.
          </Link>
        </h1>

        <div onClick={() => setMenu(!showMenu)} style={style.login}>
          <ImMenu  />
        </div>
      </div>
      { showMenu &&
        <DropMenu closeMenu={() => setMenu(false)} />
      }
      </>
    )
}

export default Header