import SignIn from "./Components/SignIn";
import {MessengerProvider} from './Context/MessengerContext'
import Chat from './Components/Chat'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Protected from "./Components/Protected";

function App() {
  return (
    <>
      <MessengerProvider>
        <Router>
          <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/chat' element={
              <Protected>
                <Chat/>
              </Protected>
            }/>  
          </Routes>
        </Router>
      </MessengerProvider>
    </>
  );
}

export default App;
