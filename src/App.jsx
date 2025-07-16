import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./Body";
import Profile from "./Profile";
import Login from "./Login";

function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Body />
              </>
            }
          >
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
              path="/Profile"
              element={
                <>
                  <Profile />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
