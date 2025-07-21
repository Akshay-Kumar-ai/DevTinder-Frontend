import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Base_Url } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
const Connections = () => {
  const connections = useSelector((appStore) => appStore.connections);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(Base_Url + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return <h1 className="flex justify-center my-10">No Connections Found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-semibold text-2xl"> Connections </h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-3/5 mx-auto"
          ><div className="flex">
            <div>
              <img
                alt="photo"
                src={photoUrl}
                className="h-40 w-40 rounded-2xl"
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-semibold">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            </div>
            <Link to={"/chat/"+_id}>
            <div className="mx-5 ">
              <button className="btn bg-green-700">Chat</button>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
