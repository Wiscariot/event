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
      backgroundColor: 'grey', 
      marginTop: 0 
    },
    login: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      height: 50,
      width: 50,
      fontSize: '150%',
      backgroundColor: 'inherit',
      border: 'solid black 2px',
    }
  }

    return (
      < >
      <div style={style.header}>
        <h1>
          <Link href="/">
            EVENT.
          </Link>
        </h1>

        <div onClick={() => setMenu(!showMenu)} style={style.login}>
          <ImMenu  />
        </div>
      </div>
      { showMenu &&
        <DropMenu />
      }
      </>
    )
}

export default Header