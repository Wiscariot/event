import { FiXSquare, FiCheckSquare, FiDivideSquare } from 'react-icons/fi'
import { GiPartyPopper } from 'react-icons/gi'
import Link from 'next/link';

type Event = {
  _id: string,
  name: String,
  startTime: Date,
  endTime: Date,
  description: String,
  location: String,
  rsvp: Answer[],
}

type Answer = {
  user: String;
  answer: 'YES' | 'NO' | 'MAYBE';
  event: String;
}

const EventCard = ({ event, color }) => {
  const { name, startTime, location, _id, endTime } = event;
  const user = JSON.parse(localStorage.getItem('loggedInUser'))

  const sendAnswer = async (answer:Answer) => {
    await fetch('/api/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: event._id, user, answer }),
    })
}

  const style = {
    eventcard: {
      opacity: .8,
      color: '#bdc1c6',
      zIndex: 0,
      margin: '18px auto',
      cursor: 'pointer',
      display: 'grid',
      maxWidth: 650,
      gridTemplateColumns: '30% 50% 20%',
      marginBottom: 0,
      height: 120,
      alignItems: 'center',
      backgroundColor: '#303134',
    },
    photo : {
      backgroundColor: '#444950',
      color,
      height: 120,
      width: 130,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '350%',
    },
    info: {
      paddingLeft: 16,
      display: 'flex',
      flexDirection: 'column',
    },
    answers: {
      color,
      marginTop: 6,
      display: 'flex',
      flexDirection: 'column',
      marginRight: 16,
      justifySelf: 'end',
    },
    option: {
      display: 'flex',
    },
    icon: {
      fontSize: '150%',
      marginRight: 4,
      marginBottom: 8,
    },
  }

    return (
      <div 
        className='hover-2' 
        id={`eventCard-${_id}`} 
        style={style.eventcard}
      >
        <Link href={{ pathname: "/event", query: { id: _id } }}>
          <div style={style.photo}>
            <GiPartyPopper />
          </div>
        </Link>
        <Link href={`/event/${_id}`}>
          <div style={style.info}>
            <small>
              { `${startTime} - ${endTime}` }
            </small>
            <strong style={{ color }} className='event-name'>
              { name }
            </strong>
            <p style={{ margin: 0 }}>
              { `${location.name} - ${location.address}` }
            </p>
          </div>
        </Link>
            <div className='rsvp' style={style.answers}>
              <div onClick={() => sendAnswer('YES')} className='hover' style={style.option}>
                <FiCheckSquare style={style.icon} />
                <strong>
                  YES
                </strong>
              </div>
              <div onClick={() => sendAnswer('MAYBE')}  className='hover' style={style.option}>
                <FiDivideSquare style={style.icon} />
                <strong>
                  MAYBE
                </strong>
              </div>
              <div onClick={() => sendAnswer('NO')}  className='hover' style={style.option}>
                <FiXSquare style={style.icon} />
                <strong>
                  NO
                </strong>
              </div>
            </div>
        </div>
    )
}

export default EventCard