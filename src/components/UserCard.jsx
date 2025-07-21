import axios from "axios";
import { useDispatch } from "react-redux";
import { Base_Url } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
const UserCard = ({ user, isProfile }) => {
  const { _id, firstName, lastName, age, about, skills, gender, photoUrl } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        Base_Url + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };
  const profileImg = photoUrl
    ? photoUrl
    : "https://imgs.search.brave.com/4SDZoxsmqy8oZLFsrc5e_aHVkYc4xZUh2T3Un4eaRuE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjQv/NzY2Lzk1OC9zbWFs/bC9kZWZhdWx0LW1h/bGUtYXZhdGFyLXBy/b2ZpbGUtaWNvbi1z/b2NpYWwtbWVkaWEt/dXNlci1mcmVlLXZl/Y3Rvci5qcGc";

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={profileImg} alt="Profile" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {isProfile && (
          <div className="card-actions justify-between mx-10 my-4">
            <button className="btn btn-primary cursor-not-allowed">
              Ignore
            </button>
            <button className="btn btn-secondary cursor-not-allowed">
              Interested
            </button>
          </div>
        )}
        {!isProfile && (
          <div className="card-actions justify-between mx-10 my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
