import './Styles/App.css';
import TimeList from './Components/TimeList';
import EventCard from './Components/EventCard';
import appointmentsData from '../src/input.json';

function App() {

  return (
      <div className='schedule'>
        <TimeList />
        <EventCard appointmentsData={appointmentsData} />
      </div>
  );
}

export default App;
