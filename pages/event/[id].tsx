import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import EventCard from '../components/EventCard'
import Header from '../../components/Header'

const Home: NextPage = () => {
  const router = useRouter()
  const eventId = router.query.id
  
  const [event, setEvent] = useState([])
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  const { name, startTime, location, _id, endTime } = event
  
  const style = {
    div: {
      margin: 16,
        padding: 8,
        backgroundColor: 'lightgrey',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
    },
  }

  const fetchEvent = () => {
    setLoading(true)
    fetch(`http://localhost:3000/api/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.data)
        setLoading(false)
      })
      .catch(err => console.log('error: ', err))
  }
  useEffect(fetchEvent, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedIn(true)
      // noteService.setToken(user.token)
    }
  }, [])


  return (
    <>
      <Header />
      <div>
        { loading && <p>LOADING...</p>}
        { !loading && 
        <>
          <div style={style.div}>
            <h1>{name}</h1>
            <p>{startTime} - {endTime}</p>
          </div>
          <div style={style.div}>
            <strong>
              {location.name} 
            </strong>
            <p>
            - {location.address}
            </p>
          </div>
          <div style={style.div}>
            RSVP:
          </div>
        </>
        }
      </div>
    </>
  )
}

export default Home
