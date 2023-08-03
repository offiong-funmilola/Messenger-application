import SignIn from "./Components/SignIn";
import {MessengerProvider} from './Context/MessengerContext'
import Chat from './Components/Chat'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Protected from "./Components/Protected";

function App() {
  return (
    <>
      <MessengerProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<SignIn />}/>
            <Route path='/' element={
              <Protected>
                <Chat/>
              </Protected>
            }/>
            <Route path="/chat" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </MessengerProvider>
    </>
  );
}

export default App;
