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
      color: '#ee6b66',
      margin: '18px auto',
      maxWidth: 650,
      cursor: 'pointer',
      display: 'flex',
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      border: 'dashed #ee6b66 3px', 
    },
  }

  const colors = [
    '#e2c74c',
    '#b363a1',
    '#61c588',
    '#dc756b',
  ]

  const prime = () => {
    fetchLocations()
    fetchEvents()
  }

  const fetchLocations = () => {
    setLoading(true)
    fetch('api/locations')
      .then((res) => res.json())
      .then((data) => {
        // setEvents(data.data)
        // setLoading(false)
      })
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
  useEffect(prime, [])
  
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
        <div className='hover' style={style.newEvent}>
          <a href="/newEvent">
            <h3>
              + NEW EVENT
            </h3>
          </a>
        </div>
        { (!loading && events) &&
          events.map((event, i) => <EventCard key={event._id} color={colors[i%4]} event={event} />)
        }
      </div>
    </div>
  )
}

export default Home
