import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EventCard from '../components/EventCard'
import Header from '../components/Header'

const Home: NextPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)


  const style = {
   
    newEvent: {
      margin: '18px auto',
      cursor: 'pointer',
      display: 'flex',
      height: 100,
      maxWidth: 650,
      justifyContent: 'center',
      alignItems: 'center',
      border: 'dashed grey 3px', 
    },
  }

  const fetchEvents = () => {
    setLoading(true)
    fetch('api/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.data)
        setLoading(false)
      })
  }
  useEffect(fetchEvents, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedIn(true)
      // noteService.setToken(user.token)
    }
  }, [])


  return (
    <div>
      <Header />
      <div style={style.body}>
        { loggedIn && 
        <div  style={style.newEvent}>
          <a href="/newEvent">
            <h3>
              + NEW EVENT
            </h3>
          </a>
        </div>
        }
        { !loading &&
          events.map(event => <EventCard key={event._id} event={event} />)
        }
      </div>
    </div>
  )
}

export default Home
