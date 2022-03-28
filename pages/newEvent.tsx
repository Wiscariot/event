import type { NextPage } from 'next'
import Header from '../components/Header'

const Home: NextPage = () => {

    const style = {
      form: {
        margin: 16,
        padding: 8,
        backgroundColor: 'lightgrey',
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

  return (
    <div>
      <Header />
      <h1>New Event</h1>
      <form style={style.form}>
        <div style={style.input}>
          Event name:
          <input name="eventName" type="text" />
        </div>
        <div style={style.input}>
          Location:
          <input name="eventName" type="text" />
        </div>
        <div style={style.input}>
          Start:
          <input style={{ marginBottom: 8 }} name="eventName" type="date" />
          <input name="eventName" type="time" />
        </div>
        <div style={style.input}>
          End:
          <input style={{ marginBottom: 8 }} name="eventName" type="date" />
          <input name="eventName" type="time" />
        </div>
        <div style={style.input}>
          Description:
          <input name="eventName" type="textarea" />
        </div>
        <button>
          Create Event
        </button>
      </form>
    </div>
  )
}

export default Home
