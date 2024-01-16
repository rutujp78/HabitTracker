import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ModCalendar from './components/ModCalendar'
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import About from './pages/About';
import CreateHabit from './components/CreateHabit';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Heatmap from './components/Heatmap';

function App() {
  const myStorage = window.localStorage;
  const [currentForm, setCurrentForm] = useState('login');
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("username"));
  const [currentToken, setCurrentToken] = useState(myStorage.getItem("token"));
  const [userID, setUserID] = useState(myStorage.getItem('userID'));
  const [habitID, setHabitID] = useState(myStorage.getItem('habitID'));
  // const navigate = useNavigate();

  const toggleForm = (formName) => {
    setCurrentForm(formName);
    Navigate("/");
    // navigate("/");
  }

  const isLoggedIn = currentUser && currentToken;
  const hasHabitID = habitID;

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} myStorage={myStorage} setCurrentUser={setCurrentUser} setCurrentToken={setCurrentToken} setUserID={setUserID} setHabitID={setHabitID} />
        <Routes>
          {
            isLoggedIn ? (
              <>
                <Route path="/" element={hasHabitID ? <ModCalendar userID={`${userID}`} username={`${currentUser}`} currentToken={`${currentToken}`} habitID={`${habitID}`} /> : <CreateHabit userID={userID} currentToken={currentToken} setHabitID={setHabitID} myStorage={myStorage}/>} />
                <Route path="/about" element={<About />} />
              </>
            ) : (
              <>
                <Route path="/" element={currentForm === "login" ? <LoginPage toggleForm={toggleForm} setCurrentUser={setCurrentUser} setCurrentToken={setCurrentToken} setUserID={setUserID} setHabitID={setHabitID} myStorage={myStorage} /> : <Register toggleForm={toggleForm} />} />
                {/* <Route path="/createhabit" element={<CreateHabit userID={userID} currentToken={currentToken} setHabitID={setHabitID} />} /> */}
                {/* <Route path="/register" element={<Register toggleForm={toggleForm} />} /> */}
                <Route path="/about" element={<About />} />
                <Route path='/*' element={<Navigate to="/" />} />
              </>
            )
          }
        </Routes>
      </BrowserRouter>
      <div>
      </div>
    </div>
  )
}

export default App
