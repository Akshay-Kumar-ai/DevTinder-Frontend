import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
const Profile = () => {
  const user = useSelector((appStore) => appStore.user);
  

  return (
    <div className="flex justify-center mx-10">
      {user && <div className="">
        <EditProfile user={user} />
      </div>}
    </div>
  );
};

export default Profile;
