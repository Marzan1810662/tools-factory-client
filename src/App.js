import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css'
import NotFound from './Pages/NotFound';
import MyPortfolio from './Pages/MyPortfolio';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyProfile from './Pages/Dashboard/MyProfile';
import AddProduct from './Pages/Dashboard/AddProduct';
import RequireAuth from './Pages/Login/RequireAuth';
import MakeAdmin from './Pages/Dashboard/MakeAdmin';
import RequireAdmin from './Pages/Dashboard/RequireAdmin';
import AddReview from './Pages/Dashboard/AddReview';
import AllTools from './Pages/AllTools';
import ManageProducts from './Pages/Dashboard/ManageProducts';

function App() {
  AOS.init();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/allTools' element={<AllTools />}></Route>
        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard />
        </RequireAuth>}>
          <Route index element={<MyProfile />}></Route>
          <Route path='addReview' element={<AddReview />}></Route>
          <Route path='makeAdmin' element={
            <RequireAdmin>
              <MakeAdmin />
            </RequireAdmin>}></Route>
          <Route path='addProduct' element={
            <RequireAdmin>
              <AddProduct />
            </RequireAdmin>}></Route>
          <Route path='ManageProducts' element={
            <RequireAdmin>
              <ManageProducts />
            </RequireAdmin>}></Route>
        </Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/portfolio' element={<MyPortfolio />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
