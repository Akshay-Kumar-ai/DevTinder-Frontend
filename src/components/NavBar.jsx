import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((appStore) => appStore.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(Base_Url + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/">
            <p className="btn btn-ghost bg-base-100 text-xl">❤️DevTinder</p>
          </Link>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <p>Welcome {user.firstName}</p>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user.photoUrl
                        ? user.photoUrl
                        : "https://imgs.search.brave.com/4SDZoxsmqy8oZLFsrc5e_aHVkYc4xZUh2T3Un4eaRuE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjQv/NzY2Lzk1OC9zbWFs/bC9kZWZhdWx0LW1h/bGUtYXZhdGFyLXBy/b2ZpbGUtaWNvbi1z/b2NpYWwtbWVkaWEt/dXNlci1mcmVlLXZl/Y3Rvci5qcGc"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">
                    <p className="justify-between">
                      My Profile
                      {/* <span className="badge">New</span> */}
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">
                    <p>My Connections</p>
                  </Link>
                </li>
                <li>
                  <Link to="/requests">
                    <p>My Requests</p>
                  </Link>
                </li>
                <li>
                  <p onClick={handleLogout}>Logout</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
