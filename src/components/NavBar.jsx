import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Base_Url } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((appStore) => appStore.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(Base_Url + "/logout");
      dispatch(removeUser());
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
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">
                    <p className="justify-between">
                      Profile
                      {/* <span className="badge">New</span> */}
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <p>Settings</p>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <p onClick={handleLogout}>Logout</p>
                  </Link>
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
