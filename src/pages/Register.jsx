import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { BsArrowRight } from 'react-icons/bs'
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import OAuth from '../components/OAuth'

function Register() {
  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, { displayName: name })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      delete formDataCopy.password2
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (err) {
      toast(err.message)
    }
  }

  return (
    <div className="mx-4 flex justify-end sm:justify-center">
      <div className="flex flex-col w-full sm:w-96">
        <header className="my-3">
          <p className="mx-2 text-2xl font-bold">Create New Account</p>
        </header>
        <main className="flex flex-col">
          <form onSubmit={onSubmit}>
            <div className="flex flex-row p-2">
              <input
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={onChange}
                className="rounded-xl w-full p-2"
              />
            </div>
            <div className="flex flex-row p-2">
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
                className="rounded-xl w-full p-2"
              />
            </div>
            <div className="flex flex-row p-2">
              <input
                type={showPass1 ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
                className="rounded-l-xl w-full p-2"
              />
              <img
                src={visibilityIcon}
                alt="show password"
                onClick={() => setShowPass1((prevState) => !prevState)}
                className="rounded-r-xl p-2 bg-white"
              />
            </div>
            <div className="flex flex-row p-2">
              <input
                type={showPass2 ? 'text' : 'password'}
                placeholder="Confirm Password"
                id="password2"
                value={password2}
                onChange={onChange}
                className="rounded-l-xl w-full p-2"
              />
              <img
                src={visibilityIcon}
                alt="show password"
                onClick={() => setShowPass2((prevState) => !prevState)}
                className="rounded-r-xl p-2 bg-white"
              />
            </div>
            <div className="flex flex-row justify-between sm:justify-start p-3 mt-6">
              <p className="text-3xl self-center font-bold">Register</p>
              <button className="btn btn-lg btn-circle ml-4 bg-neutral hover:bg-primary">
                <BsArrowRight size={45} />
              </button>
            </div>
          </form>
          <OAuth />
          <div className="flex justify-center m-4">
            <div className="flex flex-col">
              <p className="flex justify-center">Already have an account?</p>
              <Link
                to="/login"
                className="flex justify-center font-bold text-lg text-primary"
              >
                Login
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Register
