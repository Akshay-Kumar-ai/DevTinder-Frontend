import io from "socket.io-client";
import { Base_Url } from "./constants";

// export const createSocketConnection = () => {
//   return io(Base_Url);
// };

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(Base_Url);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
