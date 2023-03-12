import { useNavigate, Link, useLocation } from 'react-router-dom'
import { BsHouse, BsPerson } from 'react-icons/bs'

function Navbar() {
  const navigate = useNavigate()

  return (
    <div className="navbar bg-neutral">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <Link to="/">
            <BsHouse
              size={30}
              className="fill-neutral-content"
            />
          </Link>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-neutral-content">
          Off Campus
        </a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <Link to="/profile">
            <BsPerson
              size={30}
              className="fill-neutral-content"
            />
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Navbar
