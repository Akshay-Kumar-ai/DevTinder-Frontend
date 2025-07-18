import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Base_Url } from "../utils/constants";

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
    return <h1>No Connections Found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-semibold text-2xl"> Connections </h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-3/5 mx-auto">
            <div>
              <img
                alt="photo"
                src={photoUrl}
                className="h-40 w-40 rounded-2xl"
              />
            </div>
            <div className="text-left mx-4 ">
              <h2>{firstName + " " + lastName}</h2>
              {age && gender && <p>{age+", "+gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
