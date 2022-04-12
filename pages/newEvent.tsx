import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../components/Header'

const Home: NextPage = () => {
  const router = useRouter()
  const [newEvent, setNewEvent] = useState({ location: { address: '' }})
  const [locations, setLocations] = useState([])

    const getLocations = () => {
      fetch('api/locations')
        .then((res) => res.json())
        .then((data) => {
          setLocations(data.data)
        })
    }
    useEffect(getLocations, [])

    const createEvent = async () => {

      const user = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })
    }

    const createLocation = async () => {
      const user = await fetch('/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent.location),
      })
    }
    
    const handleSubmit = async () => {

      console.log('LOCATION', newEvent.location);
      
      const locationId = isExistingLocation() 
        ? locations.find(location => location.address === newEvent.location.address)._id
        : await createLocation()._id

        console.log('LOCATIONID ', locationId);
      setNewEvent({ ...newEvent, location: locationId })

      createEvent()

    }

  const handleChange = e => {
    setNewEvent({...newEvent, [e.target.name]: e.target.value})
  }

  const handleLocationInfo = e => {
    setNewEvent({...newEvent, location: { ...newEvent.location, [e.target.name]: e.target.value}})
  }

  const isExistingLocation = () => {
    return locations.some( location => location.address === newEvent.location.address)
  }

  const style = {
    form: {
      margin: '2% auto',
      maxWidth: 750,
      color: '#e2c74c',
      padding: 8,
      backgroundColor: '#303134',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      fontFamily: "'Oswald', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 8
    }
  }

  return (
    <div>
      <Header />
      <form name="event" style={style.form}>
        <h1 style={{ marginBottom: 16 }}>New Event.</h1>
        <div style={style.input}>
          Event name
          <input name="name" onChange={handleChange} type="text" />
        </div>
        <div style={style.input}>
          Address
          <input onChange={handleLocationInfo} type="text" name="address" list="locations">
          </input>
           <datalist id="locations">
            { locations && locations.map( location => 
                  <option key={location._id} value={location.address} />
            )} 
            </datalist>
        </div>
        <div style={style.input}>
          Venue Phonenumber
          <input disabled={isExistingLocation()} onChange={handleLocationInfo} style={{ marginBottom: 8 }} name="phoneNumber" type="text" />
        </div>
        <div style={style.input}>
          Venue Website
          <input disabled={isExistingLocation()} onChange={handleLocationInfo} style={{ marginBottom: 8 }} name="website" type="text" />
        </div>
        <div style={style.input}>
          Start
          <input onChange={handleChange} style={{ marginBottom: 8 }} name="startTime" type="datetime-local" />
        </div>
        <div style={style.input}>
          End
          <input onChange={handleChange} style={{ marginBottom: 8 }} name="endTime" type="datetime-local" />
        </div>
        <div style={style.input}>
          Description
          <textarea onChange={handleChange} name="description" />
        </div>
        <button type="button" style={{ marginBottom: 24 }} className='btn' onClick={handleSubmit}>
          Create Event
        </button>
        <button type="button" style={{ marginBottom: 24 }} className='btn' onClick={() => console.log('EVENT ', newEvent)}>
          LOG
        </button>
      </form>
    </div>
  )
}

export default Home
