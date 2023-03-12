import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { BsArrowRight } from 'react-icons/bs'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

function Login() {
  const [showPass, setShowPass] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <div className="stack flex justify-end sm:justify-center">
      <div className="mx-4 flex justify-end sm:justify-center">
        <div className="flex flex-col place-content-center w-full sm:w-96">
          <header className="my-3 mt-10">
            <p className="mx-2 text-2xl">Welcome Back</p>
          </header>
          <main className="flex flex-col">
            <form onSubmit={onSubmit}>
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
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  className="rounded-l-xl w-full p-2"
                />
                <img
                  src={visibilityIcon}
                  alt="show password"
                  onClick={() => setShowPass((prevState) => !prevState)}
                  className="rounded-r-xl p-2 bg-white"
                />
              </div>
              <div className="flex justify-end m-3">
                <Link
                  to="/recover"
                  className="text-lg font-bold text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="flex flex-row justify-between sm:justify-start p-3 mt-6">
                <p className="text-3xl self-center font-bold">Login</p>
                <button className="btn btn-lg btn-circle ml-4 bg-neutral hover:bg-primary">
                  <BsArrowRight size={45} />
                </button>
              </div>
            </form>
            <OAuth />
            <div className="flex justify-center m-4">
              <div className="flex flex-col">
                <p className="flex justify-center">Don't have an account?</p>
                <Link
                  to="/register"
                  className="flex justify-center font-bold text-xl text-primary hover:underline"
                >
                  Register
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
