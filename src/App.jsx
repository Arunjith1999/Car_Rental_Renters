import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import RequestHistory from './components/Cars/RequestHistory';
// import Cars from './components/Cars/Cars';

function App() {
  

  return (
   <div className='App'>
    <Toaster/>
    <Router>
      <Routes>
        <Route path='/' element = {<Login/>}></Route>
        <Route path = '/signup' element = {<Signup/>}></Route>
        <Route path ='/home' element = {<Home/>}></Route>
        <Route path='/requested_car' element={<RequestHistory/>}></Route>
      </Routes>
    </Router>

      
   </div>
 )
}

export default App
