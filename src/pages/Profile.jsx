import { useEffect, useState } from 'react'
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Profile() {
  const [user, setUser] = useState()
  const [changeDetails, setChangeDetails] = useState(false)

  const auth = getAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      if (user.displayName !== formData.name) {
        await updateProfile(user, {
          displayName: formData.name,
        })
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {
          name: formData.name,
        })
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u)
        setFormData({
          name: u.displayName,
          email: u.email,
        })
      }
    })
  }, [])

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('user')
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <div>
      <header className="flex flex-row justify-between m-3">
        <p className="text-3xl font-bold">My Profile</p>
        <button
          type="button"
          onClick={onLogout}
          className="btn"
        >
          Logout
        </button>
      </header>
      <main>
        <div className="flex flex-row justify-between m-3">
          <p className="text-2xl text-underline">Personal Details</p>
          <p
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
            className="text-xl font-bold text-primary"
          >
            {changeDetails ? 'done' : 'update'}
          </p>
        </div>
        <div className="bg-base-200">
          <form className="flex flex-col">
            <div className="mx-auto my-2 border-primary">
              <input
                type="text"
                id="name"
                className={
                  !changeDetails
                    ? 'input input-accent w-full max-w-xs font-bold'
                    : 'input input-primary w-full max-w-xs'
                }
                disabled={!changeDetails}
                value={formData.name}
                onChange={onChange}
              />
            </div>
            <div className="mx-auto my-2">
              <input
                type="email"
                id="email"
                className={
                  !changeDetails
                    ? 'input input-accent w-full max-w-xs font-bold'
                    : 'input input-primary w-full max-w-xs'
                }
                disabled={!changeDetails}
                value={formData.email}
                onChange={onChange}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
export default Profile
