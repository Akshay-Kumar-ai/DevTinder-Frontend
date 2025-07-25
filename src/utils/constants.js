// export const Base_Url = "/api";
//localhost:8000
export const Base_Url =
  location.hostname === "localhost" ? "http://localhost:8000" : "/api";
