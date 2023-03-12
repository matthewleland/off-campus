import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

import { BsArrowRight } from 'react-icons/bs'
import { toast } from 'react-toastify'

function Recover() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Reset link has been sent')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="stack flex justify-end sm:justify-center">
      <div className="mx-4 flex justify-end sm:justify-center">
        <div className="flex flex-col place-content-center w-full sm:w-96">
          <header className="my-3 mt-10">
            <p className="mx-2 text-2xl">Recover Account</p>
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
              <div className="flex justify-end m-3">
                <Link
                  to="/login"
                  className="text-lg font-bold text-primary hover:underline"
                >
                  Return to Login
                </Link>
              </div>
              <div className="flex flex-row justify-between sm:justify-start p-3 mt-6">
                <p className="text-3xl self-center font-bold">Send Link</p>
                <button className="btn btn-lg btn-circle ml-4 bg-neutral hover:bg-primary">
                  <BsArrowRight size={45} />
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Recover
