import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiCheckSquare, FiDivideSquare, FiXSquare } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
// import EventCard from '../components/EventCard'
import Header from '../../components/Header'

const Event: NextPage = () => {
  const router = useRouter()
  const eventId = router.query.id
  const [answers, setAnswers] = useState({ yes: [], no: [], maybe: [] })
  const [event, setEvent] = useState([])
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  const { name, startTime, location, _id, endTime, description, rsvp } = event

  

  const fetchEvent = () => {
    fetch(`http://localhost:3000/api/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.data)
        setLoading(false)
      })
      .catch(err => console.log('error: ', err))
  }
  // const fetchAnswers = () => {
  //   fetch(`http://localhost:3000/api/answers/${eventId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const filteredByAnswer = { yes: [], no: [], maybe: []}
  //       data.data.map(item => item ? filteredByAnswer[item.answer].push(item) : '')
  //       setAnswers(data.data)
  //       setLoading(false)
  //     })
  //     .catch(err => console.log('error: ', err))
  // }

  const prime = () => {
    fetchEvent()
    if(rsvp) {
      setAnswers(rsvp)
    }
    // fetchAnswers()
  }

  useEffect(prime, [])
  
  
  
  const style = {
    event: {
      margin: '2% auto',
      maxWidth: 750,
      // margin: 16,
      color: '#e2c74c',
      // height: '80vh',
      // padding: 8,
      backgroundColor: '#303134',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    answers: {
      justifyContent: 'center',
      display: 'flex',
      margin: '2% auto',
      maxWidth: 750,
      color: '#e2c74c',
      padding: 16,
      backgroundColor: '#303134',
      // justifySelf: 'end',
    },
    option: {
      cursor: 'pointer',
      display: 'flex',
      marginRight: 24,
    },
    icon: {
      fontSize: '150%',
      marginRight: 4,
      marginBottom: 8,
    },
    header: {
      width: '100%',
      height: 100,
    },
    participation: {
      borderRadius: 50,
      alignItems: 'center',
      display: 'grid',
      gridTemplateColumns: '32% 38% 10% 20%',
      cursor: 'pointer',
      backgroundColor: '#1c1e21',
      padding: 18,
      marginBottom:16,
      width: 450,
    },
    participationIcon: {
      marginRight: -10,
      fontSize: 35,
      textShadow: '-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;0 0 3px #000',
    }
  }
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedIn(true)
    }
  }, [])

  return (
    <>
      <Header />
      <div>
        { loading && <p>LOADING...</p>}
        { !loading && 
        <>
          <div style={style.event}>
            <h3>{name}</h3>
          </div>
          <div className='rsvp' style={style.answers}>
              <div className='hover' style={{...style.option, color: '#3ab7b4'}}>
                <FiCheckSquare style={style.icon} />
                <strong>
                  YES
                </strong>
              </div>
              <div className='hover' style={{...style.option, color: '#b038ac'}}>
                <FiDivideSquare style={style.icon} />
                <strong>
                  MAYBE
                </strong>
              </div>
              <div className='hover' style={{...style.option, color: '#f430a5'}}>
                <FiXSquare style={style.icon} />
                <strong>
                  NO
                </strong>
              </div>
            </div>
          <div style={style.event}>
            <p>{startTime} - {endTime}</p>
            <strong>
              {location.name} 
            </strong>
            <p>{description}</p>
            <i>
            - {location.address}
            </i>
       
            <div style={{ margin: '16px' }}>
              <div style={{...style.participation, color: '#3ab7b4'}}>
                <strong>
                  YES:
                </strong>
                <div style={{ marginLeft: '24px', marginRight: '8px'}}>
                  { answers.yes.map( (answer, i) => { 
                    if (answer && i < 5) {
                      return <FaUserCircle style={{ ...style.participationIcon, color: '#3ab7b4' }} />
                    }
                  })
                  }
                </div>
                <p style={{ visibility: answers.yes.length < 5 ? 'hidden' : '', marginRight: 16}}>...</p>
                <p>
                  {`${answers.yes.length} persons`}
                </p>
              </div>
              <div style={{...style.participation, color: '#b038ac'}}>
                <strong>
                  MAYBE:
                </strong>
                <div style={{ marginLeft: '24px', marginRight: '8px'}}>
                  { answers.maybe.map( (answer, i) => { 
                    if (answer && i < 5) {
                      return <FaUserCircle style={{ ...style.participationIcon }} />
                    }
                  })
                  }
                </div>
                <p style={{ visibility: answers.maybe.length < 5 ? 'hidden' : '', marginRight: 16}}>...</p>
                <p>
                  {`${answers.maybe.length} persons`}
                </p>
              </div>
              <div style={{...style.participation, color: '#f430a5' }}>
                <strong>
                  NO:
                </strong>
                <div style={{ marginLeft: '24px', marginRight: '8px'}}>
                  { answers.no.map( (answer, i) => { 
                    if (answer && i < 5) {
                      return <FaUserCircle style={{ ...style.participationIcon }} />
                    }
                  })
                  }
                </div>
                <p style={{ visibility: answers.no.length < 5 ? 'hidden' : '', marginRight: 16}}>...</p>
                <p>
                  {`${answers.no.length} persons`}
                </p>
              </div>
            </div>
          </div>
        </>
        }
      </div>
    </>
  )
}

export default Event
