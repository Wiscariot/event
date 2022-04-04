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

  const style = {
    eventcard: {
      color: '#bdc1c6',
      zIndex: 1,
      margin: '18px auto',
      cursor: 'pointer',
      display: 'grid',
      maxWidth: 650,
      gridTemplateColumns: '30% 50% 20%',
      marginBottom: 0,
      height: 120,
      alignItems: 'center',
      backgroundColor: '#303134',
      // justifyContent: 'space-between',
    },
    photo : {
      backgroundColor: '#444950',
      color,
      height: 120,
      width: 130,
      // color: '#444950',
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
// HOVER EFFECT, shameless copy from https://codepen.io/technokami/pen/abojmZa
// let el = document.getElementById(`eventCard-${_id}`)

// const height = el.clientHeight
// const width = el.clientWidth

// el.addEventListener('mousemove', handleMove)

// function handleMove(e) {
  
//   const xVal = e.layerX
//   const yVal = e.layerY
  
//   const yRotation = 20 * ((xVal - width / 2) / width)
  
//   const xRotation = -20 * ((yVal - height / 2) / height)
  
//   const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
  
//   el.style.transform = string
// }

// el.addEventListener('mouseout', function() {
//   el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
// })

// el.addEventListener('mousedown', function() {
//   el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
// })

// el.addEventListener('mouseup', function() {
//   el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
// })

    return (
      <div id={`eventCard-${_id}`} style={style.eventcard}>
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
              <div className='hover' style={style.option}>
                <FiCheckSquare style={style.icon} />
                <strong>
                  YES
                </strong>
              </div>
              <div className='hover' style={style.option}>
                <FiDivideSquare style={style.icon} />
                <strong>
                  MAYBE
                </strong>
              </div>
              <div className='hover' style={style.option}>
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