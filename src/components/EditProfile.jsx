import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Base_Url } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
const EditProfile = ({ user }) => {
  //   const user = useSelector((appStore) => appStore?.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about);
  const [skills, setSkills] = useState(user?.skills || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setProfileUrl] = useState(
    user?.photoUrl ||
      "https://imgs.search.brave.com/4SDZoxsmqy8oZLFsrc5e_aHVkYc4xZUh2T3Un4eaRuE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjQv/NzY2Lzk1OC9zbWFs/bC9kZWZhdWx0LW1h/bGUtYXZhdGFyLXBy/b2ZpbGUtaWNvbi1z/b2NpYWwtbWVkaWEt/dXNlci1mcmVlLXZl/Y3Rvci5qcGc"
  );
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        Base_Url + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          gender,
          photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center m-10">
      {showToast && (
        <div className="toast toast-top toast-center z-10">
          <div className="alert alert-success">
            <span className="font-medium">Profile updated successfully !!</span>
          </div>
        </div>
      )}
      {user && (
        <div className="px-5">
          <UserCard
            user={{
              firstName,
              lastName,
              age,
              about,
              skills,
              gender,
              photoUrl,
            }}
            isProfile={true}
          />
        </div>
      )}
      {user && (
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body my-2">
              <h2 className="card-title">Edit Profile</h2>
              <p className="text-sm font-normal card-title">First Name:</p>
              <label className="input validator">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <p className="text-sm font-normal card-title">Last Name:</p>
              <label className="input validator">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <p className="text-sm font-normal card-title">Photo URL:</p>
              <label className="input validator">
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                />
              </label>
              <p className="text-sm font-normal card-title">Age:</p>
              <label className="input validator">
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <p className="text-sm font-normal card-title">Gender:</p>
              <label className="input validator">
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <p className="text-sm font-normal card-title">About:</p>
              <fieldset className="fieldset">
                {/* <legend className="fieldset-legend">Your bio</legend> */}
                <textarea
                  className="textarea h-24"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
                <div className="label">Optional</div>
              </fieldset>

              <div className="card-actions justify-between">
                <p className="text-red-600">{error}</p>
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditProfile;
