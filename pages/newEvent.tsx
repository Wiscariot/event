import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Header from '../components/Header'

const Home: NextPage = () => {
  const [locations, setLocations] = useState([])
  const [event, setEvent] = useState({
    name: '',
    location: '',
    startTime: '',
    endTime: '',
    Description: '',
  })

    const style = {
      form: {
        margin: '18px auto',
        maxWidth: 750,
        // margin: 16,
        color: '#1df199',
        height: '80vh',
        padding: 8,
        backgroundColor: '#303134',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      input: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 8
      }
    }

    const getLocations = () => {
      fetch('api/locations')
        .then((res) => res.json())
        .then((data) => {
          setLocations(data.data)
          // setLoading(false)
        })
    }
    useEffect(getLocations, [])

    const createEvent = async () => {
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

  return (
    <div>
      <Header />
      <form style={style.form} onSubmit={createEvent}>
        <div style={style.input}>
          Event name:
          <input name="eventName" type="text" />
        </div>
        <div style={style.input}>
          Location:
          <input type="text" name="location" list="locations">
          </input>
           <datalist id="locations">
            { locations && locations.map( location => 
                  <option key={location._id} value={location.address}>{location.address}</option>  
            )} 
            </datalist>
        </div>
        <div style={style.input}>
          Start:
          <input style={{ marginBottom: 8 }} name="eventName" type="datetime-local" />
          {/* <input name="eventName" type="time" /> */}
        </div>
        <div style={style.input}>
          End:
          <input style={{ marginBottom: 8 }} name="eventName" type="datetime-local" />
          {/* <input name="eventName" type="time" /> */}
        </div>
        <div style={style.input}>
          Description:
          <input name="eventName" type="textarea" />
        </div>
        <button type="submit">
          Create Event
        </button>
      </form>
    </div>
  )
}

export default Home
