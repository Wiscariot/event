import { FiXSquare, FiCheckSquare, FiDivideSquare } from 'react-icons/fi'
import { BsCalendar2Event } from 'react-icons/bs'

type Event = {
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

const EventCard = ({ event }) => {
  const { name, startTime, location } = event;

  const style = {
    eventcard: {
      zIndex: 1,
      margin: '18px auto',
      cursor: 'pointer',
      display: 'grid',
      maxWidth: 650,
      gridTemplateColumns: '30% 40% 30%',
      marginBottom: 0, 
      height: 120,
      alignItems: 'center',
      backgroundColor: 'lightgrey',
      // justifyContent: 'space-between',
    },
    photo : {
      height: 120,
      width: 130,
      color: '#474747',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '350%',
      backgroundColor: 'grey',
    },
    info: {
      paddingLeft: 16,
      display: 'flex',
      flexDirection: 'column',
    },
    answers: {
      marginTop: 6,
      display: 'flex',
      flexDirection: 'column',
      marginRight: 16,
      justifySelf: 'end'
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
      <div style={style.eventcard}>
        <div style={style.photo}>
          <BsCalendar2Event />
        </div>
        <div style={style.info}>
          <small>
            { startTime }
          </small>
          <strong className='event-name'>
            { name }
          </strong>
          <p style={{ margin: 0 }}>
            { `${location.name} - ${location.address}` }
          </p>
        </div>
        <div className='rsvp' style={style.answers}>
          <div style={style.option}>
            <FiCheckSquare style={style.icon} />
            <strong>
              YES
            </strong>
          </div>
          <div style={style.option}>
            <FiDivideSquare style={style.icon} />
            <strong>
              MAYBE
            </strong>
          </div>
          <div style={style.option}>
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