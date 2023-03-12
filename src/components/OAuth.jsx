import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'
function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const onGoogle = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // check for user
      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)
      // create new user
      if (!userSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="flex flex-col">
      <p className="my-2 mx-auto">
        Or {location.pathname === '/register' ? 'register' : 'login'} using:
      </p>
      <button
        onClick={onGoogle}
        className="my-3 mx-auto p-2 rounded-full bg-neutral-content"
      >
        <FcGoogle size={65} />
      </button>
    </div>
  )
}

export default OAuth
