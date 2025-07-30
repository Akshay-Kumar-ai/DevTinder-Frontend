import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Base_Url } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(Base_Url + "/feed?page=1&limit=50", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0) {
    return <h1 className="flex justify-center my-10">No New Users Found</h1>;
  }
  return (
    <>
      <div className="flex justify-center">
        {feed && <UserCard user={feed[0]} />}
      </div>
    </>
  );
};

export default Feed;
