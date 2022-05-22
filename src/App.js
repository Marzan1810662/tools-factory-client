import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import Navbar from './Pages/Shared/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
