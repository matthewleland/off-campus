import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/layout/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Recover from './pages/Recover'
import Explore from './pages/Explore'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <Router>
        <div className="h-screen bg-base-200">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Explore />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/recover"
              element={<Recover />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute />}
            >
              <Route
                path="/profile"
                element={<Profile />}
              />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
